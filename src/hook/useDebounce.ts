import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const hanlder = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // useEffect()에서 return은 컴포넌트가 unmount 될때 또는 의존성 배열에 있는
    // 값들이 변경되어 다시 effect가 실행되기 직전에 호출

    // 즉 사용자가 delay 시간이 지나고 setDebouncedValue를 반환하기 전에
    // value가 변경되면, setDebouncedValue를 호출할수없고, 타이머가 취소된다. 그리고 다시
    // 함수가 재호출되어 새로운 타이머를 지정한다.
    return () => {
      clearTimeout(hanlder);
    };
  });

  return debouncedValue;
}
