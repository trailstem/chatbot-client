import React, { useCallback, useState } from "react";

import TextBox from "./components/TextBox";
import Button from "./components/Button";

function App() {
  //ユーザの入力状態管理
  const [inputText, setInputText] = useState("");
  //現時点のチャット履歴状態管理
  const [currentChat, setCurrentChat] = useState([]);

  // 過去10件のチャット履歴状態管理
  const [historyChatList, setHistoryChatList] = useState([]);

  // テキストボックスの入力値が変わった時に呼ばれる関数
  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  // 環境変数を参照
  const API_URL = process.env.REACT_APP_GO_API_URL;

  //実際のリクエスト処理
  const handleSubmit = useCallback(
    async (e) => {
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
      //ログインエンドポイントにリクエスト
      const response = await fetch(`${API_URL}/chat`, requestOptions);
      if (!response.ok) {
        // レスポンスがエラーだった場合
        const data = await response.json();
        alert(data.error);
      } else {
        // レスポンスが正常だった場合
        const data = await response.json();
        setInputText("");
        setCurrentChat([...currentChat, data.response]);
      }
    },
    [inputText, currentChat, API_URL]
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
    console.log(requestOptions.body);
    //ログインエンドポイントにリクエスト
    const response = await fetch(`${API_URL}/history/list`, requestOptions);
    if (!response.ok) {
      // レスポンスがエラーだった場合
      const data = await response.json();
      alert(data.error);
    } else {
      // レスポンスが正常だった場合
      const data = await response.json();
      console.log(data);
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
      {/* 独自作成したTextBoxコンポーネントを使用 */}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <TextBox
            //画面左側に広がるようにclassName設定
            className="w-1/2 h-10 border-2 border-gray-200 rounded"
            placeholder="質問したい内容を入力してください"
            type="text"
            value={inputText}
            onChange={handleInputChange}
          />
          <Button
            name="送信"
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-1/2 h-10">
            <ul>
              {currentChat.map((data, index) => (
                <li key={index} className="chat-item">
                  <div className="user-input">
                    {toDate(data.response_timestamp)} You ＞{data.user_input}
                  </div>
                  <div className="bot-response">
                    {toDate(data.response_timestamp)} Bot ＞{data.bot_response}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>

      <Button
        name="履歴一覧"
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      />
      <ul>
        {historyChatList.map((data, index) => (
          <li key={index} className="chat-item">
            <div className="user-input">
              {toDate(data.response_timestamp)} You ＞{data.user_input}
            </div>
            <div className="bot-response">
              {toDate(data.response_timestamp)} Bot ＞{data.bot_response}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
