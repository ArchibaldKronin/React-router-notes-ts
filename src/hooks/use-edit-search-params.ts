import { useSearchParams } from "react-router-dom";

export default function useIsEditSearchParams(): [boolean, (x: boolean) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const isEdit: boolean = !!searchParams.get("edit");
  function toggleEdit(isEdit: boolean) {
    if (isEdit) {
      setSearchParams({});
    } else {
      setSearchParams({ edit: "1" });
    }
  }

  return [isEdit, toggleEdit];
}
