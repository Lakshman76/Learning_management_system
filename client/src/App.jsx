import { Route, Routes } from "react-router-dom";

import RequireAuth from "./components/Auth/RequireAuth";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import CourseDescription from "./pages/courses/CourseDescription";
import CourseList from "./pages/courses/CourseList";
import CreateCourse from "./pages/courses/CreateCourse";
import DisplayLecture from "./pages/Dashboard/DisplayLecture";
import Denied from "./pages/Denied";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import EditProfile from "./pages/User/EditProfile";
import Profile from "./pages/User/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/course/description" element={<CourseDescription />} />
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/courses/displayLectures" element={<DisplayLecture />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/edit-profile" element={<EditProfile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
