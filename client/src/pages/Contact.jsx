import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";
import { isValidEmail } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";

const Contact = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }
  async function onHandleSubmit(e){
    e.preventDefault();
    if(!userInput.name || !userInput.email || !userInput.message){
      toast.error("All fields are mandatory!");
      return;
    }
    if(!isValidEmail(userInput.email)){
      toast.error("Invalid email provided");
      return;
    }
    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your query",
        success: "Form Submitted successfully",
        error: "Failed to submit the form"
      })
      const responseData = await response;
      if(responseData?.data){
        setUserInput({
          name: "",
          email: "",
          message: ""
        })
      }
    } catch (error) {
      toast.error("Operation failed...")
    }
  }
  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[100vh]">
        <form
          noValidate
          onSubmit={onHandleSubmit}
          className="flex flex-col justify-center items-center gap-2 p-5 w-[22rem] rounded-md text-white "
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="bg-transparent px-2 py-1 border rounded-sm"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="axbyc@gmail.com"
              className="bg-transparent px-2 py-1 border rounded-sm"
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              type="text"
              name="message"
              id="message"
              placeholder="Enter your message"
              className="bg-transparent px-2 py-1 border rounded-sm resize-none h-40"
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>
          <button type="submit" className="w-full py-2 px-1 bg-yellow-400 text-white font-semibold text-xl border border-yellow-400 rounded-sm hover:bg-transparent hover:text-yellow-400 transition-all ease-in-out duration-300">
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Contact;
