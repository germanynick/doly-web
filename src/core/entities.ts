import { CustomerType, Gender } from "./enums"

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface CustomerEntity extends BaseEntity {
  name: string
  type: CustomerType
  gender: Gender
  phone: string
  email: string
  status: string
  address: string
  balance: number
  accoutNumber: string
}

export interface UserEntity extends BaseEntity {
  name: string
  username: string
  email: string
  profileUrl: string
}
