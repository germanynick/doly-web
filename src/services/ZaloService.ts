import { BaseService } from "./BaseService"

export interface ILoginZaloDto {
  oauthToken: string
}

export class ZaloService extends BaseService {
  prefix = "/zalo"

  login = async (data: ILoginZaloDto) => {
    return this.post("/login", data)
  }

  zaloLoginUrl = async () => {
    return this.get("/login-url")
  }
}

export const zaloService = new ZaloService()
