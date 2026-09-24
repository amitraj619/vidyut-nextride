import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useCleanupOverride() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("override")) {
      searchParams.delete("override");

      setSearchParams(searchParams, {
        replace: true,
      });
    }
  }, [searchParams, setSearchParams]);
}
