export const mapPeripheralRPListToEntity = (param: any): any => {
  return {
    client_name: param.client.name,
    plate_number: param.vehicle_plate_number,
    imei: param.device_imei,
    gps_serial_no: param.device_serial_no,
    type_name: param.type.name,
    qty: param.qty,
    peripheralDetails: Array.isArray(param.peripheralDetails)
      ? param.peripheralDetails.map((item: any) => ({
          brand_id: item.brand?.id,
          brand_name: item.brand?.name,
          model_id: item.model?.id,
          model_name: item.model?.name,
          serial_no: item.serial_no,
          warranty_plan: item.warranty_plan,
        }))
      : [],
    peripheral_id: param.peripheral_id,
    vehicle_id: param.vehicle_id,
    gps_device_id: param.device_id,
  };
};
