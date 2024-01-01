export interface ProductFilter {
    limit: number,
    offset: number,
    id: string | undefined,
    search: string | undefined,
    sortOrder: 'asc' | 'desc',
    sortCriterion: 'price' | 'createdAt',
    priceMax: number | undefined,
    priceMin: number | undefined
}