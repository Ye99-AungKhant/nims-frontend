export const mapAccessoryRPListToEntity = (param: any): any => {
  return {
    id: param.accessory_id,
    client_name: param.client.name,
    plate_number: param.vehicle_plate_number,
    imei: param.gps_device_imei,
    type: param.accessory_type,
  };
};
