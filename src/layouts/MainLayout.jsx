/** @format */
import ChatBotButton from "../components/ChatBotButton";
import { NavBar } from "../components/NavBar";
const MainLayout = ({ children }) => {
  return (
    <div className="relative bg-cover bg-center flex flex-col items-center w-full">
      <NavBar />
      {children}
      <ChatBotButton />
    </div>
  );
};

export default MainLayout;
