function Select({
  options = [],
  setSelectValue = "",
  selectLabel = "",
  className="",
  ...rest
}) {
  const selectStyles = {
    margin: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    fontSize: "16px",
    color: "#333",
    cursor: "pointer",
    appearance: "none",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const optionStyles = {
    fontSize: "16px",
    padding: "10px",
    backgroundColor: "#fff",
    color: "#333",
  };
  return (
    <div style={{ order: "1" }} className={className}>
      <span>{selectLabel}</span>
      <select
        name=""
        id=""
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
        style={selectStyles}
        {...rest}
      >
        {options.map((option, index) => (
          <option key={index} value={option} style={optionStyles}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
