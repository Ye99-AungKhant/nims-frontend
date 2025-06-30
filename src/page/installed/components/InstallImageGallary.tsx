import {
  Box,
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
    <Box my={"lg"}>
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
  console.log(data);

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
    <Paper shadow="sm" style={{ flex: 1, width: "70%" }}>
      <Group
        style={{ borderBottom: "1px solid #dddddd", paddingLeft: "25px" }}
        py="md"
        gap={0}
      >
        <IconPhoto size={24} />
        <Text size="lg" fw={700} c={"dark"} ml={"8px"}>
          Photos
        </Text>
      </Group>

      <Box px={30} pb={10}>
        {renderPhotoGroup("Installed Photos", data.installed)}
        {renderPhotoGroup("Replacement Photos", data.replacement)}
        {renderPhotoGroup("Repair Photos", data.repair)}
        {renderPhotoGroup("Vehicle Changed Photos", data.vehicleChange)}
      </Box>
    </Paper>
  );
};
