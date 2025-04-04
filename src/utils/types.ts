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
