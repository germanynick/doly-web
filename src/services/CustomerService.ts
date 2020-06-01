import { CustomerEntity } from "~/core/entities"
import { IDataPagination, IDataQuery } from "~/core/interfaces"

import { BaseService } from "./BaseService"

export class CustomerService extends BaseService {
  prefix: string = "/customer"

  getAll = async (dataQuery?: IDataQuery<CustomerEntity>) => {
    return this.put<IDataPagination<CustomerEntity>>("/", dataQuery)
  }

  getOne = async (id: string, dataQuery?: IDataQuery<CustomerEntity>) => {
    return this.get<CustomerEntity>(`/${id}`, { params: dataQuery })
  }

  create = async (data: Partial<CustomerEntity>) => {
    return this.post<CustomerEntity>("/", data)
  }

  update = async (id: string, data: Partial<CustomerEntity>) => {
    return this.put<CustomerEntity>(`/${id}`, data)
  }

  remove = async (id: string) => {
    return this.delete(`/${id}`)
  }
}

export const customerService = new CustomerService()
