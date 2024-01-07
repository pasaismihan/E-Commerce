import Link from "next/link";
import { IconType } from "react-icons";

type AdminSidebarProps = {
  selected?: boolean;
  name: string;
  icon: IconType;
  url: string;
};

const AdminSidebarItem: React.FC<AdminSidebarProps> = ({
  selected,
  icon: Icon,
  url,
  name,
}) => {
  // AdminSidebar componentinden value olarak almak yerine direkt olarak icerisinde bulunanlari props olarak gectik
  return (
    <Link
      className={`cursor-pointer flex items-center gap-2 ${
        selected ? "text-black font-bold underline" : "text-white font-medium"
      }`}
      href={url}
    >
      <Icon size={20} />
      <div>{name}</div>
    </Link>
  );
};

export default AdminSidebarItem;
