//import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/mentor/signup" element={<SignUp/>}></Route> 
      <Route path="/mentor/signin" element={<SignIn/>}></Route> 
      <Route path='/mentor/dashboard' element={<Dashboard/>}></Route>
    </Routes>
        
    </BrowserRouter>
    
    </>

  );
}

export default App;
