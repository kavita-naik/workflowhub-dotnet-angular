namespace WorkFlowHub.Domain.Entities;

public sealed class Project
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; }
    public string Description { get; private set; }
    public DateTime CreatedUtc { get; private set; } = DateTime.UtcNow;

    private Project() { }

    public Project(string name, string description)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Project name is required.", nameof(name));

        Name = name.Trim();
        Description = description?.Trim() ?? string.Empty;
    }
}
