import { Select, Option } from "@material-tailwind/react";
import { useSortByContext } from "./hooks/use-sortby";

export const SortFilter = () => {
  const { itemsToSortBy, sortById, onSortBy } = useSortByContext();
  return (
  <Select variant="outlined" label="Sort By" size="md" value={sortById} onChange={onSortBy}>
    {
      itemsToSortBy?.map(({ label, id }) => (
        <Option value={id} key={id}>{label}</Option>
      ))
    }
  </Select>
  )
}
