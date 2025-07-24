export const mapGPSRPListToEntity = (param: any): any => {
  return {
    client_name: param.client.name,
    plate_number: param.vehicle_plate_number,
    imei: param.imei,
    gps_serial_no: param.serial_no,
    brand_name: param.brand.name,
    model_name: param.model.name,
    gps_device_id: param.gps_device_id,
    vehicle_id: param.vehicle_id,
  };
};
