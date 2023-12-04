import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListForm from '../components/ListForm';
import ListItem from '../components/ListItem';
import Spinner from '../components/Spinner';
import SuperheroDetails from '../components/SuperheroDetails';
import { getLists, reset, deleteList } from '../features/lists/listSlice';

// Dashboard component
function Dashboard() {
  // Hooks for navigation, dispatch, and state selection
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selecting user and lists from Redux state
  const { user } = useSelector((state) => state.auth);
  const { lists, isLoading, message, isError } = useSelector((state) =>
    state.lists
  );

  // useEffect hook to perform actions on component mount and unmount
  useEffect(() => {
    // Handle errors by logging the message to the console
    if (isError) {
      console.log(message);
    }

    // If no user is logged in, redirect to the home screen
    if (!user) {
      navigate('/home');
    }

    // Dispatch the getLists action to retrieve user's lists
    dispatch(getLists());

    // Cleanup function to reset the lists state on component unmount
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  // Function to handle list deletion
  const handleDeleteList = (listId) => {
    // Dispatch the deleteList action with the listId
    dispatch(deleteList(listId));
  };

  // Render loading spinner while data is being fetched
  if (isLoading) {
    return <Spinner />;
  }

  // Render the dashboard content
  return (
    <>
      {/* Dashboard heading */}
      <section className="heading">
        <h1>Welcome {user && user.nickname}</h1>
        <p>Lists Dashboard</p>
      </section>

      {/* Form for creating new lists */}
      <ListForm />

      {/* Content section displaying user's lists */}
      <section className="content">
        {lists.length > 0 ? (
          <div className="lists">
            {/* Display each list */}
            {lists.map((list) => (
              <div key={list._id} className="list-item">
                <h2>{list.title}</h2>
                <p>Superhero IDs: {list.superheroIds.join(', ')}</p>
                <div>
                  {/* Display details for each superhero in the list */}
                  {list.superheroIds.map((superheroID) => (
                    <SuperheroDetails
                      key={superheroID}
                      superheroID={superheroID}
                    />
                  ))}
                </div>
                {/* Button to delete the list */}
                <button onClick={() => handleDeleteList(list._id)}>
                  Delete List
                </button>
              </div>
            ))}
          </div>
        ) : (
          // Display message if the user has no lists
          <h3>You do not have any lists created </h3>
        )}
      </section>
    </>
  );
}

// Exporting the Dashboard component as the default export
export default Dashboard;
