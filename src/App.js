import { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState();

  return (
    
    isLoggedIn 
    ? 
    <Home 
      password={password}
      username={username}
      userId={userId}
    />
    : <Login 
        onUsernameChange={setUsername} 
        onPasswordChange={setPassword}
        onUserIdChange={setUserId}
        password={password}
        username={username}
        onLoggedIn={setIsLoggedIn}
      />
  );
}

export default App;
