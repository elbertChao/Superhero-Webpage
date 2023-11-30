import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListForm from '../components/ListForm';
import ListItem from '../components/ListItem';
import Spinner from '../components/Spinner';
import { getLists, reset } from '../features/lists/listSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { lists, isLoading, message, isError } = useSelector((state) =>
   state.lists);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) { // No user logged in so just show home screen
      navigate('/home')
    }

    dispatch(getLists());

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);


  if (isLoading) {
    return <Spinner />
  }

  return <>
    <section className="heading">
      <h1>Welcome { user && user.nickname}</h1>
      <p>Private Lists Dashboard</p>
    </section>

    <ListForm />

    <section className="content">
      { lists.length > 0 ? (
        <div className="lists">
          { lists.map((list) => (
            <ListItem key={ list._id } list={ list }/>
          ))}
        </div>
      ) : (<h3>You do not have any lists created </h3>) }
    </section>
  </>
}

export default Dashboard