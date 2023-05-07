//memoを使用する
import React, { memo } from "react";

export const TextBox = memo((props) => {
  return (
    <>
      <div className="">
        {/* propsから受け取った値をもとに柔軟に設定できるテキストボックスを作成 */}
        <input
          className={props.className}
          placeholder={props.placeholder}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </>
  );
});

export default TextBox;
