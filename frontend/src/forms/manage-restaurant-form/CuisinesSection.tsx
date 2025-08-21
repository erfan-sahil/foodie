import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

const CuisinesSection = () => {
  const { control } = useFormContext;
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisnies</h2>
        <FormDescription>
          Select the cuisines that your restaurant offers. You can select
          multiple cuisines.
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <div className=""></div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
