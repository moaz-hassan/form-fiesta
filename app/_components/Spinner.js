import styles from "@/app/_components/components.module.css";

function Spinner({ text, size = "small", position = "0", ...rest }) {
  return (
    <div
      className={styles.loader_container}
      {...rest}
      style={
        size === "small"
          ? { margin: `0 ${position === "center" ? "auto" : "0"}` }
          : size === "medium"
          ? { margin: "50px auto" }
          : size === "large"
          ? { margin: "100px auto" }
          : null
      }
    >
      <div
        className={styles.loader}
        style={
          size === "small"
            ? { width: "30px", height: "30px" }
            : size === "medium"
            ? { width: "35px", height: "35px" }
            : size === "large"
            ? { width: "48px", height: "48px" }
            : null
        }
      ></div>
      {text && <h3>{text}</h3>}
    </div>
  );
}

export default Spinner;
