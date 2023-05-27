import React, { useState, memo } from "react";
import ResizeTextarea from "./ResizeTextarea";
import Button from "./Button";

// チャット履歴モーダル
export const PopupList = memo(({ dataList, onClick }) => {
  //モーダル状態管理
  const [isOpen, setIsOpen] = useState(false);
  // モーダルを開く
  const handleClick = (e) => {
    setIsOpen(true);
    // 親コンポーネントのonClickを実行（過去チャット10件取得処理）
    onClick(e);
  };

  // 数字を丸囲み数字に変換
  const numberToEnclosedAlphanumerics = (number) => {
    // Unicode コードポイント 9312である丸囲み数字を表示
    const unicodeStart = 9312;
    if (number >= 1 && number <= 20) {
      return String.fromCodePoint(unicodeStart + number - 1);
    }
    //丸囲みではなく普通の数字を表示
    return number;
  };

  return (
    <>
      <Button
        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
        onClick={handleClick}
        name="データを表示"
      />
      {/* モーダル表示 */}
      {isOpen && (
        <>
          <div className="bg-slate-500 fixed inset-0 flex flex-col items-center justify-center z-50">
            <div className="bg-blue-300 w-1/2 h-1/2 overflow-auto p-4 rounded-md">
              <ul>
                {dataList &&
                  dataList.map((data, index) => (
                    <li key={index} className="">
                      <div className="">
                        {numberToEnclosedAlphanumerics(index + 1)}
                      </div>
                      <div className="flex items-start">
                        You ＞
                        <div className="flex-grow">
                          <ResizeTextarea
                            value={data.user_input}
                            className="w-full resize-none overflow-hidden bg-white border-none rounded-md"
                            isDisabled={true}
                          />
                        </div>
                      </div>
                      <div className="flex items-start">
                        Bot ＞
                        <div className="flex-grow">
                          <ResizeTextarea
                            value={data.bot_response}
                            className="w-full resize-none overflow-hidden bg-white border-none rounded-md"
                            isDisabled={true}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              name="戻る"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </>
      )}
    </>
  );
});
