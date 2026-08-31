using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace WorkFlowHub.Infrastructure.Data;

public sealed class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<WorkFlowHubDbContext>
{
    public WorkFlowHubDbContext CreateDbContext(string[] args)
    {
        var options = new DbContextOptionsBuilder<WorkFlowHubDbContext>()
            .UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=WorkFlowHubDb;Trusted_Connection=True;TrustServerCertificate=True")
            .Options;
        return new WorkFlowHubDbContext(options);
    }
}
