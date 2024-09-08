import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <nav className="sticky top-4 flex items-center justify-between py-3 px-5 rounded-full mt-4 w-full max-w-[1200px] mx-auto bg-gray-600/20 backdrop-blur-lg z-[100]">
      <Link to="/">
     <h1 className="font-extrabold text-2xl"> DeciReport</h1>
      </Link>
      <ConnectButton
        showBalance={false}
        chainStatus={{ smallScreen: "none", largeScreen: "icon" }}
      />
    </nav>
  );
}
