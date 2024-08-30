import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import { getUserData } from "../../redux/slices/authSlice";
import { cancelCourseBundle } from "../../redux/slices/razorpaySlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  async function handleCancelSubscription() {
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation complete");
    navigate("/");
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex justify-center items-center ">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
          <img
            src={userData?.avatar?.secure_url}
            alt="user profile"
            className="w-40 m-auto rounded-full border border-black"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div>
            <div className="flex justify-between items-center gap-2">
              <p>Email: </p> <p>{userData?.email}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <p>Role: </p> <p>{userData?.role}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <p>Subscription: </p>
              <p>
                {userData?.subscription === "active" ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <Link
              to="/change-password"
              className="w-1/2 py-2 text-center rounded-sm font-semibold  cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
            >
              <button>Change Password</button>
            </Link>
            <Link
              to="/user/edit-profile"
              className="w-1/2 py-2 text-center rounded-sm font-semibold  cursor-pointer bg-yellow-500 border border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all ease-in-out duration-300"
            >
              <button>Edit Profile</button>
            </Link>
          </div>
          {userData?.subscription === "active" && (
            <button
              onClick={handleCancelSubscription}
              className="w-full h-12 text-center rounded-sm font-semibold  cursor-pointer bg-red-500 border border-red-500 hover:bg-transparent hover:text-red-500 transition-all ease-in-out duration-300"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;
