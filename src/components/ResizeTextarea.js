import React, { useRef, useEffect, memo } from "react";

export const ResizeTextarea = memo((props) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [props.value]);

  const onChangeHandler = (e) => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <textarea
      className={props.className}
      value={props.value}
      placeholder={props.placeholder}
      disabled={props.isDisabled}
      ref={textareaRef}
      onChange={onChangeHandler}
      style={{ overflow: "hidden" }}
      {...props}
    ></textarea>
  );
});

export default ResizeTextarea;
