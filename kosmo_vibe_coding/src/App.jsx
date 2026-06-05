import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import MemberLogin from "./components/members/MemberLogin";
import Index from "./components/Index";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/member/login" element={<MemberLogin />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
