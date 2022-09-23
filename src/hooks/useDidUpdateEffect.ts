import { useRef, useEffect } from "react";

export function useDidUpdateEffect(effect: () => void, deps: any[]) {
  const didMountRef = useRef<boolean>(false);
  useEffect(() => {
    if (didMountRef.current) effect();
    else didMountRef.current = true;
  }, deps);
}
