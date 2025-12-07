/** @format */

import { createContext, useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const baseUrl = "http://localhost:5000/api/";

  // ------------------ Get All Services ------------------
 const getAllServices = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await axios.post(
      `${baseUrl}Hospital/GetAllServices`,
      {}, 
      { headers }
    );

    // Always take the list from res.data.data
    const data = res.data?.data || [];

    setServices(data);

    return data;
  } catch (err) {
    console.error("Error fetching services:", err);
    setAlertMsg("فشل في جلب الخدمات");
    setAlertType("error");
    return [];
  }
};


  // ------------------ Add Service ------------------
  const addHospitalService = async (serviceData) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");

    const res = await axios.post(`${baseUrl}Hospital/AddService`, serviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // الخدمة موجودة داخل res.data.data
    const newService = res.data.data;
    if (!newService) {
      throw new Error("No service returned from API");
    }

    // تحديث الـ state لعرض الخدمة فورًا
    setServices((prev) => [...prev, newService]);

    setAlertMsg(res.data.message || "تمت الإضافة بنجاح!");
    setAlertType("success");

    return newService;
  } catch (error) {
    console.error("Error adding hospital service:", error);
    setAlertMsg(error.response?.data?.message || "حدث خطأ، حاول مرة أخرى");
    setAlertType("error");
    throw error;
  }
};


  // ------------------ Update Service ------------------
  const updateHospitalService = async (serviceId, serviceData) => {
    try {
      if (!serviceId) throw new Error("Service ID is required for update");

      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const res = await axios.put(`${baseUrl}Hospital/UpdateService/${serviceId}`, serviceData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const updatedService = res.data.data || res.data;

      // Update the state directly
      setServices((prev) =>
        prev.map((s) => (s.serviceId === serviceId ? updatedService : s))
      );

      setAlertMsg("تم تحديث الخدمة بنجاح");
      setAlertType("success");

      return updatedService;
    } catch (error) {
      console.error("Error updating service:", error);
      setAlertMsg(error.response?.data?.message || "حدث خطأ في التحديث");
      setAlertType("error");
      throw error;
    }
  };

  // ------------------ Delete Service ------------------
  const deleteHospitalService = async (serviceId) => {
    try {
      if (!serviceId) throw new Error("Service ID is required");

      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      await axios.delete(`${baseUrl}Hospital/DeleteService/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove from state immediately
      setServices((prev) => prev.filter((s) => s.serviceId !== serviceId));

      setAlertMsg("تم حذف الخدمة بنجاح");
      setAlertType("success");

      return true;
    } catch (err) {
      console.error("Error deleting service:", err);
      setAlertMsg(err.response?.data?.message || "فشل في حذف الخدمة");
      setAlertType("error");
      throw err;
    }
  };

  // ------------------ Get Service by ID ------------------
  const getServiceById = async (id) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(`${baseUrl}Services/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });

    return {
      success: response.data.isSucceded,  // ✔ matches backend
      data: response.data.data,          // ✔ contains the service object
      message: response.data.message,    // ✔ success message
    };
  } catch (error) {
    console.error(`Error fetching service ${id}:`, error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ في جلب بيانات الخدمة",
      data: null,
    };
  }
};


  // ------------------ Load services on mount ------------------
  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <HospitalContext.Provider
      value={{
        addHospitalService,
        updateHospitalService,
        deleteHospitalService,
        getAllServices,
        alertMsg,
        setAlertMsg,
        alertType,
        setAlertType,
        services,
        setServices,
        getServiceById,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};