namespace WorkFlowHub.Domain.Entities;

public sealed class TaskItem
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public Guid ProjectId { get; private set; }
    public string Title { get; private set; }
    public TaskStatus Status { get; private set; } = TaskStatus.Todo;
    public TaskPriority Priority { get; private set; } = TaskPriority.Medium;
    public DateTime? DueDateUtc { get; private set; }

    private TaskItem() { }

    public TaskItem(Guid projectId, string title, TaskPriority priority = TaskPriority.Medium, DateTime? dueDateUtc = null)
    {
        if (projectId == Guid.Empty) throw new ArgumentException("Project is required.", nameof(projectId));
        if (string.IsNullOrWhiteSpace(title)) throw new ArgumentException("Task title is required.", nameof(title));

        ProjectId = projectId;
        Title = title.Trim();
        Priority = priority;
        DueDateUtc = dueDateUtc;
    }

    public void ChangeStatus(TaskStatus status) => Status = status;
}

public enum TaskStatus
{
    Todo,
    InProgress,
    Blocked,
    Done
}

public enum TaskPriority
{
    Low,
    Medium,
    High,
    Critical
}
