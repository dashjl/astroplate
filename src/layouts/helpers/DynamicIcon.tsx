import React, { type FC } from "react";
import type { IconType } from "react-icons";
import * as FaIcons from "react-icons/fa6";
import * as MdIcons from "react-icons/md";
import * as LuIcons from "react-icons/lu";
// import * as AiIcons from "react-icons/ai";
// import * as BsIcons from "react-icons/bs";
// import * as FiIcons from "react-icons/fi";
// import * as Io5Icons from "react-icons/io5";
// import * as RiIcons from "react-icons/ri";
// import * as TbIcons from "react-icons/tb";
// import * as TfiIcons from "react-icons/tfi";

type IconMap = Record<string, IconType>;

interface IDynamicIcon extends React.SVGProps<SVGSVGElement> {
  icon: string;
  className?: string;
}

const iconLibraries: { [key: string]: IconMap } = {
  fa: FaIcons,
  md: MdIcons,
  lu: LuIcons,
};

const DynamicIcon: FC<IDynamicIcon> = ({ icon, ...props }) => {
  const getIconLibrary = (icon: string): IconMap | undefined => {
    const libraryKey = icon.substring(0, 2).toLowerCase();
    return iconLibraries[libraryKey];
  };

  const IconLibrary = getIconLibrary(icon);
  // Transform icon name to PascalCase for lookup, e.g., "faRocket" to "FaRocket"
  const iconName = icon.charAt(0).toUpperCase() + icon.slice(1);
  const Icon = IconLibrary ? IconLibrary[iconName] : undefined;

  if (!Icon) {
    return <span className="text-sm">Icon not found</span>;
  }

  return <Icon {...props} />;
};

export default DynamicIcon;
