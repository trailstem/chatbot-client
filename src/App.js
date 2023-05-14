import React, { useCallback, useState } from "react";

import ResizeTextarea from "./components/ResizeTextarea";
import Button from "./components/Button";
import TextArea from "./components/TextArea";
import PopupList from "./components/PopuList";

import ErrorMessage from "./components/ErrorMessage";

const API_URL = process.env.REACT_APP_GO_API_URL;

function App() {
  //ユーザの入力状態管理
  const [inputText, setInputText] = useState("");
  //現時点のチャット履歴状態管理
  const [currentChat, setCurrentChat] = useState([]);

  //現時点のユーザリクエスト時間
  const [requestTime, setRequestTime] = useState([]);

  // 過去10件のチャット履歴状態管理
  const [historyChatList, setHistoryChatList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null); // 新たにエラーステートを追加

  // テキストボックスの入力値が変わった時に呼ばれる関数
  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  // 環境変数を参照

  //実際のリクエスト処理
  const handleSubmit = useCallback(
    async (e) => {
      setIsLoading(true);
      e.preventDefault();
      const formData = {
        user_input: inputText,
      };
      // リクエストオプションを設定
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // formDataをJSONに変換
        body: JSON.stringify(formData),
      };

      const nowTime = new Date();
      //ログインエンドポイントにリクエスト
      const response = await fetch(`${API_URL}/chat`, requestOptions);
      if (!response.ok) {
        // レスポンスがエラーだった場合
        const data = await response.json();
        setError(data.error); // エラーをステートに保存
      } else {
        // レスポンスが正常だった場合
        const data = await response.json();
        setInputText("");

        setRequestTime([
          ...requestTime,
          nowTime.toLocaleTimeString("ja-JP", { hour12: false }),
        ]);
        setCurrentChat([...currentChat, data.response]);
      }
      setIsLoading(false);
    },
    [inputText, requestTime, currentChat]
  );

  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    // リクエストオプションを設定
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    //ログインエンドポイントにリクエスト
    const response = await fetch(`${API_URL}/history/list`, requestOptions);
    if (!response.ok) {
      // レスポンスがエラーだった場合
      const data = await response.json();
      setError(data.error); // エラーをステートに保存
    } else {
      // レスポンスが正常だった場合
      const data = await response.json();
      setHistoryChatList(data.history_list);
    }
  }, []);

  const toDate = (date) => {
    //en-USを日本時刻に設定
    const timeStr = new Date(date).toLocaleTimeString("ja-JP", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return timeStr;
  };

  return (
    <>
      <ErrorMessage error={error} setError={setError} />{" "}
      {/* pass the setError function to ErrorMessage */}
      {/* 独自作成したTextBoxコンポーネントを使用 */}
      <form onSubmit={handleSubmit}>
        <div className="mt-10">
          <div className="flex justify-center items-center">
            <ResizeTextarea
              value={inputText}
              className="w-1/2 border-2 border-gray-200 resize-none rounded-md"
              placeholder="質問したい内容を入力してください"
              onChange={handleInputChange}
            />
            <div className="pl-3">
              <Button
                name="送信"
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed top-11"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-2/3 h-10">
            <ul>
              {currentChat.map((data, index) => (
                <li key={index} className="">
                  <div className="flex items-start">
                    <div>{requestTime[index]} You ＞</div>
                    <div className="flex-grow">
                      <TextArea
                        value={data.user_input}
                        className="w-full resize-none overflow-hidden bg-white border-none rounded-md"
                        isDisabled={true}
                      />
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div>{toDate(data.response_timestamp)} Bot ＞</div>
                    <div className="flex-grow">
                      <ResizeTextarea
                        value={data.bot_response}
                        className="w-full resize-none overflow-hidden bg-white border-none rounded-md"
                        isDisabled={true}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
      {/* 画面中央下に表示 className設定*/}
      <div className="fixed bottom-0 flex items-end justify-center w-full pb-5">
        <PopupList dataList={historyChatList} onClick={handleClick} />
      </div>
    </>
  );
}

export default App;
