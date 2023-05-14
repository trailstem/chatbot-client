import React, { useState } from "react";
import ResizeTextarea from "./ResizeTextarea";
import Button from "./Button";

const PopupList = ({ dataList, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e) => {
    setIsOpen(true);
    onClick(e);
  };

  const numberToEnclosedAlphanumerics = (number) => {
    // Enclosed Alphanumerics Unicode starts from 9312 for numbers 1 to 20
    const unicodeStart = 9312;
    if (number >= 1 && number <= 20) {
      return String.fromCodePoint(unicodeStart + number - 1);
    }
    // Return the number itself if it's out of range
    return number;
  };

  return (
    <>
      <Button
        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
        onClick={handleClick}
        name="データを表示"
      />
      {isOpen && (
        <>
          <div className="bg-slate-500 fixed inset-0 flex flex-col items-center justify-center z-50">
            <div className="bg-blue-300 w-1/2 h-1/2 overflow-auto p-4 rounded-md">
              <ul>
                {dataList.map((data, index) => (
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
                      Bot＞
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
};

export default PopupList;
