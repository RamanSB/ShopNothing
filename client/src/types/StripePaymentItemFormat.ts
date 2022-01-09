export interface StripePaymentItemFormat {
    price_data: {
        currency: string,
        product_data: {
            name: string
        },
        unit_amount: number
    },
    quantity: number
}