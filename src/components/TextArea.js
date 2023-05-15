import memo from "react";

// 汎用的なテキスエリア
export const TextArea = memo((props) => {
  return (
    <>
      {/* propsから値を受け取る汎用的なtextarea作成 */}
      <textarea
        className={props.className}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        disabled={props.isDisabled}
      ></textarea>
    </>
  );
});

export default TextArea;
