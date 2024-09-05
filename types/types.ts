import { IconType } from "react-icons";

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export interface IOptions {
    label: string;
    value: string;
    icon?: IconType;
}