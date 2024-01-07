"use client";
import { User } from "@prisma/client";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserProps {
  currentUser: User | null | undefined;
}

const User: React.FC<UserProps> = ({ currentUser }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  const menuFunc = (type: any) => {
    setOpenMenu(false);
    if (type == "logout") {
      signOut();
      router.push("/");
    } else if (type == "register") {
      router.push("/register");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="hidden md:flex relative">
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="flex items-center cursor-pointer gap-1"
      >
        <FaUser size={25} />
        <div>{currentUser ? currentUser.name : "User"}</div>
      </div>
      <div>
        {openMenu && (
          <div className="absolute w-[150px] top-10 bg-white shadow-lg rounded-md right-0 p-2">
            {currentUser ? (
              <div className="space-y-1">
                <div
                  onClick={() => router.push("/admin")}
                  className="text-slate-600 cursor-pointer font-semibold"
                >
                  Admin
                </div>
                <div
                  onClick={() => menuFunc("logout")}
                  className="text-slate-600 cursor-pointer font-semibold"
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <div
                  onClick={() => menuFunc("register")}
                  className="text-slate-600 cursor-pointer font-semibold"
                >
                  Register
                </div>
                <div
                  onClick={() => menuFunc("login")}
                  className="text-slate-600 cursor-pointer font-semibold"
                >
                  Login
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
