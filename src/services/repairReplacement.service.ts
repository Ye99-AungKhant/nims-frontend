import { apiClient } from "../utils/axios/apiClient";

export const createReplacement = async (params: any) => {
  return await apiClient.post("/repair-replacement/replacement", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createRepair = async (params: any) => {
  return await apiClient.post("/repair-replacement/repair", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getGPSReplacementHistory = async (gpsDeviceOriginalId: number) => {
  return await apiClient.get(
    `/repair-replacement/gps-replacement-history?deviceId=${gpsDeviceOriginalId}`
  );
};

export const getSIMCardReplacementHistory = async (
  gpsDeviceOriginalId: number
) => {
  return await apiClient.get(
    `/repair-replacement/simcard-replacement-history?gpsDeviceId=${gpsDeviceOriginalId}`
  );
};

export const getPeripheralReplacementHistory = async (
  gpsDeviceOriginalId: number
) => {
  return await apiClient.get(
    `/repair-replacement/peripheral-replacement-history?gpsDeviceId=${gpsDeviceOriginalId}`
  );
};

export const getAccessoryReplacementHistory = async (
  gpsDeviceOriginalId: number
) => {
  return await apiClient.get(
    `/repair-replacement/accessory-replacement-history?gpsDeviceId=${gpsDeviceOriginalId}`
  );
};

export const getFullHistory = async (gpsDeviceOriginalId: number) => {
  return await apiClient.get(
    `/repair-replacement/full-history?gpsDeviceId=${gpsDeviceOriginalId}`
  );
};

export const deleteReplacement = async (params: any) => {
  return await apiClient.patch("/repair-replacement/delete", params);
};

export const updateGPSReplacement = async (params: any) => {
  return await apiClient.patch(
    "/repair-replacement/update/gps-replacement-history",
    params
  );
};

export const updatePeripheralReplacement = async (params: any) => {
  return await apiClient.patch(
    "/repair-replacement/update/peripheral-replacement-history",
    params
  );
};

export const updateSimCardReplacement = async (params: any) => {
  return await apiClient.patch(
    "/repair-replacement/update/simcard-replacement-history",
    params
  );
};

export const updateAccessoryReplacement = async (params: any) => {
  return await apiClient.patch(
    "/repair-replacement/update/accessory-replacement-history",
    params
  );
};
