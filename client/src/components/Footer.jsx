import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

import MyChatbot from "../pages/Chatbot/MyChatbot";
const Footer = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  return (
    <footer className="fixed w-full left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-white bg-gray-800">
      <section className="text-lg">
        Copyright {year} | All rights reserved
      </section>
      <section>
        <MyChatbot />
      </section>
      <section className="flex items-center justify-between gap-5 text-2xl text-white">
        <a
          href="#"
          className="hover:text-blue-500 transition-all ease-in-out duration-300"
        >
          <BsFacebook />
        </a>
        <a
          href="#"
          className="hover:text-red-400 transition-all ease-in-out duration-300"
        >
          <BsInstagram />
        </a>
        <a
          href="#"
          className="hover:text-blue-500 transition-all ease-in-out duration-300"
        >
          <BsLinkedin />
        </a>
        <a
          href="#"
          className="hover:text-blue-500 transition-all ease-in-out duration-300"
        >
          <BsTwitter />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
