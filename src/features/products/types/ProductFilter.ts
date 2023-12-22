export interface ProductFilter {
    limit: number,
    offset: number,
    id: string | undefined,
    search: string | undefined,
    sortOrder: 'asc' | 'desc',
    sortCriterion: 'price' | 'createdAt',
    priceMax: number | undefined,
    priceMin: number | undefined

    //name: "Limit" | "Offset" | "Id" | "Search" | "SortOrder" | "SortCriterion" | "PriceMax" | "PriceMin"
    //value: number | string
}