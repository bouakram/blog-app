"use client"

import React from 'react'
import {SessionProvider} from 'next-auth/react'

function AuthProVider({children}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthProVider