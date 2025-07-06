export interface ClientType {
  id: string;
  name: string;
  address: string;
}

export interface ClientPayloadType {
  name: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postal?: string;
}

export interface ClientContactPersonPayloadType {
  id?: string;
  contactName: string;
  role_id: number;
  phone: string;
  email: string;
}

interface Operator {
  id?: number;
  operator: string;
  phone_no: string;
}

// export interface Peripheral {
//   sensor_type_id: string;
//   brand_id: string;
//   model_id: string;
//   serial_no: string;
//   qty: string;
//   warranty_plan_id: string;
//   warranty_expiry_date: Date;
// }

export interface PeripheralDetail {
  brand_id: string;
  model_id: string;
  serial_no: string;
  warranty_plan_id: string;
}

export interface Peripheral {
  id?: number;
  sensor_type_id: string;
  qty: string;
  detail: PeripheralDetail[];
  installed_date?: Date;
}

interface Accessory {
  id?: number;
  type_id: string;
  qty: string;
  installed_date?: Date;
}

interface Server {
  id?: number;
  type_id: string;
  domain: any;
  installed_date: Date;
  subscription_plan_id: string;
  expire_date: Date;
  invoice_no: string;
  object_base_fee: string;
  extra_server_id?: any;
}

interface InstallationEngineer {
  id?: number;
  user_id: string;
}

export interface FormValues {
  client: string;
  vehicleId?: number;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePlateNo: string;
  vehicleOdometer: string;
  gpsId?: number;
  gpsBrand: string;
  gpsModel: string;
  imei: string;
  gpsSerial: string;
  warranty: string;
  extraGPS?: any[];
  operators: Operator[];
  peripheral: Peripheral[];
  accessory: Accessory[];
  server: Server;
  installationEngineer: InstallationEngineer[];
  installImage?: any[];
}

export interface PermissionType {
  id: number;
  page_name: string;
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface RoleType {
  id: number;
  name: string;
  permissions: PermissionType[];
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: RoleType;
}
