import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Loginpage from "./pages/login/Loginpage";
import Registerpage from "./pages/register/Register";
import Navbar from "./components/navbar";

//Toast config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AdminDashboard from "./pages/admin/admin_dashboard/AdminDashboard";




function App() {
  return (
      <Router>
        <Navbar/>
        <ToastContainer/>
        <Routes>
          <Route path="/"element = {<Homepage/>} />
          <Route path="/login"element = {<Loginpage/>}/>
          <Route path="/register"element = {<Registerpage/>}/>   

          {/*Admin routes*/}
          {/* <Route path = '/admin/dashboard' element= {<AdminDashboard/>} />    */}
        </Routes>
      </Router>
  );
}

export default App;
