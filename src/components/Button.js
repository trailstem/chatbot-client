import React, { memo } from "react";

/* 汎用的なボタンを作成 */
export const Button = memo((props) => {
  return (
    <>
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
