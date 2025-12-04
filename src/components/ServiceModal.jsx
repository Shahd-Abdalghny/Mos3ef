/** @format */

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const ServiceModal = ({ service, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: 1,
    description: "",
    availability: "متاح",
    workingHours: "24 ساعة",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        price: service.price || "",
        categoryId: service.categoryId || 1,
        description: service.description || "",
        availability: service.availability || "متاح",
        workingHours: service.workingHours || "24 ساعة",
      });
    } else {
      setFormData({
        name: "",
        price: "",
        categoryId: 1,
        description: "",
        availability: "متاح",
        workingHours: "24 ساعة",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("الرجاء إدخال اسم الخدمة");
      return;
    }

    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      alert("الرجاء إدخال سعر صحيح");
      return;
    }

    setLoading(true);

    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h3 className="font-Cairo text-lg font-semibold text-gray-900">
            {service ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              اسم الخدمة *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
              placeholder="أدخل اسم الخدمة"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              السعر (جنيه) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
              placeholder="أدخل السعر"
              required
              min="1"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              الفئة *
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
              disabled={loading}
            >
              <option value="1">طوارئ</option>
              <option value="2">عناية مركزة</option>
              <option value="3">حضانة أطفال</option>
              <option value="4">بنك دم</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              حالة الخدمة *
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
              disabled={loading}
            >
              <option value="متاح">متاح</option>
              <option value="غير متاح">غير متاح</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              ساعات العمل
            </label>
            <input
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
              placeholder="مثال: 24 ساعة"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              الوصف
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
              placeholder="أدخل وصف الخدمة"
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "جاري الحفظ..." : service ? "تحديث" : "إضافة"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
