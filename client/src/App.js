// Importing necessary components and functions from external libraries and files
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Importing the Header component
import Home from './pages/Home'; // Importing the Home page component
import Dashboard from './pages/Dashboard'; // Importing the Dashboard page component
import Login from './pages/Login'; // Importing the Login page component
import Register from './pages/Register'; // Importing the Register page component
import SPPolicy from './pages/SPPolicy'; // Importing the SPPolicy page component
import AUP from './pages/AUP'; // Importing the AUP page component
import DMCAPolicy from './pages/DMCAPolicy'; // Importing the DMCAPolicy page component
import { ToastContainer } from 'react-toastify'; // Importing the ToastContainer component for displaying toasts
import 'react-toastify/dist/ReactToastify.css'; // Importing styles for ToastContainer

// React functional component for the main App
function App() {
  return (
    <>
      {/* Initializing the Router for handling navigation */}
      <Router>
        {/* Container for the entire application */}
        <div className='container'>
          {/* Rendering the Header component for navigation */}
          <Header />
          
          {/* Defining routes for the application */}
          <Routes>
            {/* Route for the Home page */}
            <Route path='/home' element={<Home />} />
            {/* Route for the Dashboard page */}
            <Route path='/' element={<Dashboard />} />
            {/* Route for the Login page */}
            <Route path='/login' element={<Login />} />
            {/* Route for the Register page */}
            <Route path='/register' element={<Register />} />
            {/* Route for the Security & Privacy Policy page */}
            <Route path='sppolicy' element={<SPPolicy />} />
            {/* Route for the Acceptable Use Policy page */}
            <Route path='/aup' element={<AUP />} />
            {/* Route for the DMCA Policy page */}
            <Route path='/dmca' element={<DMCAPolicy />} />
          </Routes>
        </div>
      </Router>
      
      {/* ToastContainer for displaying notifications/toasts */}
      <ToastContainer />
    </>
  );
}

// Exporting the App component as the default export
export default App;
