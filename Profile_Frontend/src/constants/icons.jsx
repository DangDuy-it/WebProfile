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

const IconRender = ({ iconName, className }) => {
    const IconComponent = Allicons[iconName]; // Loại bỏ "as keyof typeof..."
    
    if (!IconComponent) {
        return null;
    }
    
    return <IconComponent className={className} />;
};


export default IconRender;