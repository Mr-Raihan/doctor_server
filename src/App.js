import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import Appoinment from './Pages/Appoinment/Appoinment';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/SignUp';
import Navbar from './Pages/Share/Navbar';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import Myappointment from './Pages/Dashboard/Myappointment';
import Myreview from './Pages/Dashboard/Myreview';
import MyHistory from './Pages/Dashboard/MyHistory';
import Users from './Pages/Dashboard/Users';
import RequireAdmin from './Pages/Login/RequireAdmin';

function App() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar></Navbar>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/appointment' element={
          <RequireAuth>
            <Appoinment/>
          </RequireAuth>
          }/>
          <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard/>
          </RequireAuth>
          }>
              <Route index element={<Myappointment></Myappointment>}></Route>
              <Route path='myreview' element={<Myreview></Myreview>}></Route>
              <Route path='myhistory' element={<MyHistory></MyHistory>}></Route>
              <Route path='users' element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
          </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
