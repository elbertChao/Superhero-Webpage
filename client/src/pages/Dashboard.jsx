import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListForm from '../components/ListForm';


function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/home')
    }
  }, [user, navigate]);

  return <>
    <section className="heading">
      <h1>Welcome { user && user.nickname}</h1>
      <p>Private Lists Dashboard</p>
    </section>

    <ListForm />
  </>
}

export default Dashboard