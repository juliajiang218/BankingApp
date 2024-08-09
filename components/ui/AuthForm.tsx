'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { login, signUp } from '@/lib/actions/user.actions';
import Login from '@/app/(auth)/login/page';



const AuthForm = ({type}:{type: string}) => {
    const router = useRouter(); 
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    

    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password:''
        },
    })
 
    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // This will be type-safe and validated.
        setIsLoading(true);
        try {
            //sign up with Appwrite and create plaid token
            if(type === 'sign-up'){
                // const userData = {
                //     firstName: data.firstName!,
                //     lastName: data.lastName!,
                //     address1: data.address1!,
                //     city: data.city!,
                //     state: data.state!,
                //     postalCode: data.postalCode!,
                //     dateOfBirth: data.dob!,
                //     ssn: data.ssn!,
                //     email: data.email,
                //     password: data.password
                //   }
        
                const newUser = await signUp(data);
                
                setUser(newUser);
            }
            if (type === 'login'){
                const response = await login({
                    email: data.email,
                    password: data.password
                });
                if (response){
                    router.push('/')
                }

            }
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }

    }
  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>  
            {/* logo */}
            <Link href="/" className='flex cursor-pointer items-center gap-1'>
                <Image
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt='banking logo'
                />
                <h1 className='text-26 font-sawarabi-gothic text-black-1 font-semibold'>Banking</h1>
            </Link>

            {/* login/signup instruction */}
            <div className='flex flex-col gap-1 md:gap-2'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                 {user
                    ? "Link Account"
                    : type === "login"
                        ? "Login"
                        : "Sign Up"
                }
                <p className='text-16 font-normal text-gray-600 gap-1'>
                    {user
                    ?"Link your account to get started."
                    : "Please enter your user information."
                    }
                </p>
                </h1>
            </div>
        </header>
        {user?(
            <div className='flex flex-col gap-4'>
                {/* plaidlink */}
            </div>
        ):(
            <>
                {/* sign-up/login forms */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">                  
                        {type === 'sign-up' &&(
                            <>
                                <div className='flex gap-4'>
                                    <CustomInput                    
                                        control={form.control}
                                        name="firstName"
                                        label="First Name" 
                                        placeholder="ex:Anna"
                                    />
                                    <CustomInput 
                                    control={form.control}
                                    name="lastName"
                                    label="Last Name" 
                                    placeholder="ex:Zhang"
                                    />
                                </div>
                                                               
                                <CustomInput 
                                    control={form.control}
                                    name="address1"
                                    label="Address" 
                                    placeholder="Enter your specific address"
                                />
                                <div className='flex gap-4'>
                                    <CustomInput 
                                        control={form.control}
                                        name="city"
                                        label="City" 
                                        placeholder="Enter your city"
                                    />

                                    <CustomInput 
                                        control={form.control}
                                        name="state"
                                        label="State" 
                                        placeholder="ex:NY"
                                    />
                                    
                                </div>
                                
                                <div className='flex gap-4'>
                                    <CustomInput 
                                        control={form.control}
                                        name="phoneNumber"
                                        label="Phone Number" 
                                        placeholder="ex:1234567"
                                    />
                                    <CustomInput 
                                        control={form.control}
                                        name="postalCode"
                                        label="Postal Code" 
                                        placeholder="ex:11011"
                                    />
                                </div>
                                
                                <div className='flex gap-4'>
                                    <CustomInput 
                                        control={form.control}
                                        name="dob"
                                        label="Date of Birth" 
                                        placeholder="YYYY-MM-DD"
                                    />
                                    <CustomInput 
                                        control={form.control}
                                        name="ssn"
                                        label="SSN" 
                                        placeholder="ssn number"
                                    />
                                </div>                           
                            </>
                        )}
                        <CustomInput 
                            control={form.control}
                            name="email"
                            label="Email" 
                            placeholder="Enter your email"
                        />

                        <CustomInput 
                            control={form.control}
                            name="password"
                            label="Password" 
                            placeholder="Ener your password"
                        />

                        <div className='flex flex-col gap-4'>
                            <Button type="submit" className='form-btn' disabled={isLoading}>
                                {isLoading?(
                                    <>
                                        <Loader2 size={20}
                                        className='animate-spin' /> &nbsp;
                                        Loading...
                                    </>
                                ): type === "login"
                                ? 'Login':'Sign Up'}
                            </Button>      
                        </div>                
                    </form>
                </Form>
                
                {/* footer */}
                
                <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>{type ==='login'
                            ? "Don't have an account yet?"
                            : "Already have an account?"
                        }
                        </p>
                        <Link href={type==='login'? '/sign-up':'/login'} className='form-link'>
                            {type==='login'? 'Sign Up':'Login'}
                        </Link>
                </footer>    
                
                
            </>
        )}
    </section>
  )
}

export default AuthForm
