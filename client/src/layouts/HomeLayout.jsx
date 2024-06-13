import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";

const HomeLayout = ({ children }) => {
  
  function changeWidth() {
    const drowerSide = document.getElementsByClassName("drawer-side");
    drowerSide[0].style.width = "auto";
  }

  function hideDrawer(){
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
    const drowerSide = document.getElementsByClassName("drawer-side");
    drowerSide[0].style.width = 0;
  }

  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle />
              </button>
            </li>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About Us</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact Us</Link>
            </li>
            <li>
              <Link to={"/courses"}>All Courses</Link>
            </li>
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
