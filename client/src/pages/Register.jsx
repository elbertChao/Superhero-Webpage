import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        password: '',
        password2: ''
    });

    const { nickname, email, password, password2 } = formData;
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector (
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords do not match!');
        } else {
            const userData = {
                nickname,
                email,
                password,
            }
            // Dispatching reigster function from authSlice.js
            dispatch(register(userData));
        }
    }

    // If the system is loading, show spinner component
    if (isLoading) {
        return <Spinner />
    }

    return <>
        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>Create an account</p>
        </section>

        <section className='form'>
            <form onSubmit={ onSubmit }>
            <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        id="nickname"
                        name='nickname'
                        value={ nickname }
                        placeholder='Enter your nickname'
                        onChange={ onChange }
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email"
                        className="form-control"
                        id="email"
                        name='email'
                        value={ email }
                        placeholder='Enter your email'
                        onChange={ onChange }
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        className="form-control"
                        id="password"
                        name='password'
                        value={ password }
                        placeholder='Enter your password'
                        onChange={ onChange }
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        className="form-control"
                        id="password2"
                        name='password2'
                        value={ password2 }
                        placeholder='Confirm password'
                        onChange={ onChange }
                    />
                </div>
                <div className="form-group">
                    <button type='submit' className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
}

export default Register