import { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    
    isLoggedIn 
    ? 
    <Home 
      password={password}
      username={username}
    />
    : <Login 
        onUsernameChange={setUsername} 
        onPasswordChange={setPassword}
        password={password}
        username={username}
        onLoggedIn={setIsLoggedIn}
      />
  );
}

export default App;
