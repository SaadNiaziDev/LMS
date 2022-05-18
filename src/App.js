import "./App.css";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import SignUp from './components/Signup'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<>
            404
          </>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
