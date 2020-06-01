import { IOption } from "./interfaces"

export const convertEnumToOptions = <T>(value: T): IOption[] => {
  return Object.entries(value).map(([label, value]) => ({ label, value }))
}
