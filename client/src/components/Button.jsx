// components/Button.jsx
import "./Button.css";

const Button = ({ children, type = "button", onClick, disabled, variant = "primary", fullWidth }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${fullWidth ? "btn-full" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;