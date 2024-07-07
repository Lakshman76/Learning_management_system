import { useNavigate } from "react-router-dom";

const Denied = () => {
  const navigate = useNavigate();
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-semibold text-white tracking-widest">403</h1>
      <div className="bg-black px-2 text-white text-sm rounded rotate-12 absolute">
        Access Denied
      </div>
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-medium text-[#FF6A3D] active:text-yellow-500 focus:outline-none"
      >
        <span className="relative block top-5 px-8 py-3 bg-[#1A2238] border border-current">
          Go back
        </span>
      </button>
    </main>
  );
};

export default Denied;
