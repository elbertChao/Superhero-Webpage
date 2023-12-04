// Importing necessary components and functions from external libraries and files
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

// React functional component for the header
function Header() {
    // Initializing variables and functions using hooks from React
    const navigate = useNavigate(); // Hook for programmatic navigation
    const dispatch = useDispatch(); // Hook to dispatch actions to Redux store
    const { user } = useSelector((state) => state.auth); // Selecting user information from the Redux store

    // Function to handle user logout
    const onLogout = () => {
        dispatch(logout()); // Dispatching logout action to Redux store
        dispatch(reset()); // Dispatching reset action to Redux store
        navigate('/home'); // Navigating to the home page after logout
    }

    // Rendering the header component
    return (
        <header className='header'>
            {/* Navigation links for different sections of the application */}
            <div className='logo'>
                <Link to='/home'>Superheroes</Link>
            </div>
            <div className='logo'>
                <Link to='/'>Lists</Link>
            </div>
            <div className='logo'>
                <Link to='/sppolicy'>Security & Privacy Policy</Link>
            </div>
            <div className='logo'>
                <Link to='/aup'>AUP</Link>
            </div>
            <div className='logo'>
                <Link to='/dmca'>DMCA Notice & Takedown Policy</Link>
            </div>
            
            {/* User authentication-related links and buttons */}
            <ul>
                {user ? ( // Conditional rendering based on user authentication status
                    // Render logout button if the user is logged in
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : ( // Render login and register links if the user is not logged in
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
  );
}

// Exporting the Header component as the default export
export default Header;
