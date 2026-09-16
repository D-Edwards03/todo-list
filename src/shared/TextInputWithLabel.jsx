import { forwardRef } from "react";
import formStyles from "./Forms.module.css";

const TextInputWithLabel = forwardRef(function TextInputWithLabel(
  { elementId, labelText, onChange, value, maxLength },
  ref
) {
  return (
    <div className={`${formStyles.inputGroup} ${formStyles.inputGroupSpacing}`}>
      <label htmlFor={elementId} className={formStyles.label}>
        {labelText}
      </label>

      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        className={formStyles.input}
        maxLength={maxLength}
      />
    </div>
  );
});

export default TextInputWithLabel;
