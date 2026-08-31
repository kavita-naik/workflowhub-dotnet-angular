using Microsoft.EntityFrameworkCore;
using WorkFlowHub.Domain.Entities;
using WorkFlowHub.Infrastructure.Data;

namespace WorkFlowHub.Infrastructure.Repositories;

public sealed class ProjectRepository(WorkFlowHubDbContext dbContext)
{
    public Task<List<Project>> GetAllAsync(CancellationToken cancellationToken = default) =>
        dbContext.Projects.AsNoTracking().OrderByDescending(x => x.CreatedUtc).ToListAsync(cancellationToken);

    public Task<Project?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        dbContext.Projects.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

    public async Task AddAsync(Project project, CancellationToken cancellationToken = default)
    {
        await dbContext.Projects.AddAsync(project, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
