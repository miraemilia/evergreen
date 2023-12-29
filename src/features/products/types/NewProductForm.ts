import { DetailsOption } from "./DetailsOption"
import { ProductSize } from "./ProductSize"

export interface NewProductForm {
    title: string
    latinName?: string
    price: number
    description: string
    categoryId: string,
    imageUrl1: string,
    imageUrl2: string,
    imageUrl3: string
    imageDescription1?: string,
    imageDescription2?: string,
    imageDescription3?: string
    size: ProductSize
    watering: DetailsOption
    light: DetailsOption
    difficulty: DetailsOption
    hanging?: boolean
    nonToxic?: boolean
    airPurifying?: boolean
    inventory: number
}