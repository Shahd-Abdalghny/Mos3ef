import React from "react";
import { ChartLine,  MoreVerticalIcon, PhoneOutgoing } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { HeaderOfService } from "./HeaderOfService";
import { IconButton } from "./IconButton";
import { ButtonTextAndIcon } from "./ButtonTextAndIcon";

export const HospitalCard = () => {
    const hospitalInfo = {
        name: "مستشفى مدينة نصر للتأمين الصحي",
        rating: "4.5",
        distance: "تبعد 1.3 كم",
        hasICU: "توفر عناية مركزة",
        imageUrl: "https://c.animaapp.com/mhrj9xk8kZXmaA/img/image-1.png",
        isOnline: true,
    };

    const features = [
        {
            icon: "https://c.animaapp.com/mhrj9xk8kZXmaA/img/vuesax-bold-health.svg",
            text: hospitalInfo.hasICU,
        },
        {
            icon: "https://c.animaapp.com/mhrj9xk8kZXmaA/img/vuesax-bold-location-add.svg",
            text: hospitalInfo.distance,
        },
    ];
    return (
        <Card
            className="inline-flex flex-col items-center justify-center gap-4 pt-2 pb-3 px-2 bg-white rounded-[20px]  shadow-[0_0_2px_0_rgba(0,0,0,0.95)]"
            data-model-id="4:98">
            <CardContent className="p-0 w-full space-y-4">
                <HeaderOfService image={hospitalInfo.imageUrl} name={hospitalInfo.name} rating={hospitalInfo.rating} isOnline={hospitalInfo.isOnline} />
                <div className="flex justify-end gap-4 px-2 w-full items-center">
                    {features.map((feature, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className="inline-flex justify-center gap-1 items-center border-0 bg-transparent shadow-none">
                            <span className="w-fit -mt-px font-Cairo font-normal text-Blue-900 text-[10px] tracking-[0] leading-[normal] [direction:rtl]">
                                {feature.text}
                            </span>
                            <img className="w-4 h-4" alt="" src={feature.icon} />
                        </Badge>
                    ))}
                </div>
                <footer className="inline-flex items-center justify-center gap-2 w-full">
                    <ButtonTextAndIcon text={"اضف للمقارنة"} icon={<ChartLine className="w-5 h-5" />} />
                    <IconButton IconName={<PhoneOutgoing className="w-5 h-5" />} label="Call hospital" />
                    <IconButton IconName={<MoreVerticalIcon className="w-5 h-5 text-white" />} label="More options" />
                </footer>
            </CardContent>
        </Card>
    );
}
