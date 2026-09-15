import formStyles from "./Forms.module.css";

function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
}) {
  return (
    <div className={formStyles.inputGroup}>
      <label htmlFor={elementId} className={formStyles.label}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        className={formStyles.input}
      />
    </div>
  );
}

export default TextInputWithLabel;