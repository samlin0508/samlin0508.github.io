import { BaZiShiShen } from "./bazi-shishen"
import { ResultElement } from "./result-element"

export class BaZiResult {
    typeOfTianGanDiZhi:    number
	elementInHourOfBirth:  string
	elementInDayOfBirth:   string
	elementInMonthOfBirth: string
	elementInYearOfBirth:  string
	elementInDecade:       string
	elementInYear:         string
	elementInMonth:        string
	elementInDay:          string
	resultOfWuXingShengKe: string
	shiShen:              BaZiShiShen[]
	doesElementInDayOfBirthKeByOthers: boolean
	countOfElementKeElementInDayOfBirth: number
	headOfWuXingShengKe: ResultElement
	restOfWuXingShengKe: ResultElement
	resultOfElementInMonthKeElementInYear: ResultElement
	elementKeElementInDayOfBirth: ResultElement
	elementKeElementInDayOfBirthDueToElementInMonthKeElementInYear: boolean
}