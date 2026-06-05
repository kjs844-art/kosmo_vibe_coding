import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import MemberLogin from "./components/members/MemberLogin";

function Home() {
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/login" element={<MemberLogin />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
