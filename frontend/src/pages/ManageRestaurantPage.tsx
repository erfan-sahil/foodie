import { useCreateRestaurant } from "@/api/restaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending } = useCreateRestaurant();
  return (
    <>
      <ManageRestaurantForm onSave={createRestaurant} isPending={isPending} />
    </>
  );
};

export default ManageRestaurantPage;
