export const mapServerRPListToEntity = (param: any): any => {
  return {
    client_id: param.client?.id,
    client_name: param.client?.name,
    vehicle_id: param.vehicle_id,
    vehicle_plate_number: param.vehicle_plate_number,
    device_id: param.device_id,
    device_imei: param.device_imei,
    source: param.source,
    server_id: param.server_id,
    type: param.type,
    domain: param.domain,
    installed_date: param.installed_date,
    renewal_date: param.renewal_date,
    expire_date: param.expire_date,
    invoice_no: param.invoice_no,
    object_base_fee: param.object_base_fee,
    server_status: param.status,
    extra_server: Array.isArray(param.extra_server)
      ? param.extra_server.map((item: any) => ({
          extra_server_id: item.extra_server_id,
          type: item.type,
          domain: item.domain,
        }))
      : [],
  };
};
