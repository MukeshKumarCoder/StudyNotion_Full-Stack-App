import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../../services/operations/SettingsAPI";

const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE", error.message);
    }
  };
  return (
    <div className="my-6 flex min-w-0 flex-col gap-4 rounded-md border border-pink-700 bg-pink-900 p-4 sm:my-8 sm:flex-row sm:gap-5 sm:p-6 md:my-10 md:p-8 md:px-10 lg:px-12">
      <div className="mx-auto flex aspect-square h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-700 sm:mx-0 sm:h-14 sm:w-14">
        <FiTrash2 className="text-2xl text-pink-200 sm:text-3xl" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col space-y-2 text-center sm:text-left">
        <h2 className="text-base font-semibold text-richBlack-5 sm:text-lg">
          Delete Account
        </h2>
        <div className="w-full min-w-0 max-w-prose text-sm text-pink-25 sm:text-base">
          <p>Would you like to delete account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the contain associated with it.
          </p>
        </div>
        <button
          type="button"
          className="mx-auto w-fit cursor-pointer break-words text-left italic text-pink-300 underline-offset-2 hover:underline sm:mx-0"
          onClick={handleDeleteAccount}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
