// Reactと必要なフックをインポートします
import React, { memo, useEffect, useState } from "react";

// エラーメッセージを表示するコンポーネントを定義します
export const ErrorMessage = memo(({ error, setError }) => {
  // エラーメッセージの表示状態を管理するstate
  const [isVisible, setIsVisible] = useState(false);
  // エラーメッセージのフェードアウト開始状態を管理するstate
  const [isFading, setIsFading] = useState(false);

  // エラーが存在するときにエラーメッセージの表示とフェードアウトを制御する
  useEffect(() => {
    if (error) {
      // エラーが存在する場合
      setIsFading(false); // フェードアウトを初期状態にリセットします
      setIsVisible(true); // エラーメッセージを表示します

      const timer1 = setTimeout(() => {
        setIsFading(true); // 3秒後にフェードアウトを開始します
      }, 3000);

      const timer2 = setTimeout(() => {
        setIsVisible(false); // 5秒後にエラーメッセージを非表示にします
        setError(null); // エラーをクリアします
      }, 5000);

      // クリーンアップ関数では、タイマーをクリアします
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [error, setError]); // useEffectフックはerrorまたはsetErrorが変更されたときに再実行されます

  // エラーメッセージを表示します（isVisibleがtrueの場合のみ）
  return isVisible ? (
    <div
      className={`fixed z-50 flex items-center justify-center w-full h-full transition-opacity duration-300 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-red-500 text-white py-2 px-4 rounded">{error}</div>
    </div>
  ) : null; // isVisibleがfalseの場合は何も表示しません
});
