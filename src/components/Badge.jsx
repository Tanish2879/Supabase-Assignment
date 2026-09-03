function Badge({ text, children, color = "primary", className = "" }) {
  return (
    <span class={`badge badge-${color} ${className}`}>{text || children}</span>
  );
}

export default Badge;
