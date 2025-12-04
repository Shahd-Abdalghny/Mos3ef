/** @format */

import React from "react";
import { ChartLine, MoreVerticalIcon, PhoneOutgoing } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { HeaderOfService } from "./HeaderOfService";
import { IconButton } from "./IconButton";
import { ButtonTextAndIcon } from "./ButtonTextAndIcon";
import { MapPinPlusInside } from "lucide-react";

export const HospitalCard = ({ item }) => {
 
  return (
    <Card
      className="inline-flex flex-col items-center justify-center gap-4 pt-2 pb-3 px-2 bg-white rounded-[20px]  shadow-[0_0_2px_0_rgba(0,0,0,0.95)]"
      data-model-id="4:98"
    >
      <CardContent className="p-0 w-full space-y-4">
        <HeaderOfService
          image="https://c.animaapp.com/mhrj9xk8kZXmaA/img/image-1.png"
          name={item.hospitalName}
          rating="5.0"
          isOnline={item.availability == "available" ? true : false}
        />
        <div className="flex justify-end gap-4 px-2 w-full items-center">
          <Badge
            variant="outline"
            className="inline-flex justify-center gap-1 items-center border-0 bg-transparent shadow-none"
          >
            <span className="w-fit -mt-px font-Cairo font-normal text-Blue-900 text-[10px] tracking-[0] leading-[normal] [direction:rtl]">
              سعر الكشف {item.price} ج.م
            </span>
          </Badge>
          <Badge
            variant="outline"
            className="inline-flex justify-center gap-1 items-center border-0 bg-transparent shadow-none"
          >
            <span className="w-fit -mt-px font-Cairo font-normal text-Blue-900 text-[10px] tracking-[0] leading-[normal] [direction:rtl]">
              تبعد {item.distanceKm?.toFixed(2)} كم
            </span>
            <MapPinPlusInside />
          </Badge>

          <Badge
            variant="outline"
            className="inline-flex bg-Blue-200   justify-center gap-1 items-center border-0 rounded-3xl shadow-none"
          >
            <span className="w-fit -mt-px font-Cairo font-normal text-Blue-900 text-sm tracking-[0] leading-[normal] [direction:rtl]">
              {item.name}
            </span>
          </Badge>
        </div>
        <footer className="inline-flex items-center justify-center gap-2 w-full">
          <ButtonTextAndIcon
            text={"اضف للمقارنة"}
            icon={<ChartLine className="w-5 h-5" />}
          />
          <IconButton
            IconName={<PhoneOutgoing className="w-5 h-5" />}
            label="Call hospital"
          />
          <IconButton
            IconName={<MoreVerticalIcon className="w-5 h-5 text-white" />}
            label="More options"
          />
        </footer>
      </CardContent>
    </Card>
  );
};
