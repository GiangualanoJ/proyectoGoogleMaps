import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './firebase/componenetes/login';
import Mapa from './mapa';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/mapa' element={<Mapa />}/>
        </Routes>
      </Router>
    </div>
  );
}

/* const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('firebaseToken');
    if (token) {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          navigate('/');
        }
      });
    } else {
      navigate('/');
    }
  }, []);

  return children;
} */

export default App;
