
// export default icons;
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as DiIcons from "react-icons/di";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";

const Allicons={
    ...FaIcons,
    ...DiIcons,
    ...RiIcons,
    ...SiIcons
};

interface IconProps{
    iconName: string;
    className?: string;
}

const IconRender: React.FC<IconProps> = ({ iconName, className }) => {
    const IconComponent = Allicons[iconName as keyof typeof Allicons];
    if (!IconComponent) {
        return null;
    }
    return <IconComponent className={className} />;
};

export default IconRender;