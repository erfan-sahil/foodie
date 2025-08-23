import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";

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
  onSave: (restaurantFormData: FormData) => void;
  isPending: boolean;
};

const ManageRestaurantForm = ({ onSave, isPending }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJson: RestaurantFormData) => {
    //
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
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
