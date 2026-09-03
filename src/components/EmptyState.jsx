function EmptyState({
  message = "No items found",
  icon = "📦",
  description = "",
}) {
  return (
    <div class="empty-state">
      <div class="empty-state-icon">{icon}</div>
      <h3 class="empty-state-title">{message}</h3>
      {description && <p class="empty-state-desc">{description}</p>}
    </div>
  );
}

export default EmptyState;
