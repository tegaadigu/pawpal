import { SortByInterface, SortItem } from "@/@types/sortBy";
import React, { createContext, useContext, ReactNode } from "react"

const ITEMS_TO_SORT_BY: Array<SortItem> = [
  {
    sortField: "price",
    sortOrder: 'desc',
    label: 'Price: Low - High',
    id: 'price_low_high'
  },
  {
    sortField: "price",
    sortOrder: 'asc',
    label: 'Price: High - Low',
    id: 'price_high_low'
  }
]

export const useSortBy = () : SortByInterface => {
  const [sortById, setSortById] = React.useState<string>("");

  const [sortOrder, sortField] = React.useMemo(() => {
    const sortBy = ITEMS_TO_SORT_BY.find(({ id }) => id === sortById);
    if(sortBy) {
      return [sortBy.sortOrder, sortBy.sortField]
    }
    return ['', '']
  }, [sortById])

  const onSortBy = React.useCallback((sortByValue: string | undefined) => {
    setSortById(sortByValue || '');
  }, []);

  return {
    itemsToSortBy: ITEMS_TO_SORT_BY,
    sortById,
    onSortBy,
    sortOrder,
    sortField
  }
}

const SortByContext = createContext<SortByInterface | null>(null);

export const SortByProvider = ({ children } : { children: ReactNode}) => {
  const sortBy = useSortBy();
  return (
    <SortByContext.Provider value={sortBy}>
    { children }
    </SortByContext.Provider>
  )
}

export const useSortByContext = () : SortByInterface => {
  const context = useContext(SortByContext) as SortByInterface;
  return context;
}