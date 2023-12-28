export interface NewOrder {
    orderDetails: NewOrderDetails[]
}

export interface NewOrderDetails {
    productId: string
    quantity: number
}