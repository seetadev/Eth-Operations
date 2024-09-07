import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import UploadFile from "./pages/UploadIpfs";

function App() {
  return (
    <Router>
      <main className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <Routes>
          <Route path="/" element={<UploadFile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
