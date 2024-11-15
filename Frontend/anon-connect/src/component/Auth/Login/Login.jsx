import React, { useState, useEffect, useContext } from 'react';
import Registration from "../Registration/Registration";
import Profile from '../../Profile/Profile';
import { UserContext } from '../../../App';
import Home from '../../Home/Home';

function LoginForm() {
  const { user, authService, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openRegister, setOpenRegister] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [error, setError] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  useEffect(() => {
    if(isLoggedIn) {
      setShowProfile(true);
    }
  }, [isLoggedIn]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(username.length && password.length){
      authService.loginUser(username, password).then((isLoggedIn) => {
        console.log(isLoggedIn);
        if(authService.isLoggedIn){
          setErrorText('');
          setShowProfile(true);
        } else {
          setErrorText("Incorrect email or password.");
        }
      }).catch((err) => {
        console.error("error in logging in", err);
        setError(true);
      })
    }
  };
  const registerClicked = () => {
    setOpenRegister(!openRegister);
  };
  const handleRegistrationComplete = () => {
    setIsLoggedIn(true);
    setShowProfile(true);
  };

  if (showProfile) {
    return <Profile hostId={authService.accountId}/>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-light-blue">
      <form onSubmit={handleSubmit} className=" bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-transform transform hover:scale-105 hover:shadow-custom-dark duration-300 ease-in-out">
        <h2 className=" text-bright-blue text-3xl mb-6 font-semibold">Log in</h2>
        
        <div className="mb-4">
          <label className="block float-left text-dark text-md font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Enter your username"
          />
        </div>
        
        <div className="mb-6">
          <label className="block float-left text-dark text-md font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-dark mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Enter your password"
          />
        </div>
        
        <div className="flex items-center justify-center mb-4">
          <button
            type="submit"
            className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transform transition-transform hover:scale-105 duration-300 ease-in-out"
          >
            Log in
          </button>
        </div>
        {errorText.length ? <p style={{marginBottom: '20px'}} className="text-red-700">{errorText}</p> : <p></p>}
        {error ? <p style={{marginBottom: '20px'}} className="text-red-700">Login failed.</p> : <p></p>}
        <div className="text-center">
          <span className="text-dark">Don't have an account? </span>
          <span onClick={registerClicked} className="text-accent cursor-pointer hover:underline">
            Sign up
          </span>
        </div>
      </form>

      {/* Registration modal */}
      <Registration openRegister={openRegister} closeRegister={setOpenRegister} setLogin={handleRegistrationComplete} />
    </div>
  );
}

export default LoginForm;
