import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3">
      <AdminSidebar />
      {children}
      {/* bunun amaci admin sayfasinda her daim sidebarin bulunmasi gerektigi, bu yuzden layout icerine koyduk */}
      {/*AYNI DOSYA ICERISINDE PAGE VE LAYOUT KLASORLERI OLUSTURULGUNDA LAYOUT ICERISINDEKI CHILDREN PROPSU PAGE.TSX I TEMSIL EDER */}
    </div>
  );
};

export default AdminLayout;
