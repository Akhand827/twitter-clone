import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: async (formData) => {
        try {
          const res = await fetch(`/api/users/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          console.log("Response received", res);
          const data = await res.json();
          console.log("response data", data);
          if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
          }
          return data;
        } catch (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: async (updatedUser) => {
        console.log("Updated user profile:", updatedUser);

        queryClient.setQueryData(["authUser"], updatedUser);

        queryClient.setQueryData(
          ["userProfile", updatedUser.username],
          updatedUser,
        );

        await queryClient.invalidateQueries({
          queryKey: ["authUser"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["userProfile"],
        });

        toast.success("Profile updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateProfile, isUpdatingProfile };
};

export default useUpdateUserProfile;
