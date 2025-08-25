import { useCreateMyRestaurant, useGetMyRestaurant } from "@/api/restaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createMyRestaurant, isPending } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  return (
    <>
      <ManageRestaurantForm
        onSave={createMyRestaurant}
        isPending={isPending}
        restaurant={restaurant}
      />
    </>
  );
};

export default ManageRestaurantPage;
