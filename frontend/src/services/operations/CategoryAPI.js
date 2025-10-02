import { categoryEndPoints } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

const { CREATE_CATEGORY_API } = categoryEndPoints;

export const CreateCategoryApi = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      CREATE_CATEGORY_API,
      {
        name: data.categoryName,
        description: data.categoryDescription,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section");
    }
    toast.success("Category Created Successfully");
    result = response?.data?.category;
  } catch (error) {
    console.log("CREATE_CATEGORY_API ERROR:", error);
    toast.error(error.response?.data?.message || "Error creating category");
  }
  toast.dismiss(toastId);
  return result;
};
