import AuthForm from '@/components/ui/AuthForm'
import React from 'react'

const Login = () => {
  return (
    // mobile version
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm
        type="login"
      />
    </section>
  )
}

export default Login
