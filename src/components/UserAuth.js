import { useEffect, useState } from 'react'
import axios from 'axios'

const useUserAuth = (code) => {
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [expiresIn, setExpiresIn] = useState('')
  const [codeProcessed, setCodeProcessed] = useState(false)
 

  // LOGIN to generate initial accessToken and refreshToken
  useEffect(() => {
    if (!code || codeProcessed) return;

    const fetchData = async () => {
      try {
        const response = await axios.post('https://git.heroku.com/angus-spotify-clone.git/login', { code })
        // const response = await axios.post('http://localhost:3001/login', { code })
          console.log('login data:', response.data);
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
          setExpiresIn(response.data.expiresIn);
          window.history.replaceState({}, null, '/')
          setCodeProcessed(true);
          console.log('Access Token in User Auth:', response.data.accessToken);
          console.log('Refresh token in UserAuth', response.data.refreshToken);
          console.log('Expires In in User Auth:', response.data.expiresIn);
      } catch (error) {
      console.log('ERROR', error)
      // window.location = '/'
      }
    };

    fetchData();
  }, [code, codeProcessed]);
  

  // REFRESH to generate new accessToken when current expires
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
  
  
    const fetchRefreshedToken = async () => {
      try {
        const response = await axios.post('https://git.heroku.com/angus-spotify-clone.git/refresh', {
        // const response = await axios.post('http://localhost:3001/refresh', {
          refreshToken,
        });
        setAccessToken(response.data.accessToken);
        setExpiresIn(response.data.expiresIn);
      } catch {
        window.location = '/';
      }
    };
  
    const interval = setInterval(fetchRefreshedToken, (expiresIn - 60) * 1000);
  
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
  

  return { accessToken, refreshToken, expiresIn };
};

export default useUserAuth