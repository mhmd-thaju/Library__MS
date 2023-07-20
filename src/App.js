//import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/main";
import { Login } from "./pages/authentication/login";
import { SignUp } from "./pages/authentication/signup";
import { Navbar } from "./components/navbar";
//import { ShowBooks } from "./pages/show_books";
import { Landing } from "./pages/Admin/adminlanding";
import { Addbook } from "./pages/Admin/addbook";
import { Adminview } from "./pages/Admin/adminview";
import { Pagenotfound } from "./pages/notfound";
import { Uland } from "./pages/user/userlanding";
import { UserV } from "./pages/user/userview";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/alanding" element={<Landing />} />
          <Route path="/addbook" element={<Addbook />} />
          <Route path="/adminview" element={<Adminview />} />
          <Route path="/ulanding" element={<Uland />} />
          <Route path="/uview" element={<UserV />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </Router>
    </div>
  );
}
