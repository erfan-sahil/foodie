import { useGetUser, useUpdateUser } from "@/api/userApi";
import UserProfileForm from "@/forms/user-profile-form/userProfileForm";

const UserProfilePage = () => {
  const { currentUser, isPending: isGetPending } = useGetUser();
  const { updateUser, isPending: isUpdatePending } = useUpdateUser();
  return (
    <>
      {isGetPending ? (
        <p> Loading....</p>
      ) : (
        <UserProfileForm
          currentUser={currentUser}
          onSave={updateUser}
          isLoading={isUpdatePending}
        />
      )}
    </>
  );
};

export default UserProfilePage;
