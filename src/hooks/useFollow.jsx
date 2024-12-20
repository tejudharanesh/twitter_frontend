import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: follow, isPending } = useMutation({
    mutationFn: async (userId) => {
      try {
        const response = await fetch(`/api/users/follow/${userId}`, {
          method: "POST",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to follow");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    follow,
    isPending,
  };
};

export default useFollow;
