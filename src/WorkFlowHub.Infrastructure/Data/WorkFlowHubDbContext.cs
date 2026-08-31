using Microsoft.EntityFrameworkCore;
using WorkFlowHub.Domain.Entities;

namespace WorkFlowHub.Infrastructure.Data;

public sealed class WorkFlowHubDbContext(DbContextOptions<WorkFlowHubDbContext> options) : DbContext(options)
{
    public DbSet<Project> Projects => Set<Project>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(150).IsRequired();
            entity.Property(x => x.Description).HasMaxLength(2000);
            entity.Property(x => x.CreatedUtc).IsRequired();
        });
    }
}
