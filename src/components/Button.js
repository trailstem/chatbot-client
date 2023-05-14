//memoを使用する
import React, { memo } from "react";

export const Button = memo((props) => {
  return (
    <>
      {/* 汎用的なボタンを作成 */}
      <div className="">
        <button
          type={props.type}
          className={props.className}
          name={props.name}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.name}
        </button>
      </div>
    </>
  );
});

export default Button;
