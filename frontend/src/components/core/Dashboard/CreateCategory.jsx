import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import IconBtn from "../../common/IconBtn";
import { CreateCategoryApi } from "../../../services/operations/CategoryAPI";

const CreateCategory = () => {
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitCategoryForm = async (data) => {
    try {
      await CreateCategoryApi(data, token);
      reset();
      window.location.reload();
    } catch (error) {
      console.log("e", error);
      toast.error(error.response?.data?.message || "Error creating category");
    }
  };

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richBlack-5">
        Add Category
      </h1>
      <form onSubmit={handleSubmit(submitCategoryForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richBlack-700 bg-richBlack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richBlack-5">
            Create New Category
          </h2>
          <div className="flex flex-col space-y-2">
            <label htmlFor="categoryName" className="label-style">
              Category Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              className="form-style"
              {...register("categoryName", { required: true })}
            />
            {errors.categoryName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter Category name.
              </span>
            )}
          </div>

          {/* Category Description */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="categoryDescription" className="label-style">
              Category Description <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="categoryDescription"
              rows="4"
              placeholder="Enter category description"
              className="form-style resize-none"
              {...register("categoryDescription", { required: true })}
            />
            {errors.categoryDescription && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter Category description.
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            {" "}
            <IconBtn type="submit" text={"Category"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
