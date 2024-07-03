export type Role = "admin" | "student" | "teacher"

export type AttendanceMark = 'Missed' | 'Visited'

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