import React, { useRef, useEffect, memo } from "react";

// 可変テキストエリアコンポーネント
export const ResizeTextarea = memo((props) => {
  //domの参照
  const textareaRef = useRef(null);
  useEffect(() => {
    // 【データを表示する】の初期表示時に、テキストエリアの高さを自動調整する
    // テキストエリアの高さを自動調整する
    //高さ増減制御のため[auto]
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [props.value]);

  // テキストエリアの内容が変更された時のハンドラー
  const onChangeHandler = (e) => {
    // テキストエリアの高さを自動調整する
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

    // 外部から渡されたonChangeプロパティが存在する場合は呼び出す
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
