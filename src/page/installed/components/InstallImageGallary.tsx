import {
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { environment } from "../../../config/enviroment/environment";

interface Props {
  data: {
    installed: any[];
    replacement: any[];
    repair: any[];
    vehicleChange: any[];
  };
}

const renderPhotoGroup = (title: string, photos: any[]) => {
  if (photos.length === 0) return null;

  return (
    <Box>
      <Text fw={"bold"} mb={10}>
        {title}
      </Text>
      <ScrollArea h={300} scrollbars="y">
        <Grid>
          {photos.map((photo) => (
            <Grid.Col key={photo.id} span={4}>
              <a
                href={environment.API_BASE_URL + photo.image_url}
                data-fancybox
              >
                <Image
                  src={environment.API_BASE_URL + photo.image_url}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                  }}
                />
              </a>
            </Grid.Col>
          ))}
        </Grid>
      </ScrollArea>
    </Box>
  );
};

export const InstallImageGallary = ({ data }: Props) => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      Toolbar: {
        display: {
          left: [],
          middle: ["zoomIn", "zoomOut", "rotateCCW", "rotateCW", "reset"],
          right: ["close"],
        },
      },
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <Paper shadow="sm" w={{ base: "100%", md: "69%" }} style={{ flex: 1 }}>
      <Group
        style={{ borderBottom: "1px solid #dddddd" }}
        py={{ base: 15, sm: "md" }}
        pl={{ base: 15, sm: 30 }}
        gap={0}
      >
        <IconPhoto size={24} />
        <Text size="lg" fw={700} c={"dark"} ml={"8px"}>
          Photos
        </Text>
      </Group>

      <Flex
        direction={"row"}
        gap={{ base: 15, md: 30 }}
        px={{ base: 15, sm: 30 }}
        py={{ base: 20, sm: 30 }}
      >
        {data.installed.length === 0 &&
        data.replacement.length === 0 &&
        data.repair.length === 0 &&
        data.vehicleChange.length === 0 ? (
          <Flex justify={"center"} w={"100%"}>
            <Text>NO DATA FOUND!!!</Text>
          </Flex>
        ) : (
          <>
            {renderPhotoGroup("Installed Photos", data.installed)}
            {renderPhotoGroup("Replacement Photos", data.replacement)}
            {renderPhotoGroup("Repair Photos", data.repair)}
            {renderPhotoGroup("Vehicle Changed Photos", data.vehicleChange)}
          </>
        )}
      </Flex>
    </Paper>
  );
};
