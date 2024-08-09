'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
  
import React from 'react'
import Footer from "./Footer"

const MobileNav = ({user}:MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
        <Sheet>
            <SheetTrigger>
                <Image
                    src="/icons/hamburger.svg" 
                    width={30} 
                    height={30}
                    alt="menu bar"
                    className="cursor-pointer"
                />
            </SheetTrigger>
                <SheetContent side="top" className="border-none bg-black-1">
                    <SheetHeader>
                    {/* logo */}
                    <Link href="/" className='flex cursor-pointer items-center gap-1 px-4'>
                        <Image 
                            src="/icons/logo.svg"
                            width={34}
                            height={34}
                            alt='banking logo'
                        />
                        <h1 className='text-26 font-sawarabi-gothic text-white font-bold'>Banking</h1>
                    </Link>
                    {/* menu icons */}
                    <div className="mobilenav-sheet">
                        <SheetClose asChild> 
                            <nav className="h-full flex flex-col gap-6 pt-16 text-white">
                                {sidebarLinks.map((item) =>{ 
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link href={item.route} key={item.label} 
                                                className={cn('mobilenav-sheet_close w-full',
                                                    {
                                                        'bg-bankGradient':isActive
                                                    }
                                                    )}>
                                                
                                                <Image 
                                                        src={item.imgURL}
                                                        alt={item.label}
                                                        width={20}
                                                        height={20}
                                                        className={cn({'brightness-[3] invert-0':isActive})}
                                                />
                                                                                              
                                                <p className='text-16 font-semibold !text-white'>
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                                USER
                            </nav>                         
                        </SheetClose>
                        <Footer user={user} type="mobile"/>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav
