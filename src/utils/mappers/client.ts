export const mapClientListToEntity = (param: any): any => {
  return {
    id: param.id,
    client_name: param.name,
    address: param.address,
    contact_name: param.contact_person[0]?.name,
    role: param.contact_person[0]?.role?.name,
    email: param.contact_person[0]?.email,
    phone: param.contact_person[0]?.phone,
  };
};
