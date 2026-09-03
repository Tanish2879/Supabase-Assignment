function Button({label,children,onClick,variant = "primary",disabled = false,className = "",type = "button",title = "",
}) {
  return (
    <button
      type={type}
      class={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {label || children}
    </button>
  );
}

export default Button;
