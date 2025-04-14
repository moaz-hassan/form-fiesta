import PropTypes from "prop-types";

function Button({ type = "button", children, ...rest }) {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
};

export default Button;
