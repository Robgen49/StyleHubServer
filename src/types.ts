export type Role = "admin" | "collector" | "filler" | "creator" | "customer"

export interface CountObject {
    count: number
}

export interface RaintigValue {
    value: number
}

export interface Token {
    token: string
}

export class CartSum {
    readonly sum: number
}