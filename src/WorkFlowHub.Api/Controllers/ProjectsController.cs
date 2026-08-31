using Microsoft.AspNetCore.Mvc;
using WorkFlowHub.Domain.Entities;
using WorkFlowHub.Infrastructure.Repositories;

namespace WorkFlowHub.Api.Controllers;

[ApiController]
[Route("api/projects")]
public sealed class ProjectsController(ProjectRepository repository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Project>>> GetAll(CancellationToken cancellationToken) =>
        Ok(await repository.GetAllAsync(cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Project>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var project = await repository.GetByIdAsync(id, cancellationToken);
        return project is null ? NotFound() : Ok(project);
    }

    public sealed record CreateProjectRequest(string Name, string Description);

    [HttpPost]
    public async Task<ActionResult<Project>> Create(CreateProjectRequest request, CancellationToken cancellationToken)
    {
        var project = new Project(request.Name, request.Description);
        await repository.AddAsync(project, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }
}
