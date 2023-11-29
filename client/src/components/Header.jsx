import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
    // Creating logout button on top bar once user is logged in
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout()); // D
        dispatch(reset());
        navigate('/'); // Navigate back to dashboard
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Superheroes</Link>
            </div>
            <ul>
                {/* If the user is logged in show logout */}
                { user ? (
                    <li>
                        <button className='btn' onClick={ onLogout }>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : (<>
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
                </>) }

            </ul>
        </header>
  )
}

export default Header