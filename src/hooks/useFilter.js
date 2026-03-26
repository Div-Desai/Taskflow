import { useSearchParams } from "react-router-dom";

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";

  function setSearch(value) {
    setSearchParams((prev) => {
      if (value) prev.set("search", value);
      else prev.delete("search");
      return prev;
    });
  }

  function setStatus(value) {
    setSearchParams((prev) => {
      if (value && value !== "all") prev.set("status", value);
      else prev.delete("status");
      return prev;
    });
  }

  return { search, status, setSearch, setStatus };
}
