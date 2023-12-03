import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListForm from '../components/ListForm';
import ListItem from '../components/ListItem';
import Spinner from '../components/Spinner';
import SuperheroDetails from '../components/SuperheroDetails';
import { getLists, reset, deleteList } from '../features/lists/listSlice';

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

  const handleDeleteList = (listId) => {
    // Dispatch the deleteList action with the listId
    dispatch(deleteList(listId));
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.nickname}</h1>
        <p>Lists Dashboard</p>
      </section>

      <ListForm />

      <section className="content">
        {lists.length > 0 ? (
          <div className="lists">
            {lists.map((list) => (
              <div key={list._id} className="list-item">
                <h2>{list.title}</h2>
                <p>Superhero IDs: {list.superheroIds.join(', ')}</p>
                <div>
                  {list.superheroIds.map((superheroID) => (
                    <SuperheroDetails key={superheroID} superheroID={superheroID} />
                  ))}
                </div>
                <button onClick={() => handleDeleteList(list._id)}>
                  Delete List
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h3>You do not have any lists created </h3>
        )}
      </section>
    </>
  );
}

export default Dashboard