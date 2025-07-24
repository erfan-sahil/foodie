import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 text-orange-500" />
      </SheetTrigger>
      <SheetContent className="py-6 px-3">
        <SheetTitle>Welcome to Foodie</SheetTitle>
        <Separator />
        <SheetDescription className="flex">
          <Button
            variant="ghost"
            className="font-bold border border-orange-500 text-orange-500 bg-white hover:text-white hover:bg-orange-500 transition ease-in-out duration-300 flex-1 py-2"
          >
            Log In
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
