import { Box, Flex, Group, Paper, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetInstalledDetail } from "./hooks/useGetInstalled";
import {
  IconAddressBook,
  IconDeviceSim,
  IconEdit,
  IconGitCompare,
  IconHistory,
  IconPaperclip,
  IconPhoto,
  IconRouter,
  IconServer2,
  IconTruckFilled,
  IconUsersGroup,
} from "@tabler/icons-react";
import { PageLoading } from "../../components/common/PageLoading";
import ViewDetail from "./components/ViewDetail";
import {
  AccessoryData,
  clientData,
  ContactPersonData,
  GPSDeviceData,
  HistoryData,
  PeripheralData,
  ServerData,
  SimCardData,
  VehicleData,
} from "./components/ViewDetailData";
import PermissionGate from "../../components/middleware/PermissionGate";
import { InstallImageGallary } from "./components/InstallImageGallary";

const InstallationDetailPage = () => {
  const theme = useMantineTheme();
  const [menuBtn, setMenuBtn] = useState<string>("client");
  const param = useLocation();
  const navigate = useNavigate();
  const {
    data: installedObject,
    isLoading,
    isFetched,
  } = useGetInstalledDetail(param.state.id);
  console.log(param.state.id, installedObject);

  const handleMenuBtn = (name: string) => {
    setMenuBtn(name);
  };

  if (isLoading || !isFetched || installedObject?.items == undefined) {
    return <PageLoading />;
  }

  return (
    <Box p={{ base: 8, sm: 30 }}>
      <Flex
        direction={{ base: "column", md: "row", lg: "row", xl: "row" }}
        gap={{ base: 8, md: 30 }}
        align="flex-start"
      >
        {!isLoading && (
          <Paper shadow="sm" w={{ base: "100%", md: "31%" }}>
            <Flex
              p="lg"
              pb={0}
              justify={"center"}
              align="center"
              direction={"column"}
            >
              <Box
                className="cursor-pointer"
                w="64px"
                h="64px"
                bg="indigo"
                style={{
                  borderRadius: "100%",
                }}
              >
                <Flex w="100%" h="100%" align="center" justify="center">
                  <Text c="white" fw={500} size="10">
                    {installedObject?.items?.plate_number}
                  </Text>
                </Flex>
              </Box>
              <Text size="lg" fw={500} color={theme.colors.purple[0]} mt={5}>
                {installedObject?.items?.client.name}
              </Text>
            </Flex>
            <Flex
              p={{ base: 8, sm: 30 }}
              direction={{ base: "row", md: "column" }}
              justify={"space-between"}
              style={{ overflowX: "auto" }}
            >
              <Group
                onClick={() => handleMenuBtn("client")}
                p={"xs"}
                gap={0}
                className={`menu-item ${menuBtn === "client" ? "active" : ""}`}
                style={{
                  borderTop: "1px solid #dddddd",
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <IconAddressBook size={20} className="textIcon" />
                <Text className="text" display={{ base: "none", lg: "block" }}>
                  Client
                </Text>
              </Group>
              <Group
                onClick={() => handleMenuBtn("contactPerson")}
                p={"xs"}
                gap={0}
                className={`menu-item ${
                  menuBtn === "contactPerson" ? "active" : ""
                }`}
                style={{
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <IconUsersGroup size={20} className="textIcon" />
                <Text className="text" display={{ base: "none", lg: "block" }}>
                  Contact Persons
                </Text>
              </Group>

              <Group
                onClick={() => handleMenuBtn("vehicleInfo")}
                p={"xs"}
                gap={0}
                className={`menu-item ${
                  menuBtn === "vehicleInfo" ? "active" : ""
                }`}
                style={{
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <IconTruckFilled size={20} className="textIcon" />
                <Text className="text" display={{ base: "none", lg: "block" }}>
                  Vehicle Info
                </Text>
              </Group>

              <Group
                onClick={() => handleMenuBtn("gpsInfo")}
                p={"xs"}
                gap={0}
                className={`menu-item ${menuBtn === "gpsInfo" ? "active" : ""}`}
                style={{
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <IconRouter size={20} className="textIcon" />
                <Text className="text" display={{ base: "none", lg: "block" }}>
                  GPS Device
                </Text>
              </Group>

              <Group
                onClick={() => handleMenuBtn("simInfo")}
                p={"xs"}
                gap={0}
                className={`menu-item ${menuBtn === "simInfo" ? "active" : ""}`}
                style={{
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <IconDeviceSim size={20} className="textIcon" />
                <Text className="text" display={{ base: "none", lg: "block" }}>
                  SIM Card
                </Text>
              </Group>

              <Group
                onClick={() => handleMenuBtn("peripheralInfo")}
                p={"xs"}
                gap={0}
                className={`menu-item ${
                  menuBtn === "peripheralInfo" ? "active" : ""
                }`}
                style={{
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <IconGitCompare size={20} className="textIcon" />
                <Text className="text" display={{ base: "none", lg: "block" }}>
                  Peripherals
                </Text>
              </Group>

              <Group
                onClick={() => handleMenuBtn("accessoryInfo")}
                p={"xs"}
                gap={0}
                className={`menu-item ${
                  menuBtn === "accessoryInfo" ? "active" : ""
                }`}
                style={{
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <IconPaperclip size={20} className="textIcon" />
                <Text className="text" display={{ base: "none", lg: "block" }}>
                  Accessories
                </Text>
              </Group>

              <Group
                onClick={() => handleMenuBtn("serverInfo")}
                p={"xs"}
                gap={0}
                className={`menu-item ${
                  menuBtn === "serverInfo" ? "active" : ""
                }`}
                style={{
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <IconServer2 size={20} className="textIcon" />
                <Text className="text" display={{ base: "none", lg: "block" }}>
                  Server
                </Text>
              </Group>

              <Group
                onClick={() => handleMenuBtn("installImageInfo")}
                p={"xs"}
                gap={0}
                className={`menu-item ${
                  menuBtn === "installImageInfo" ? "active" : ""
                }`}
                style={{
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <IconPhoto size={20} className="textIcon" />
                <Text className="text" display={{ base: "none", lg: "block" }}>
                  Photos
                </Text>
              </Group>

              <Group
                onClick={() => handleMenuBtn("historyInfo")}
                p={"xs"}
                gap={0}
                className={`menu-item ${
                  menuBtn === "historyInfo" ? "active" : ""
                }`}
                style={{
                  borderBottom: "1px solid #dddddd",
                }}
              >
                <IconHistory size={20} className="textIcon" />
                <Text className="text" display={{ base: "none", lg: "block" }}>
                  History
                </Text>
              </Group>

              <PermissionGate
                page={"installed_objects"}
                scope={"update"}
                errorProps={{ style: { display: "none" } }}
              >
                <Group
                  onClick={() =>
                    navigate("/installed/create", {
                      state: { id: param.state.id },
                    })
                  }
                  p={"xs"}
                  gap={0}
                  className={`menu-item ${menuBtn === "edit" ? "active" : ""}`}
                  style={{
                    borderBottom: "1px solid #dddddd",
                  }}
                >
                  <IconEdit size={20} className="textIcon" />
                  <Text
                    className="text"
                    display={{ base: "none", lg: "block" }}
                  >
                    Edit
                  </Text>
                </Group>
              </PermissionGate>
            </Flex>
          </Paper>
        )}

        {!isLoading && menuBtn == "client" ? (
          <ViewDetail
            title={"View Client"}
            data={clientData(installedObject?.items.client)}
            Icon={IconAddressBook}
          />
        ) : menuBtn == "contactPerson" ? (
          <ViewDetail
            isList={true}
            title="View Contact Person"
            Icon={IconUsersGroup}
          >
            <ContactPersonData
              data={installedObject?.items.client.contact_person}
            />
          </ViewDetail>
        ) : menuBtn == "vehicleInfo" ? (
          <ViewDetail
            isList={true}
            title={"View Vehicle Information"}
            Icon={IconTruckFilled}
          >
            <VehicleData vehicleId={installedObject?.items.id} />
          </ViewDetail>
        ) : menuBtn == "gpsInfo" ? (
          <ViewDetail isList={true} title={"View GPS Device"} Icon={IconRouter}>
            <GPSDeviceData data={installedObject?.items.device[0]} />
          </ViewDetail>
        ) : menuBtn == "simInfo" ? (
          <ViewDetail
            isList={true}
            title={"View SIM Card Information"}
            Icon={IconDeviceSim}
          >
            <SimCardData gpsDeviceId={installedObject?.items.device[0].id} />
          </ViewDetail>
        ) : menuBtn == "peripheralInfo" ? (
          <ViewDetail
            isList={true}
            title={"View Peripheral Information"}
            Icon={IconGitCompare}
          >
            <PeripheralData gpsDeviceId={installedObject?.items.device[0].id} />
          </ViewDetail>
        ) : menuBtn == "accessoryInfo" ? (
          <ViewDetail
            isList={true}
            title={"View Accessory Information"}
            Icon={IconPaperclip}
          >
            <AccessoryData gpsDeviceId={installedObject?.items.device[0].id} />
          </ViewDetail>
        ) : menuBtn == "serverInfo" ? (
          <ViewDetail
            isList={true}
            title={"View Server Information"}
            Icon={IconServer2}
          >
            <ServerData data={installedObject?.items.device[0].server[0]} />
          </ViewDetail>
        ) : menuBtn == "installImageInfo" ? (
          <InstallImageGallary data={installedObject?.items?.install_image} />
        ) : (
          <ViewDetail isList={true} title={"History"} Icon={IconHistory}>
            <HistoryData gpsDeviceId={installedObject?.items.device[0].id} />
          </ViewDetail>
        )}
      </Flex>
    </Box>
  );
};

export default InstallationDetailPage;
