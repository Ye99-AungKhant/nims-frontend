export const mapSimCardRPListToEntity = (param: any): any => {
  return {
    id: param.simcard_id,
    client_name: param.client.name,
    plate_number: param.vehicle_plate_number,
    imei: param.gps_device_imei,
    operator: param.operator,
    phone_no: param.phone_no,
  };
};
