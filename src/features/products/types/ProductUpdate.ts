import { DetailsOption } from "./DetailsOption"
import { ProductSize } from "./ProductSize"

export interface ProductUpdate {
    title?: string
    latinName?: string
    price?: number
    description?: string
    categoryId?: number
}

export type UpdateParams = {
    id: string,
    update: ProductUpdate
}

export interface InventoryUpdate {
    inventoryChange: number
}

export type InventoryUpdateParams = {
    id: string,
    update: InventoryUpdate
}

export interface DetailsUpdate {
    size?: ProductSize
    watering?: DetailsOption
    light?: DetailsOption
    difficulty?: DetailsOption
    hanging?: boolean
    nonToxic?: boolean
    airPurifying?: boolean
}

export type DetailsUpdateParams = {
    id: string,
    update: DetailsUpdate
}