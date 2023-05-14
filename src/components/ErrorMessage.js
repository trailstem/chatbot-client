import { memo, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

const ErrorMessage = memo(({ error, setError }) => {
  // clear the error message after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);
  return (
    <CSSTransition
      in={error} // エラーメッセージが存在する場合にtrue
      timeout={1000} // transitionの時間
      classNames={{
        enter: "opacity-0",
        enterActive: "opacity-100 transition-opacity duration-300",
        exit: "opacity-100",
        exitActive: "opacity-0 transition-opacity duration-300",
      }}
      unmountOnExit // エラーメッセージがないときはアンマウント
    >
      <div className="fixed z-50 flex items-center justify-center w-full h-full">
        <div className="bg-red-500 text-white py-2 px-4 rounded">{error}</div>
      </div>
    </CSSTransition>
  );
});

export default ErrorMessage;
