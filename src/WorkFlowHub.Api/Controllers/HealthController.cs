using Microsoft.AspNetCore.Mvc;

namespace WorkFlowHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new
    {
        status = "Healthy",
        service = "WorkFlowHub.Api",
        timestampUtc = DateTime.UtcNow
    });
}
