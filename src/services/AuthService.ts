import { UserEntity } from "~/core/entities"

import { BaseService } from "./BaseService"

export interface ILoginDto {
  username: string
  password: string
}

export class AuthService extends BaseService {
  prefix = "/auth"

  login = async (data: ILoginDto) => {
    return this.post("/login", data)
  }

  me = async () => {
    return this.get<UserEntity>("/me")
  }
}

export const authService = new AuthService()
