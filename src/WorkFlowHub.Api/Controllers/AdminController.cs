using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WorkFlowHub.Api.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public sealed class AdminController : ControllerBase
{
    [HttpGet("dashboard")]
    public IActionResult Dashboard() => Ok(new { message = "Admin access granted." });
}
