import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store/auth';

const HomePage = () => {
  console.log('Render: Home');

  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const onLoginHandler = () => navigate('/login');
  const onLogoutHandler = () => logout();

  return (
    <div>
      <p>Home</p>
      {!isLoggedIn ? (
        <button onClick={onLoginHandler}>Login</button>
      ) : (
        <button onClick={onLogoutHandler}>Logout</button>
      )}
    </div>
  );
};

export default HomePage;
