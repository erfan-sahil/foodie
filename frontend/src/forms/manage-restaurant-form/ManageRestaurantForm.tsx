import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/types/types";
import { useEffect } from "react";

const formSchema = z.object({
  restaurantName: z
    .string()
    .nonempty({ message: "Restaurant name is required" }),
  city: z.string().nonempty({ message: "City name is required" }),
  country: z.string().nonempty({ message: "Country name is required" }),
  deliveryPrice: z.coerce
    .number()
    .min(1, { message: "Delivery price is required" }),
  estimatedDeliveryTime: z.coerce
    .number()
    .min(1, { message: "Estimated delivery time is required" }),
  cuisines: z
    .array(z.string())
    .nonempty({ message: "Please select at least one item" }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      price: z.coerce.number().min(1, "Price is required"),
    })
  ),
  imageFile: z
    .instanceof(File)
    .refine((file) => !!file, { message: "Image is required" }),
});

type RestaurantFormData = z.input<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isPending: boolean;
  restaurantIsPending: boolean;
};

const ManageRestaurantForm = ({
  restaurant,
  onSave,
  isPending,
  restaurantIsPending,
}: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  console.log(restaurant);
  useEffect(() => {
    if (!restaurant) {
      return;
    }
    const newRestaurantFormData = {
      ...restaurant,
      restaurantName: restaurant.restaurantName,
      city: restaurant.city,
      country: restaurant.country,
      deliveryPrice: restaurant.deliveryPrice,
      estimatedDeliveryTime: restaurant.estimatedDeliveryTime,
      cuisines: restaurant.cuisines,
      menuItems: restaurant.menuItems.map((item) => ({
        name: item.name,
        price: item.price,
      })),
    };
    form.reset(newRestaurantFormData);
  }, [form, restaurant]);

  if (restaurantIsPending) {
    return <LoadingButton />;
  }

  const onSubmit = (formDataJson: RestaurantFormData) => {
    console.log("onSubmit function calling:");
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice as number).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      (formDataJson.estimatedDeliveryTime as number).toString()
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price as number).toString()
      );
    });

    formData.append("imageFile", formDataJson.imageFile);

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isPending ? (
          <LoadingButton />
        ) : (
          <Button type="submit"> Submit </Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
