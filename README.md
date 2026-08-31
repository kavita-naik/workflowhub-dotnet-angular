# WorkFlowHub

A production-style full-stack project management platform built to demonstrate modern .NET, Angular, SQL Server, Azure, testing, and CI/CD practices.

## Architecture

```text
Angular Client
      |
      v
ASP.NET Core Web API
      |
      +--> Application Layer
      |
      +--> Domain Layer
      |
      +--> Infrastructure Layer
               |
               +--> SQL Server / Azure SQL
               +--> Azure Blob Storage
               +--> Azure Services
```

## Planned Capabilities

- JWT authentication and role-based authorization
- Project and task management
- Task assignment, priorities, statuses, and deadlines
- Comments and file attachments
- Dashboard and filtering
- Clean Architecture and SOLID principles
- Entity Framework Core and SQL Server
- Unit and integration testing
- Docker support
- GitHub Actions CI/CD
- Azure deployment and monitoring

## Solution Structure

```text
src/
  WorkFlowHub.Api/
  WorkFlowHub.Application/
  WorkFlowHub.Domain/
  WorkFlowHub.Infrastructure/

tests/
  WorkFlowHub.UnitTests/
  WorkFlowHub.IntegrationTests/

frontend/
  workflowhub-web/
```

## Status

🚧 Initial architecture and repository setup in progress.

## Author

**Kavita Naik**  
.NET Full Stack Developer | C# | ASP.NET Core | Angular | React | Azure

[LinkedIn](https://www.linkedin.com/in/kavita--naik/) · [GitHub](https://github.com/kavita-naik)
