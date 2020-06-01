import { BaseService } from "./BaseService"

export class DashboardService extends BaseService {
  prefix = "/dashboard"

  fetchCustomerChart = async () => {
    return this.get<any>("/customer-chart")
  }
}

export const dashboardService = new DashboardService()
