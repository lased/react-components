import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from 'store/auth';

import './HomePage.css';

const HomePage = () => {
  console.log('Render: Home');

  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const onLoginHandler = () => navigate('/login');
  const onLogoutHandler = () => logout();

  return (
    <section className="home-page">
      <header>Home page</header>
      <Link to="/protected">To protected</Link>
      {!isLoggedIn ? (
        <button onClick={onLoginHandler}>Login</button>
      ) : (
        <button onClick={onLogoutHandler}>Logout</button>
      )}
    </section>
  );
};

export default HomePage;
