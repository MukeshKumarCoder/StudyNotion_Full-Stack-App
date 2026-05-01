import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ChangeProfilePicture = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, navigate, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      toast.error(error.message);
      // console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
  return (
    <div className="rounded-md border border-richBlack-700 bg-richBlack-800 p-4 text-richBlack-5 sm:p-6 md:p-8 md:px-10 lg:px-12">
      <div className="flex min-w-0 flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-row sm:items-center">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-16 shrink-0 rounded-full object-cover sm:w-[72px] md:w-[78px]"
        />
        <div className="min-w-0 space-y-2 text-center sm:text-left">
          <p className="text-sm sm:text-base">Change Profile Picture</p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:justify-center sm:justify-start sm:gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              type="button"
              onClick={handleClick}
              disabled={loading}
              className="w-full cursor-pointer rounded-md bg-richBlack-700 py-2 px-4 text-sm font-semibold text-richBlack-50 min-[400px]:w-auto sm:px-5 sm:text-base"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
              customClasses="w-full justify-center min-[400px]:w-auto"
            >
              {!loading && <FiUpload className="text-lg text-richBlack-900" />}
            </IconBtn>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
