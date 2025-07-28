import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUser } from "@/api/userApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const hasCreatedUser = useRef(false);
  const navigate = useNavigate();
  const { createUser } = useCreateUser();
  const { user } = useAuth0();

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({
        auth0Id: user.sub,
        email: user.email,
      }).catch((error) => {
        console.error("Failed to create user:", error);
      });
      hasCreatedUser.current = true;
    }

    navigate("/");
  }, [user, createUser, navigate]);
  return <div>Loading...</div>;
};

export default AuthCallbackPage;
