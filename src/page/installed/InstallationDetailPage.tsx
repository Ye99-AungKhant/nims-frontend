import { Box, Flex, Group, Paper, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetInstalledDetail } from "./hooks/useGetInstalled";
import {
  IconAddressBook,
  IconDeviceSim,
  IconEdit,
  IconGitCompare,
  IconPaperclip,
  IconRouter,
  IconServer2,
  IconTruckFilled,
  IconUsersGroup,
} from "@tabler/icons-react";
import { PageLoading } from "../../components/common/PageLoading";
import ViewDetail from "./components/ViewDetail";
import {
  accessoryData,
  clientData,
  contactPersonData,
  gpsDeviceData,
  peripheralData,
  serverData,
  simCardData,
  vehicleData,
} from "./components/ViewDetailData";
import PermissionGate from "../../components/middleware/PermissionGate";

const InstallationDetailPage = () => {
  const theme = useMantineTheme();
  const [menuBtn, setMenuBtn] = useState<string>("client");
  const param = useLocation();
  const navigate = useNavigate();
  const { data: installedObject, isLoading } = useGetInstalledDetail(
    param.state.id
  );
  console.log(param.state.id, installedObject);

  const handleMenuBtn = (name: string) => {
    setMenuBtn(name);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Box style={{ display: "flex", gap: "30px" }} p="30px">
      {!isLoading && (
        <Paper shadow="sm" style={{ width: "31%" }}>
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
          <Box p="30px">
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
              <Text className="text">Client</Text>
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
              <Text className="text">Contact Persons</Text>
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
              <Text className="text">Vehicle Info</Text>
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
              <Text className="text">GPS Device</Text>
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
              <Text className="text">SIM Card</Text>
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
              <Text className="text">Peripheral</Text>
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
              <Text className="text">Accessory</Text>
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
              <Text className="text">Server</Text>
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
                <Text className="text">Edit</Text>
              </Group>
            </PermissionGate>
          </Box>
        </Paper>
      )}

      {!isLoading && menuBtn == "client" ? (
        <ViewDetail
          title={"View Client"}
          data={clientData(installedObject?.items.client)}
        />
      ) : menuBtn == "contactPerson" ? (
        <ViewDetail
          isList={true}
          title="View Contact Person"
          data={contactPersonData(installedObject?.items.client.contact_person)}
        />
      ) : menuBtn == "vehicleInfo" ? (
        <ViewDetail
          title={"View Vehicle Information"}
          data={vehicleData(installedObject?.items)}
        />
      ) : menuBtn == "gpsInfo" ? (
        <ViewDetail
          isList={true}
          title={"View GPS Device"}
          data={gpsDeviceData(installedObject?.items.device[0])}
        />
      ) : menuBtn == "simInfo" ? (
        <ViewDetail
          isList={true}
          title={"View SIM Card Information"}
          data={simCardData(installedObject?.items.device[0].simcard)}
        />
      ) : menuBtn == "peripheralInfo" ? (
        <ViewDetail
          isList={true}
          title={"View Peropheral Information"}
          data={peripheralData(installedObject?.items.device[0].peripheral)}
        />
      ) : menuBtn == "accessoryInfo" ? (
        <ViewDetail
          isList={true}
          title={"View Accessory Information"}
          data={accessoryData(installedObject?.items.device[0].accessory)}
        />
      ) : (
        <ViewDetail
          title={"View Server Information"}
          data={serverData(installedObject?.items.device[0].server[0])}
        />
      )}
    </Box>
  );
};

export default InstallationDetailPage;
