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
  operator: string;
  phone_no: string;
}

interface Peripheral {
  sensor_type_id: string;
  brand_id: string;
  model_id: string;
  serial_no: string;
  qty: string;
  warranty_plan_id: string;
  warranty_expiry_date: Date;
}

interface Accessory {
  type_id: string;
  qty: string;
}

interface Server {
  type_id: string;
  domain: string;
  installed_date: Date;
  subscription_plan_id: string;
  expire_date: Date;
  invoice_no: string;
  object_base_fee: string;
}

interface InstallationEngineer {
  user_id: string;
}

export interface FormValues {
  client: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePlateNo: string;
  vehicleOdometer: string;
  gpsBrand: string;
  gpsModel: string;
  imei: string;
  gpsSerial: string;
  warranty: string;
  operator: Operator;
  operators: Operator[];
  peripheral: Peripheral[];
  accessory: Accessory[];
  server: Server;
  installationEngineer: InstallationEngineer[];
}
