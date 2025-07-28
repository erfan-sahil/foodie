import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUser } from "@/api/userApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { createUser } = useCreateUser();
  const { user } = useAuth0();

  const hasCreatedUser = useRef(false);
  useEffect(() => {
    if (user?.email && user?.sub && !hasCreatedUser.current) {
      createUser({
        email: user.email || "",
        auth0Id: user.sub || "",
      });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <p>Loading...</p>
    </div>
  );
};

export default AuthCallbackPage;
