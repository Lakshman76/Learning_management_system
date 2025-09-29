import { useState } from "react";
import { TbMessageChatbot } from "react-icons/tb";
const MyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-base-300 shadow-lg p-4 z-50">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-200"
            onClick={toggleDrawer}
          >
            ✖
          </button>
          <h2 className="text-xl font-bold mb-4">Chatbot Drawer</h2>
          <p className="text-gray-500">
            This is the drawer content. You can put your chatbot UI here.
          </p>
        </div>
      )}

      {/* Overlay (Optional for closing the drawer by clicking outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
      <div
        className="text-4xl text-yellow-300 hover:text-yellow-600 hover:scale-110 active:scale-95 transition-transform animate-bounce"
        onClick={toggleDrawer}
      >
        <TbMessageChatbot />
      </div>
    </>
  );
};

export default MyChatbot;
