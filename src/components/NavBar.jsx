import React, { useState } from 'react'
import { assets } from '../assets/assets'
import {
    MenuIcon,
    XIcon,
} from "lucide-react";

const navItems = [
    { label: "من نحن", href: "#about" },
    { label: "خدماتنا", href: "#services" },
    { label: "الرئيسية", href: "#home", active: true },
];
export const NavBar = () => {
    const [showMobileMenue, setShowMobileMenue] = useState(false);
    return (
        <>
            <div className="fixed top-0 left-0 w-full z-20  shadow-[inset_0px_0px_22px_#f2f2f280] backdrop-blur-[10px]">
                <div className='flex mx-auto justify-between items-center px-4 md:px-8 lg:px-[156px] py-3 '>
                    <div className="flex items-center gap-2">
                        <img
                            className="w-8 h-8 md:w-[46px] md:h-11"
                            alt="Logo"
                            src={assets.logo}
                        />
                        <div className="font-Lateef text-Blue-900 text-lg md:text-3xl font-bold">
                            مسعف
                        </div>
                    </div>
                    <ul className="hidden md:flex items-center justify-center gap-6 px-12 py-3 bg-Blue-900 rounded-[84px]">
                        {
                            navItems.map((item, index) => {
                                return (
                                    <li key={index} className={`inline-flex items-center justify-center gap-1 px-6 py-2 h-auto rounded-3xl overflow-hidden ${item.active ? "bg-Blue" : "bg-Blue-900"} shadow-[0px_0px_4px_#f0d5a880] hover:bg-Blue transition-colors`}><a href={item.href} className='cursor-pointer font-Cairo text-Blue-50'>{item.label}</a></li>
                                )
                            })
                        }
                    </ul>
                    <div className="hidden md:flex items-center gap-2">
                        <div
                            className="inline-flex items-center justify-center gap-1 p-2 h-auto rounded-3xl border border-solid border-Blue-900 bg-transparent hover:bg-Blue-900/10 transition-colors">
                            <div className="font-Cairo text-Blue-900 text-xl">
                                دخول
                            </div>
                        </div>
                        <div className=" text-[#5a9648] text-xl">
                            |
                        </div>
                        <div
                            className="inline-flex items-center justify-center gap-1 p-2 h-auto rounded-3xl border border-solid border-Blue-900 bg-transparent hover:bg-Blue-900/10 transition-colors"
                        >
                            <div className="font-Cairo text-Blue-900 text-xl">
                                تسجيل
                            </div>
                        </div>
                    </div>
                    <MenuIcon className={`md:hidden w-7 cursor-pointer`} onClick={() => setShowMobileMenue(true)} />
                </div>
                {/* ----------mobile-menu--------- */}
                <div className={`${showMobileMenue ? 'fixed w-full' : 'h-0 w-0'}  md:hidden right-0 top-0 bottom-0 overflow-hidden transition-all bg-Blue-900`}>
                    <div className='flex justify-end p-6 cursor-pointer'>
                        <XIcon className='w-6 text-Blue-50' onClick={() => setShowMobileMenue(false)} />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        {
                            navItems.map((item, index) => {
                                return (
                                    <li key={index}><a href={item.href} className='px-4 py-2 rounnded-full inline-block text-Blue-50' onClick={() => setShowMobileMenue(false)}>{item.label}</a></li>
                                )
                            })
                        }
                    </ul>
                    <div className="flex items-center gap-2 justify-center mt-8">
                        <div className="font-Cairo text-Blue-50 text-xl">
                            دخول
                        </div>
                        <div className=" text-Green text-xl">
                            |
                        </div>
                        <div className="font-Cairo text-Blue-50 text-xl">
                            تسجيل
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
