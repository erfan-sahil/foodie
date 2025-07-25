import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";
import UserNameMenu from "./UserNameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <UserNameMenu />
      ) : (
        <Button
          variant="ghost"
          className="px-5 py-2 font-bold border border-orange-500 text-orange-500 bg-white hover:text-white hover:bg-orange-500 transition ease-in-out duration-300"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
