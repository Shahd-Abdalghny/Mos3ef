/** @format */

import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Pen, Trash2, Plus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useHospital } from "../hooks/useHospital";
import ServiceModal from "./ServiceModal";

export const MainSectionAtDashBoard = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const {
    addHospitalService,
    updateHospitalService,
    deleteHospitalService,
    getAllServices,
    alertMsg,
    alertType,
    setAlertMsg,
  } = useHospital();

  const { user } = useAuth();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const availableServices = await getAllServices();
      if (availableServices && Array.isArray(availableServices)) {
        const formattedServices = availableServices.map((service) => {
          const categoryId = Number(service.category) || 1;
          const priceValue =
            typeof service.price === "number"
              ? service.price
              : Number(service.price) || 0;

          return {
            id: service.id,
            name: service.name || "خدمة غير معروفة",
            price: `${priceValue} جنيه`,
            category: getCategoryName(categoryId),
            categoryColor: getCategoryColor(categoryId),
            status:
              (service.availability || "متاح") === "متاح" ? "متاح" : "غير متاح",
            statusColor:
              (service.availability || "متاح") === "متاح"
                ? "bg-green-100 text-[#3e6732]"
                : "bg-[#ffe2e2] text-[#c10007]",
            icon: getIconByCategory(categoryId),
            description: service.description,
            availability: service.availability || "متاح",
            workingHours: service.working_Hours || "24 ساعة",
            categoryId: categoryId,
          };
        });
        setServices(formattedServices);
      }
    } catch (err) {
      console.log("Error fetching services:", err);
    }
  };

  const getCategoryName = (categoryId) => {
    const categories = {
      1: "طوارئ",
      2: "عناية مركزة",
      3: "حضانة أطفال",
      4: "بنك دم",
    };
    return categories[categoryId] || "طوارئ";
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      1: "bg-[#ffe2e2] text-[#c10007]",
      2: "bg-[#ffedd4] text-[#c93400]",
      3: "bg-blue-100 text-[#1347e5]",
      4: "bg-purple-100 text-[#8200da]",
    };
    return colors[categoryId] || colors[1];
  };

  const getIconByCategory = (categoryId) => {
    const iconMap = {
      1: "https://c.animaapp.com/miks4oe9SWsilu/img/container.svg",
      2: "https://c.animaapp.com/miks4oe9SWsilu/img/container-6.svg",
      3: "https://c.animaapp.com/miks4oe9SWsilu/img/container-4.svg",
      4: "https://c.animaapp.com/miks4oe9SWsilu/img/container-2.svg",
    };
    return iconMap[categoryId] || iconMap[1];
  };

  const handleAddService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleEditService = (service) => {
    const rawPrice =
      typeof service.price === "string"
        ? service.price.replace(" جنيه", "").trim()
        : String(service.price || "");

    setEditingService({
      ...service,
      price: rawPrice,
      categoryId: service.categoryId || 1,
      availability: service.availability || "متاح",
      workingHours: service.workingHours || "24 ساعة",
    });
    setShowModal(true);
  };

  const handleDeleteService = async (serviceId) => {
     console.log("🗑️ handleDeleteService called with ID:", serviceId);

     if (!serviceId) {
       console.error("❌ Cannot delete: serviceId is undefined");
       alert("لا يمكن حذف الخدمة: المعرف غير صالح");
       return;
     }

     if (!window.confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
       return;
     }

    try {
      console.log("🗑️ Attempting to delete service ID:", serviceId);

      await deleteHospitalService(serviceId);
      console.log("✅ Delete successful, updating UI...");

      setServices((prev) => {
        const newServices = prev.filter((service) => service.id !== serviceId);
        console.log("✅ Services after delete:", newServices.length);
        return newServices;
      });

      console.log("✅ Service deleted successfully");
    } catch (error) {
      console.error("❌ Error in handleDeleteService:", error);
      // الخطأ تم معالجته في context
    }
  };

  const handleSaveService = async (serviceData) => {
     console.log("📝 handleSaveService called:");
     console.log("📝 Editing service exists:", !!editingService);
     console.log("📝 Service data to save:", serviceData);
      if (!serviceData.name || !serviceData.name.trim()) {
        alert("الرجاء إدخال اسم الخدمة");
        return;
      }

      const price = parseInt(serviceData.price, 10);
      if (!price || price <= 0) {
        alert("الرجاء إدخال سعر صحيح أكبر من صفر");
        return;
      }
    try {
      const apiData = {
        name: serviceData.name,
        description: serviceData.description || "خدمة طبية متاحة داخل المستشفى",
        price: parseInt(serviceData.price, 10) || 0,
        availability: serviceData.availability || "متاح",
        working_Hours: serviceData.workingHours || "24 ساعة",
        category: serviceData.categoryId || 1,
      };
    console.log("📝 API Data to send:", apiData);

      if (editingService && editingService.id) {
        console.log("📝 Updating service ID:", editingService.id);
        const savedService = await updateHospitalService(
          editingService.id,
          apiData
        );
        console.log("✅ Service updated successfully:", savedService);

        // إعادة جلب جميع الخدمات للتأكد من المزامنة
        await fetchServices();
        setAlertMsg("تم تحديث الخدمة بنجاح");
      } else {
        console.log("📝 Adding new service");
        const savedService = await addHospitalService(apiData);
        console.log("✅ Service added successfully:", savedService);

        // إعادة جلب جميع الخدمات
        await fetchServices();
        setAlertMsg("تم إضافة الخدمة بنجاح");
      }
    

      setShowModal(false);
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const unavailableCount = services.filter(
    (s) => s.status === "غير متاح"
  ).length;
  const availableCount = services.filter((s) => s.status === "متاح").length;
  const totalCount = services.length;

  return (
    <section className="flex flex-col flex-1 min-w-0">
      {alertMsg && (
        <div
          className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg text-white z-50 
            ${alertType === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          <span>{alertMsg}</span>
          <button onClick={() => setAlertMsg(null)} className="ml-3 font-bold">
            ×
          </button>
        </div>
      )}

      <header className="flex items-center justify-between gap-4 px-8 py-6 bg-white w-full min-h-20">
        <h1 className="font-Cairo font-normal text-Blue-900 text-xl [direction:rtl]">
          {user?.name}
        </h1>

        <Button
          onClick={handleAddService}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة خدمة جديدة
        </Button>
      </header>

      <div className="flex flex-col flex-1 w-full max-w-[863.2px] mx-auto gap-8 px-2 py-3 md:p-8 overflow-x-hidden">
        <Card className="w-full bg-white rounded-[14px] border-[0.8px] border-[#f2f4f6] shadow-[0px_1px_2px_-1px_#0000001a,0px_1px_3px_#0000001a] animate-fade-in [--animation-delay:400ms]">
          <CardContent className="p-0">
            <div className="flex items-center justify-end gap-4 px-6 py-6 border-b-[0.8px] border-[#f2f4f6]">
              <div className="flex flex-col items-end justify-center gap-1">
                <h2 className="font-Cairo font-normal text-[#1d2838] text-base leading-7 [direction:rtl]">
                  إدارة الخدمات الطبية
                </h2>
                <p className="font-Cairo font-normal text-[#697282] text-base leading-5 [direction:rtl]">
                  إضافة، تعديل وحذف الخدمات الطبية المتاحة
                </p>
              </div>
            </div>

            <div className="w-full">
              {services.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    لا توجد خدمات مضافة بعد
                  </p>
                  <Button
                    onClick={handleAddService}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Plus className="ml-2 h-4 w-4" />
                    أضف أول خدمة
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow className="border-b-[0.8px] border-[#f2f4f6] hover:bg-transparent">
                      <TableHead className="w-[120px] font-Cairo font-bold text-[#495565] text-sm leading-5 text-center [direction:rtl]">
                        الإجراءات
                      </TableHead>
                      <TableHead className="w-[100px] font-Cairo font-bold text-[#495565] text-sm leading-5 text-center [direction:rtl]">
                        الحالة
                      </TableHead>
                      <TableHead className="w-[120px] font-Cairo font-bold text-[#495565] text-sm leading-5 text-center [direction:rtl]">
                        السعر
                      </TableHead>
                      <TableHead className="w-[120px] font-Cairo font-bold text-[#495565] text-sm leading-5 text-center [direction:rtl]">
                        الفئة
                      </TableHead>
                      <TableHead className="font-Cairo font-bold text-[#495565] text-sm leading-5 text-right [direction:rtl]">
                        اسم الخدمة
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {services.map((service) => (
                      <TableRow
                        key={service.id}
                        className="border-b-[0.8px] border-[#f2f4f6] hover:bg-gray-50"
                      >
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditService(service)}
                              className="text-blue-600 hover:text-blue-800 border-blue-200 hover:bg-blue-50"
                              title="تعديل"
                            >
                              <Pen className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteService(service.id)}
                              className="text-red-600 hover:text-red-800 border-red-200 hover:bg-red-50"
                              title="حذف"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          <Badge
                            className={`${service.statusColor} border-[0.8px] border-transparent rounded-lg px-2 py-0.5 h-auto`}
                          >
                            <span className="font-Cairo font-normal text-xs leading-4 [direction:rtl]">
                              {service.status}
                            </span>
                          </Badge>
                        </TableCell>

                        <TableCell className="text-center">
                          <p className="font-Cairo font-normal text-[#1d2838] text-base leading-6 [direction:rtl]">
                            {service.price}
                          </p>
                        </TableCell>

                        <TableCell className="text-center">
                          <Badge
                            className={`${service.categoryColor} rounded-lg px-2 py-0.5 h-auto`}
                          >
                            <span className="font-Cairo font-normal text-xs leading-4 text-center [direction:rtl]">
                              {service.category}
                            </span>
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-4">
                            <div className="text-right">
                              <p className="font-Cairo font-normal text-[#1d2838] text-base leading-6 [direction:rtl]">
                                {service.name}
                              </p>
                              {service.description && (
                                <p className="font-Cairo font-normal text-[#697282] text-sm leading-5 mt-1 [direction:rtl]">
                                  {service.description}
                                </p>
                              )}
                            </div>
                            <img
                              className="w-9 h-9 rounded-lg"
                              alt={service.name}
                              src={service.icon}
                              onError={(e) => {
                                e.target.src =
                                  "https://c.animaapp.com/miks4oe9SWsilu/img/container.svg";
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            {services.length > 0 && (
              <footer className="flex items-center justify-between px-4 py-[16.8px] bg-gray-50 border-t-[0.8px] border-[#f2f4f6]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-Cairo font-normal text-[#e7000b] text-sm leading-5 [direction:rtl]">
                      غير متاح: {unavailableCount}
                    </span>
                    <div className="w-2 h-2 bg-[#e7000b] rounded-full" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-Cairo font-normal text-[#00a63d] text-sm leading-5 [direction:rtl]">
                      متاح: {availableCount}
                    </span>
                    <div className="w-2 h-2 bg-[#00a63d] rounded-full" />
                  </div>
                </div>
                <p className="font-Cairo font-normal text-[#697282] text-sm leading-5 [direction:rtl]">
                  إجمالي الخدمات: {totalCount}
                </p>
              </footer>
            )}
          </CardContent>
        </Card>
      </div>

      {showModal && (
        <ServiceModal
          service={editingService}
          onSave={handleSaveService}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};
