export enum Gender {
  Male = "M",
  Female = "F",
}

export enum CustomerType {
  Vip = "A",
  Member = "B",
  Basic = "C",
  New = "D",
}

export enum Keys {
  Authorization = "Authorization",
}

export enum Pages {
  Login = "/login",
  LoginCallback = "/login/callback",
  Dashboard = "/",
  Customer = "/customer",
}

export enum Translations {
  Default = "translation",
  Customer = "customer",
}

export enum ErrorCode {
  IsExisted = "is_existed",
  IsNotFound = "is_not_found",
  IsRequired = "is_required",
  IsDefined = "is_defined",
  IsEmail = "is_email",
  IsPhone = "is_phone",
  minValue = "min_value",
  maxValue = "max_value",
  minLength = "min_length",
  maxLength = "max_length",
}

export enum ExportType {
  Excel = "excel",
  Pdf = "pdf",
}
