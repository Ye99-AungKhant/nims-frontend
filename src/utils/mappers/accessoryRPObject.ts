export const mapAccessoryRPListToEntity = (param: any): any => {
  return {
    accessory_id: param.accessory_id,
    client_name: param.client.name,
    plate_number: param.vehicle_plate_number,
    imei: param.device_imei,
    type: param.type,
    qty: param.qty,
    installed_date: param.installed_date,
    device_id: param.device_id,
    vehicle_id: param.vehicle_id,
    vehicle_plate_number: param.vehicle_plate_number,
  };
};
