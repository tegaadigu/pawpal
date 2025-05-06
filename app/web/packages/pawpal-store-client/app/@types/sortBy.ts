export type SortItem = {
  sortField: string,
  sortOrder: string,
  label: string
  id: string,
}

export type SortByInterface = { 
  itemsToSortBy: Array<SortItem>, 
  sortById: string,
  onSortBy: (sortByValue: string | undefined) => void,
  sortOrder: string,
  sortField: string
} 