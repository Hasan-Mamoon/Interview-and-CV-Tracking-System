//import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>}></Route> 
      <Route path="/signin" element={<SignIn/>}></Route> 
    </Routes>
        
    </BrowserRouter>
    
    </>

  );
}

export default App;
