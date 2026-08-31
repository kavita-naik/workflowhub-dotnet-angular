using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WorkFlowHub.Domain.Entities;

namespace WorkFlowHub.Api.Services;

public sealed class JwtTokenService(IConfiguration configuration)
{
    public (string Token, DateTime ExpiresAtUtc) CreateToken(User user)
    {
        var key = configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT key is not configured.");
        var issuer = configuration["Jwt:Issuer"] ?? "WorkFlowHub";
        var expires = DateTime.UtcNow.AddHours(1);
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var credentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(issuer, issuer, claims, expires: expires, signingCredentials: credentials);
        return (new JwtSecurityTokenHandler().WriteToken(token), expires);
    }
}
