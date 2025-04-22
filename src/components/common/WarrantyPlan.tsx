import { useCreateWarrantyPlan } from "../../hooks/useCreateWarrantyPlan";
import { useDeleteWarrantyPlan } from "../../hooks/useDeleteWarrantyPlan";
import { useUpdateWarrantyPlan } from "../../hooks/useUpdateWarrantyPlan";
import { useGetWarrantyPlans } from "../../hooks/useGetWarrantyPlans";
import { AddItemModal } from "./AddItemModal";

interface Props {
  title: string;
  type_group: string;
  opened: boolean;
  close: () => void;
}
const WarrantyPlan = ({ title, type_group, opened, close }: Props) => {
  const { data: warrantyData } = useGetWarrantyPlans();
  const { mutate: createWarrantyPlan } = useCreateWarrantyPlan();
  const { mutate: updateWarrantyPlan } = useUpdateWarrantyPlan();
  const { mutate: deleteWarrantyPlan } = useDeleteWarrantyPlan();

  return (
    <AddItemModal
      title={title}
      opened={opened}
      close={close}
      mutationFn={createWarrantyPlan}
      updateMutationFn={updateWarrantyPlan}
      deleteMutationFn={deleteWarrantyPlan}
      selectItem={warrantyData?.data.data}
      dataList={warrantyData?.data.data}
      type_group={type_group}
    />
  );
};

export default WarrantyPlan;
