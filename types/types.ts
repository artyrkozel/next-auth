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

export interface INFTItem {
    category: string[]
    created_at: string
    discription: string
    id: string
    likes: number | null
    preview_image: string | null
    price: number
    product_name: string
    properties: string
    royality: string | null
    size: number
    updated_at: string | null
    user_id: string
}