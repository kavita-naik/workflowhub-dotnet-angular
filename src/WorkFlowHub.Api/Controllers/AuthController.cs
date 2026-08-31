using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkFlowHub.Api.Models;
using WorkFlowHub.Api.Services;
using WorkFlowHub.Domain.Entities;
using WorkFlowHub.Infrastructure.Data;

namespace WorkFlowHub.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(WorkFlowHubDbContext db, PasswordService passwords, JwtTokenService tokens) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        if (await db.Users.AnyAsync(x => x.Email == email, cancellationToken))
            return Conflict(new { message = "An account with this email already exists." });

        var user = new User(email, passwords.Hash(request.Password));
        db.Users.Add(user);
        await db.SaveChangesAsync(cancellationToken);
        var result = tokens.CreateToken(user);
        return Ok(new AuthResponse(result.Token, result.ExpiresAtUtc));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await db.Users.FirstOrDefaultAsync(x => x.Email == email, cancellationToken);
        if (user is null || !passwords.Verify(request.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password." });

        var result = tokens.CreateToken(user);
        return Ok(new AuthResponse(result.Token, result.ExpiresAtUtc));
    }
}
