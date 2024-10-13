import { useEffect, useState } from 'react';

const useCheckLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null indicates loading state

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('access'); // Adjust key based on your token key

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/accounts/profile/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json' // Include Content-Type header if needed
          }
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
        } else if (response.status === 401) {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []); // Run once on mount

  return isLoggedIn; // Return the login status
};

export default useCheckLogin;
