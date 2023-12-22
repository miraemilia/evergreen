export interface ProductFilter {
    limit: number,
    offset: number,
    id: string | undefined,
    search: string,
    sortOrder: 'asc' | 'desc',
    sortCriterion: 'price' | 'createdAt',
    priceMax: number,
    priceMin: number

    //name: "Limit" | "Offset" | "Id" | "Search" | "SortOrder" | "SortCriterion" | "PriceMax" | "PriceMin"
    //value: number | string
}