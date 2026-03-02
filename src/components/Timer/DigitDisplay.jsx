import { useEffect, useRef, memo } from "react";

const DigitDisplay = memo(({ value }) => {
  const spanRef = useRef(null);
  const prevValueRef = useRef(value);
  const timerRef = useRef(null);

  useEffect(() => {
    if (prevValueRef.current !== value && spanRef.current) {
      prevValueRef.current = value;
      spanRef.current.classList.add("animate-digit-slide");

      timerRef.current = setTimeout(() => {
        spanRef.current?.classList.remove("animate-digit-slide");
      }, 300);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value]);

  return <span ref={spanRef}>{value}</span>;
});

DigitDisplay.displayName = "DigitDisplay";

export default DigitDisplay;
