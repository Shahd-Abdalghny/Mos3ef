import {
    ActivityIcon,
    BabyIcon,
    DropletIcon,
    MapPinIcon,
    NavigationIcon,
    PhoneIcon,
    ScaleIcon,
    Share2Icon,
} from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel"
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ButtonTextAndIcon } from "./ButtonTextAndIcon";
import { RatingOfServices } from "./RatingOfServices";
import { HeartButton } from "./HeartButton";
import { Online } from "./Online";
import { ReviewCard } from "./ReviewCard";

const photoGallery = [
    {
        src: "https://c.animaapp.com/mi7g3z3l51WlVC/img/photo2.png",
        alt: "Photo 2",
    },
    {
        src: "https://c.animaapp.com/mi7g3z3l51WlVC/img/photo3.png",
        alt: "Photo 3",
    }
];

const amenities = [
    { icon: MapPinIcon, text: "تبعد 1.3 كم" },
    { icon: ActivityIcon, text: "عناية مركزة" },
    { icon: BabyIcon, text: "حضانة اطفال" },
    { icon: DropletIcon, text: "بنك دم" },
];
const detailsSections = [
    {
        title: "الوصف:",
        content:
            "مستشفى حكومي كبير يتبع الهيئة العامة للتأمين الصحي، يوفر خدمات متكاملة في معظم التخصصات، مع التركيز على الخدمات الحرجة مثل غسيل الكلى والعناية المركزة.",
    },
    {
        title: "التخصصات الرئيسية",
        content:
            "الباطنة، الجراحة العامة، العظام، أمراض الكلى والمسالك البولية، القلب والأوعية الدموية.",
    },
    {
        title: "خدمات إضافية",
        content:
            "قسم أشعة متكامل (رنين مغناطيسي، مقطعية)، معمل تحاليل مركزي، صيدلية 24 ساعة.",
    },
];

const stars = Array(5).fill(
    "https://c.animaapp.com/mi7g3z3l51WlVC/img/star-filled.svg",
);

