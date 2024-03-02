"use client";

import AdminSidebarItem from "./AdminSidebarItem";
import { RiAdminFill } from "react-icons/ri";
import { IoMdCreate } from "react-icons/io";
import { LiaFirstOrder } from "react-icons/lia";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();
  const adminPanel = [
    {
      name: "Özetler",
      icon: RiAdminFill,
      url: "/admin",
    },
    {
      name: "Ürün Oluştur",
      icon: IoMdCreate,
      url: "/admin/create",
    },
    {
      name: "Ürünleri Yönet",
      icon: IoMdCreate,
      url: "/admin/manage",
    },
    {
      name: "Siparişlerim",
      icon: LiaFirstOrder,
      url: "/admin/order",
    },
  ];

  return (
    <div className=" min-w-[188px] relative  border-t h-[150vh] p-6 bg-orange-600">
      <div className="space-y-3 p-1">
        {adminPanel.map((admin, index) => (
          <AdminSidebarItem
            key={index}
            selected={pathname == admin.url}
            icon={admin.icon}
            name={admin.name}
            url={admin.url}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
