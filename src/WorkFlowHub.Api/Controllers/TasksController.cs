using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkFlowHub.Domain.Entities;
using WorkFlowHub.Infrastructure.Data;

namespace WorkFlowHub.Api.Controllers;

[ApiController]
[Route("api/tasks")]
[Authorize]
public sealed class TasksController(WorkFlowHubDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<TaskItem>>> GetAll(Guid? projectId, CancellationToken cancellationToken)
    {
        var query = db.Tasks.AsNoTracking();
        if (projectId.HasValue) query = query.Where(x => x.ProjectId == projectId.Value);
        return Ok(await query.OrderBy(x => x.DueDateUtc).ToListAsync(cancellationToken));
    }

    [HttpPost]
    public async Task<ActionResult<TaskItem>> Create(CreateTaskRequest request, CancellationToken cancellationToken)
    {
        var projectExists = await db.Projects.AnyAsync(x => x.Id == request.ProjectId, cancellationToken);
        if (!projectExists) return BadRequest(new { message = "Project does not exist." });

        var task = new TaskItem(request.ProjectId, request.Title, request.Priority, request.DueDateUtc);
        db.Tasks.Add(task);
        await db.SaveChangesAsync(cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { projectId = task.ProjectId }, task);
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<IActionResult> ChangeStatus(Guid id, ChangeStatusRequest request, CancellationToken cancellationToken)
    {
        var task = await db.Tasks.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (task is null) return NotFound();
        task.ChangeStatus(request.Status);
        await db.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    public sealed record CreateTaskRequest(Guid ProjectId, string Title, TaskPriority Priority, DateTime? DueDateUtc);
    public sealed record ChangeStatusRequest(TaskStatus Status);
}
