import React from "react";
import ImageDropZone from "../../../components/common/ImageDropZone";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../../../utils/types";

interface InstallInfoProps {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  isEditMode: boolean;
}

const ImageInfo = ({ form, isEditMode }: InstallInfoProps) => {
  const { setFieldValue, values } = form;
  const data = values.installImage;

  console.log("installImage", data);

  return (
    <ImageDropZone
      setFieldValue={setFieldValue}
      data={data}
      isEditMode={isEditMode}
    />
  );
};

export default ImageInfo;
