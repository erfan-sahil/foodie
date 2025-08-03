import { useGetUser, useUpdateUser } from "@/api/userApi";
import UserProfileForm from "@/forms/user-profile-form/userProfileForm";

const UserProfilePage = () => {
  const { currentUser, isPending: isGetPending } = useGetUser();
  const { updateUser, isPending: isUpdatePending } = useUpdateUser();

  if (isGetPending) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return <p>No user data available.</p>;
  }
  return (
    <>
      <UserProfileForm
        currentUser={currentUser}
        onSave={updateUser}
        isLoading={isUpdatePending}
      />
    </>
  );
};

export default UserProfilePage;
