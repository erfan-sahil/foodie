import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/myRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createMyRestaurant, isPending: isCreatePending } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateMyRestaurant, isPending: isUpdatePending } =
    useUpdateMyRestaurant();

  const isEditing = !!restaurant;
  return (
    <>
      <ManageRestaurantForm
        onSave={isEditing ? updateMyRestaurant : createMyRestaurant}
        isPending={isCreatePending || isUpdatePending}
        restaurant={restaurant}
      />
    </>
  );
};

export default ManageRestaurantPage;
