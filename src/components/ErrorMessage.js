import React, { memo, useEffect, useState } from "react";

// エラーメッセージコンポーネント
export const ErrorMessage = memo(({ error, setError }) => {
  // メッセージの表示状態
  const [isVisible, setIsVisible] = useState(false);
  // メッセージのフェードアウト開始状態
  const [isFading, setIsFading] = useState(false);

  // エラーが存在するときメッセージ表示、フェードアウト制御
  useEffect(() => {
    if (error) {
      // フェードアウトをリセット、メッセージを表示
      setIsFading(false);
      setIsVisible(true);

      // 3秒後にフェードアウト開始
      const timer1 = setTimeout(() => {
        setIsFading(true);
      }, 3000);

      // 5秒後にエラーメッセージ非表示、 エラーをクリア
      const timer2 = setTimeout(() => {
        setIsVisible(false);
        setError(null);
      }, 5000);

      // クリア
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [error, setError]);

  // isVisibleがtrueの場合のみメッセージ表示
  return isVisible ? (
    <div
      className={`fixed z-50 flex items-center justify-center w-full h-full transition-opacity duration-300 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-red-500 text-white py-2 px-4 rounded">{error}</div>
    </div>
  ) : null;
});
