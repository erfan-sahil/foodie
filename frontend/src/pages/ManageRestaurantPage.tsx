import { useCreateRestaurant, useGetRestaurant } from "@/api/restaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending } = useCreateRestaurant();
  const { restaurant, isPending: restaurantIsPending } = useGetRestaurant();
  return (
    <>
      <ManageRestaurantForm
        onSave={createRestaurant}
        isPending={isPending}
        restaurant={restaurant}
        restaurantIsPending={restaurantIsPending}
      />
    </>
  );
};

export default ManageRestaurantPage;
