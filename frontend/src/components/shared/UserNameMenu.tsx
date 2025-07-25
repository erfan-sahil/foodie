import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const UserNameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange gap-2">
        <CircleUserRound className="text-orange-500" />
        <span className="hover:text-orange-500 transition ease-out duration-300 cursor-pointer">
          {user?.email}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 py-4 px-3">
        <div className="text-center">
          <Link
            to="user-profile"
            className="font-bold hover:text-orange-500 transition ease-in-out duration-300"
          >
            User Profile
          </Link>
        </div>
        <Separator />
        <div className="flex items-center">
          <Button
            onClick={async () => await logout()}
            className="flex flex-1 font-bold bg-orange-500 hover:bg-orange-600 transition ease-in-out duration-300 text-white cursor-pointer"
          >
            Log Out
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNameMenu;
