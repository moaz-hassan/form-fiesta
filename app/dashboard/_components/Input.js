import PropTypes from "prop-types";

function Input({ type = "text", styles = {}, ...rest }) {
  if (styles == {}) {
    styles = {
      border: "2px solid #ccc",
      width: "300px",
      outline: "none",
      height: "25px",
      borderRadius: "3px",
      fontSize: "16px",
      padding: "3px 5px",
    };
  } else {
    styles = {};
  }
  return <input type={type} {...rest} style={styles} />;
}

Input.propTypes = {
  type: PropTypes.string,
};

export default Input;