export const ServiceCard = () => {
    return (
        <>
            <div className="flex flex-col w-full items-center gap-6 px-1 py-2 bg-white rounded-[20px] border border-Blue-900 my-11">
                <Card className="flex flex-col w-full p-0 items-center gap-4 shadow-none border-0 ">
                    <CardContent className="w-full p-0">
                        <div className="relative w-full h-[428px] rounded-2xl overflow-hidden shadow-[0px_4px_4px_#7cc1e9]  bg-cover bg-center">
                            <img
                                src="https://c.animaapp.com/mi7g3z3l51WlVC/img/image-1.png"
                                alt=""
                                className="w-full h-full object-cover" />
                            <div className="absolute top-[-51px] left-0 w-full h-[479px] bg-[linear-gradient(180deg,rgba(217,217,217,0)_0%,rgba(84,172,225,1)_100%)]" />
                            <div className="inline-flex items-center justify-end gap-4 absolute top-[312px] left-[25px]">
                                <div className="relative w-[99.83px] h-[97.83px]">
                                    <img
                                        className="absolute  hidden lg:inline-block top-0 -left-1 w-[106px] h-[106px] rounded-xl object-cover"
                                        alt="More"
                                        src="https://c.animaapp.com/mi7g3z3l51WlVC/img/more.png"
                                    />
                                    <div className="absolute  hidden lg:inline-block top-[25px] left-[19px] w-[46px] font-Cairo font-bold text-[#e9f5fb] text-2xl text-right tracking-[0] leading-[normal]">
                                        +14
                                    </div>
                                </div>

                                {photoGallery.map((photo, index) => (
                                    <img
                                        key={index}
                                        className="relative w-[105px] h-[106px] hidden lg:inline-block rounded-xl object-cover"
                                        alt={photo.alt}
                                        src={photo.src}
                                    />
                                ))}
                            </div>
                            <Online isOnline={true} />
                            <HeartButton />
                            <div className="flex flex-col w-[531px] items-end gap-1 absolute top-[201px] right-[18px]">
                                <div className="inline-flex items-center justify-center gap-4">
                                    <div className="w-fit text-[#152211] text-sm md:text-xl font-Cairo font-bold tracking-[0] leading-[normal] [direction:rtl]">
                                        تخصصات باطنة وجراحة
                                    </div>
                                    <div className="w-[5px] h-[37px] font-Cairo font-bold text-[#e9f5fb] text-xl text-right tracking-[0] leading-[normal]">
                                        |
                                    </div>
                                    <div className="inline-flex items-center justify-center gap-1 ">
                                        <div className="inline-flex flex-col items-center gap-1">
                                            <RatingOfServices rating={"4.5"} />
                                            <div className="w-fit font-Cairo font-normal text-Blue-900 text-xs tracking-[0] leading-[normal] [direction:rtl]">
                                                بناء على 4500 مراجعة
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="self-stretch h-[77px] font-Cairo font-bold  text-Blue-900 text-xl md:text-[32px] tracking-[0] leading-[normal] [direction:rtl]">
                                    مستشفى مدينة نصر للتأمين الصحي
                                </h1>
                                <div className="inline-flex items-center justify-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="px-4 py-1 h-auto rounded-3xl" >
                                        <Share2Icon className="w-6 h-6" />
                                    </Button>
                                    <ButtonTextAndIcon text={"اضف للمقارنة"} icon={<ScaleIcon className="w-6 h-6" />} />
                                    <ButtonTextAndIcon text={" أتصل بالمستشف"} icon={<PhoneIcon className="w-6 h-6" />} />
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full flex-wrap  px-2 items-center justify-between mt-4">
                            <div className="flex  items-center justify-end gap-4">
                                {amenities.map((amenity, index) => (
                                    <div
                                        key={index}
                                        className="inline-flex items-center justify-center gap-1"
                                    >
                                        <div className="w-fit -mt-px font-Cairo font-normal  text-Blue-900 text-base tracking-[0] leading-[normal] [direction:rtl]">
                                            {amenity.text}
                                        </div>
                                        <amenity.icon className="w-6 h-6" />
                                    </div>
                                ))}
                            </div>
                            <div className=" -mt-px font-Cairo font-normal text-black text-base tracking-[0] leading-[normal] [direction:rtl] not-italic">
                                <span className="font-bold">العنوان</span>
                                <span className="font-Cairo font-normal text-black text-base tracking-[0]">
                                    : 23 ش يوسف عباس, متفرع من ش الطيران, مدينة نصر, القاهرة.
                                </span>
                            </div>

                        </div>
                    </CardContent>
                </Card>
                <hr className="text-gray-600 my-1 w-[90%]" />
                <div className="flex justify-around items-center flex-wrap gap-4 w-full  overflow-hidden">
                    <div className="flex flex-col items-center gap-[23px]">
                        <div className="flex gap-4 items-center [direction:rtl]">
                            <div className=" font-Cairo font-semibold text-black text-[15px] tracking-[0] leading-[normal] [direction:rtl]">
                                سعر التذكره:
                            </div>
                            <div className="flex flex-col w-[300px] md:w-[463px] items-end gap-4">
                                <Card
                                    className="inline-flex items-center justify-center gap-3 p-3 bg-[#e9f5fb] rounded-[22px] border-0 shadow-none w-full" >
                                    <CardContent className="p-0 flex items-center gap-3">
                                        <div className="w-fit font-Cairo font-semibold text-black text-[15px] tracking-[0] leading-[normal] [direction:rtl]">
                                            ٥٠/ ١٥٠
                                        </div>
                                        <div className="w-fit -mt-px font-Cairo font-bold text-[#294521] text-[28px] tracking-[0] leading-[normal] whitespace-nowrap [direction:rtl]">
                                            جنيها
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center [direction:rtl]">
                            <div className=" font-Cairo font-semibold text-black text-[15px] tracking-[0] leading-[normal] [direction:rtl]">
                                سعر التذكره:
                            </div>
                            <div className="flex flex-col w-[300px] md:w-[463px] items-end gap-4">
                                <Card
                                    className="inline-flex items-center justify-center gap-3 p-3 bg-[#e9f5fb] rounded-[22px] border-0 shadow-none w-full" >
                                    <CardContent className="p-0 flex items-center gap-3">
                                        <div className="w-fit font-Cairo font-semibold text-black text-[15px] tracking-[0] leading-[normal] [direction:rtl]">
                                            ٥٠/ ١٥٠
                                        </div>
                                        <div className="w-fit -mt-px font-Cairo font-bold text-[#294521] text-[28px] tracking-[0] leading-[normal] whitespace-nowrap [direction:rtl]">
                                            جنيها
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center [direction:rtl]">
                            <div className=" font-Cairo font-semibold text-black text-[15px] tracking-[0] leading-[normal] [direction:rtl]">
                                سعر التذكره:
                            </div>
                            <div className="flex flex-col w-[300px] md:w-[463px] items-end gap-4">
                                <Card
                                    className="inline-flex items-center justify-center gap-3 p-3 bg-[#e9f5fb] rounded-[22px] border-0 shadow-none w-full" >
                                    <CardContent className="p-0 flex items-center gap-3">
                                        <div className="w-fit font-Cairo font-semibold text-black text-[15px] tracking-[0] leading-[normal] [direction:rtl]">
                                            ٥٠/ ١٥٠
                                        </div>
                                        <div className="w-fit -mt-px font-Cairo font-bold text-[#294521] text-[28px] tracking-[0] leading-[normal] whitespace-nowrap [direction:rtl]">
                                            جنيها
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="w-[359px] h-[255px]  ">
                        <div className=" w-full  h-[252px]  bg-[#e9f5fb] rounded-[40px] overflow-hidden border-2 border-solid border-[#071e2c]">
                            <img
                                className="w-[359px] h-[252px]"
                                alt="Image"
                                src="https://c.animaapp.com/mi7g3z3l51WlVC/img/image-2.png"
                            />
                        </div>
                    </div>
                </div>

                <hr className="text-gray-600 my-1 w-[90%]" />


                <div className=" w-full px-3 flex flex-col  gap-6">
                    <h2 className="font-Cairo font-bold text-black text-xl tracking-[0] leading-[normal] [direction:rtl]">
                        التفاصيل:
                    </h2>

                    <div className="flex flex-col w-full gap-[11px]">
                        {detailsSections.map((section, index) => (
                            <div
                                key={index}
                                className="flex justify-end  gap-5 w-full px-4"
                            >
                                <div className="w-[577px] items-start font-Cairo font-semibold text-black text-base tracking-[0] leading-[normal] [direction:rtl]">
                                    {section.content}
                                </div>
                                <div className="w-[147px] items-start  text-black text-base font-Cairo font-bold tracking-[0] leading-[normal] [direction:rtl]">
                                    {section.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className="text-gray-600 my-1 w-[90%]" />


                <h2 className="self-stretch font-Cairo font-bold text-black text-xl text-center tracking-[0] leading-[normal] [direction:rtl]">
                    التقييمات والمراجعات
                </h2>
                <div className="w-[98%] flex items-center justify-around px-10  ">   
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl"
                >
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                    <ReviewCard name={`مستخدم ${index + 1}`} describe={"جميل جدا "}/>
                    
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                </div>
                <div className="flex flex-col w-[350px] md:w-[447px] items-center gap-[9px]">
                    <div className="w-fit  font-Cairo font-semibold text-black text-base tracking-[0] leading-[normal] [direction:rtl]">
                        تحدث عن تجربتك
                    </div>

                    <div className="flex flex-col w-32  gap-1 p-1">
                        <div className="flex h-6 items-center w-full">
                            {stars.map((star, index) => (
                                <img
                                    key={index}
                                    className="w-6 h-6"
                                    alt="Star filled"
                                    src={star}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <div className="relative   h-[172px] bg-white rounded-[20px_20px_0px_20px] overflow-hidden border border-solid border-[#cccccc]">
                            <Textarea
                                placeholder="أضف مراجعتك"
                                className="absolute top-2.5 right-[19px] w-[92%]  h-[150px]   border-0 resize-none font-Cairo font-normal text-[#1a1a1a] text-base [direction:rtl] focus-visible:ring-0"
                            />
                        </div>

                        <div className="flex items-center justify-center w-fit font-Cairo font-normal text-[#b3b3b3] text-xs text-left  [direction:rtl]">
                            سوف تظهر مراجعتك لزوار مسعف
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
