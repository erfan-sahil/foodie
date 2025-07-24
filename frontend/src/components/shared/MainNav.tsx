import { Button } from "../ui/button";

const MainNav = () => {
  return (
    <Button
      variant="ghost"
      className="font-bold border border-orange-500 text-orange-500 bg-white hover:text-white hover:bg-orange-500 transition ease-in-out duration-300"
    >
      Log In
    </Button>
  );
};

export default MainNav;
