import React from 'react'
import {
    AmbulanceIcon,
    BedIcon,
    FilterIcon,
    Map,
    SearchIcon,
} from "lucide-react";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { assets } from '../assets/assets';

const filterTags = [
    { label: "طوارئ 24/7", value: "emergency" },
    { label: "عناية مركزه", value: "icu" },
    { label: "حضانة أطفال", value: "nursery" },
    { label: "بنك دم", value: "blood-bank" },
];

export const Header = () => {
    return (
        <>
            <div className=' mx-auto px-4 md:px-6 lg:px-36 '>
                <div className='flex flex-col  items-center justify-center mt-10 lg:mt-[95px] gap-8 md:gap-18'>
                {/* Hero section */}
                <div className="Hero-section flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-0 [direction:rtl]">
                    <div className="font-Lemon text-Blue-900 text-3xl md:text-4xl lg:text-5xl order-1 ">
                        ابحث عن أقرب
                    </div>
                        <div className="font-Lemon rotate-0 md:rotate-[-8.69deg] relative text-Green-600 text-4xl md:text-5xl lg:text-[64px]  order-2">
                            <img src={assets.hospital_bg} className=' -z-50 absolute -top-15 left-3 rotate-10 hidden md:inline-block overflow-hidden'  />
                        مستشفى
                    </div>
                    <div className=" font-Lemon text-Blue text-3xl md:text-4xl lg:text-5xl  order-3 ">
                        ,بسرعة وسهولة
                    </div>
                </div>
                {/* Search & Filter Section */}
                    <div className="w-full flex flex-col items-center justify-center  gap-5  max-w-[848px]">
                    <div className="flex items-center gap-2 md:gap-4 w-full">
                        {/* Search Input */}
                        <div className="flex items-center justify-end gap-2 px-4  md:px-8 py-2 md:py-3 flex-1 rounded-3xl border border-solid border-Blue-900/40 ">
                            <Input
                                className="font-Cairo text-Blue-900 text-base  md:text-xl [direction:rtl] w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto  placeholder:text-gray-400"
                                placeholder=" بحث" 
                            />
                            <SearchIcon className="w-5 h-5 md:w-6 md:h-6 text-Blue" />
                        </div>

                        {/* Location Button */}
                        <Button
                            className="flex items-center p-2 md:p-3 md:w-[84px] md:h-[53px] justify-center bg-Blue hover:bg-Blue text-white rounded-3xl shadow-md transition-all ">
                            <Map className="w-5 h-5 md:w-6 md:h-6" />
                        </Button>
                    </div>
                    
                    {/* Filter */}
                    {/* Filter Tags */}
                    <div className="flex   gap-2 md:gap-3 w-full [direction:rtl]">
                            <Button className="inline-flex items-center justify-center md:w-[84px] md:h-[53px]  gap-1 px-6 lg:px-8 py-2  bg-Blue rounded-3xl shadow-[0px_0px_4px_#f0d5a880] hover:bg-Blue/90 transition-colors">
                            <FilterIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </Button>
                            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 w-full [direction:rtl]">

                        {filterTags.map((tag) => (
                            <Badge
                            key={tag.value}
                            className="inline-flex items-center justify-center gap-1 px-4 md:px-6 lg:px-8 py-2 h-auto bg-Blue-200 rounded-3xl overflow-hidden shadow-[0px_0px_4px_#f0d5a880] hover:bg-Blue-200/90 transition-colors cursor-pointer"
                            >
                                <div className="font-Cairo text-Blue-900 text-sm md:text-base lg:text-xl [direction:rtl] whitespace-nowrap">
                                    {tag.label}
                                </div>
                            </Badge>
                        ))}
                        </div>
                    </div>
                </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-16 w-full max-w-[848px]">
                        <Button className="flex w-[65%] md:w-[265px] h-[50px] bg-Green items-center justify-center gap-2 px-8 py-2 rounded-3xl shadow-[0px_0px_4px_#f0d5a880] hover:bg-Green/90 transition-colors">
                            <div className="font-Cairo text-Blue-50 text-lg md:text-xl [direction:rtl]">
                                أقرب طوارئ
                            </div>
                            <BedIcon className="w-5 h-5 text-Blue-50" />
                        </Button>
                        <Button className="flex w-[65%] md:w-[265px] h-[50px] bg-[#b3261e] items-center justify-center gap-2 px-8 py-2 rounded-3xl shadow-[0px_0px_4px_#f0d5a880] hover:bg-[#b3261e]/90 transition-colors">
                            <div className="font-Cairo text-Blue-50 text-lg md:text-xl [direction:rtl]">
                                اطلب الإسعاف
                            </div>
                            <AmbulanceIcon className="w-5 h-5 text-Blue-50" />
                        </Button>
                    </div>
                    {/* hospital image */}
                    <div className="flex justify-center items-center">
                        <img src={assets.hospital} alt="hospital" className='md:w-[628px] md:h-[430px] w-[314px] h-[216px] ' />
                    </div>
            </div>
            </div>
        </>
    )
}
