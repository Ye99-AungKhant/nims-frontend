import dayjs from "dayjs";

export const mapInstalledObjectListToEntity = (param: any): any => {
  return {
    id: param.id,
    client_name: param.client.name,
    plate_number: param.plate_number,
    imei: param.device[0]?.imei,
    phone_no: param.client?.contact_person[0]?.phone,
    server: param.device[0]?.server[0]?.domain?.name,
    installed_date: dayjs(param.device[0]?.server[0]?.installed_date).format(
      "DD-MM-YYYY"
    ),
    expire_date: dayjs(param.device[0]?.server[0]?.expire_date).format(
      "DD-MM-YYYY"
    ),
    status: param.device[0]?.server[0]?.status,
  };
};
