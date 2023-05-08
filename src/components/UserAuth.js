import { useEffect, useState } from 'react'
import axios from 'axios'

const UserAuth = (code) => {
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [expiresIn, setExpiresIn] = useState('')

  useEffect(() => {
    axios.post('http://localhost:3001/login', {
      code,
    }).then(response => {
      console.log(response.data)
      window.history.pushState({}, null, '/')
    }).catch(() => {
      window.location = '/'
    })
  }, [code])
}

export default UserAuth