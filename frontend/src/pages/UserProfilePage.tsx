import { useUpdateUser } from "@/api/userApi";
import UserProfileForm from "@/forms/user-profile-form/userProfileForm";

const UserProfilePage = () => {
  const { updateUser, isPending } = useUpdateUser();
  return (
    <>
      <UserProfileForm onSave={updateUser} isLoading={isPending} />
    </>
  );
};

export default UserProfilePage;
