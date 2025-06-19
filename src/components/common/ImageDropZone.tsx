import React, { useEffect, useRef, useState } from "react";
import { ActionIcon, Group, Image, Loader, Text, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconX } from "@tabler/icons-react";
import imageCompression from "browser-image-compression";
import { environment } from "../../config/enviroment/environment";
import { useDeleteInstallImage } from "../../hooks/useDeleteInstallImage";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useDisclosure } from "@mantine/hooks";

interface Props {
  setFieldValue: any;
  data: any[] | undefined;
  isEditMode: boolean;
}

interface PreviewImage {
  id?: number;
  url?: string;
  file?: File;
}

const ImageDropZone = ({ setFieldValue, data, isEditMode }: Props) => {
  const [files, setFiles] = useState<PreviewImage[]>([]);
  const didRun = useRef(false);
  const { mutate: installImageDeleteMutate, isPending: isDeleteLoading } =
    useDeleteInstallImage();
  const [deleteId, setDeleteId] = useState<{ id: any; index: number }>();
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(data);

  const compressImages = async (images: File[]) => {
    const compressedFiles = await Promise.all(
      images.map(async (file) => {
        const options = {
          maxSizeMB: 1, // Max size in MB
          maxWidthOrHeight: 1024, // Resize image if it's larger
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(file, options);
          console.log("compressedFile", compressedFile);

          return compressedFile;
        } catch (error) {
          console.error("Compression error:", error);
          return file;
        }
      })
    );
    return compressedFiles;
  };

  const handleDrop = async (acceptedFiles: File[]) => {
    console.log("acceptedFiles", acceptedFiles);

    setIsLoading(true);
    const compressed = await compressImages(acceptedFiles);

    const newPreviewImages = compressed.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setFiles((prev) => [...prev, ...newPreviewImages]);
    setIsLoading(false);
  };

  const handleRemoveImage = (fileId: number | undefined, index: number) => {
    if (fileId) {
      setDeleteId({ id: fileId, index });
      open();
    } else {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  const handleDeleteImage = () => {
    installImageDeleteMutate(deleteId?.id, {
      onSuccess: () => {
        setFiles((prevFiles) =>
          prevFiles.filter((_, i) => i !== deleteId?.index)
        );
        close();
      },
    });
  };

  const previews = files.map((file, index) => {
    return (
      <div
        key={index}
        style={{
          position: "relative",
          display: "inline-block",
          marginRight: 10,
        }}
      >
        <Image
          key={index}
          src={file.url}
          alt={`new-preview-${index}`}
          width={100}
          height={100}
          radius="md"
          style={{ objectFit: "cover" }}
        />
        <ActionIcon
          color="rgba(0,0,0,0.5)"
          variant="filled"
          size="sm"
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 2,
          }}
          onClick={() => handleRemoveImage(file.id, index)}
        >
          <IconX size={14} />
        </ActionIcon>
      </div>
    );
  });

  useEffect(() => {
    setFieldValue("installImage", files);
  }, [files]);

  useEffect(() => {
    if (!didRun.current && isEditMode) {
      const notFile =
        data
          ?.filter((img: any) => img.id != undefined && img)
          ?.map((img: any) => ({
            id: img.id,
            url: environment.API_BASE_URL + img.image_url,
          })) || [];
      setFiles(notFile);
      didRun.current = true;
    }
  }, [data]);

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        onReject={(fileRejections) =>
          console.log("Rejected files", fileRejections)
        }
        maxSize={20 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple
        style={{
          cursor: "pointer",
          border: "1px solid #d9dbe9",
          borderRadius: 10,
        }}
        m={"lg"}
      >
        <Group
          justify="center"
          gap="xs"
          mih={300}
          style={{
            pointerEvents: "none",
            flexDirection: "column",
            // border: "1px solid gray",
          }}
        >
          <IconUpload
            style={{ width: rem(40), height: rem(40), color: "gray" }}
          />
          <Text size="sm" c="dimmed">
            Drag images here or click to select files
          </Text>
        </Group>
      </Dropzone>

      <Group mt="md" gap="sm">
        {previews}
        {isLoading && <Loader size={"sm"} />}
      </Group>

      <DeleteConfirmModal
        opened={opened}
        isloading={isDeleteLoading}
        onClose={close}
        title={"Install Photo"}
        id={deleteId?.id}
        onDelete={handleDeleteImage}
      />
    </>
  );
};

export default ImageDropZone;
