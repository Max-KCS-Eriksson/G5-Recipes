import "./Logo.css";

function Logo({ variant = "default", onClick }) {
  return (
    <p className={`logo-text ${variant}`} onClick={onClick} role="button">
      Pajparadiset
    </p>
  );
}

export default Logo;
