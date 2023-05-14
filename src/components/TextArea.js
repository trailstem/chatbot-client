export const TextArea = (props) => {
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
};

export default TextArea;
