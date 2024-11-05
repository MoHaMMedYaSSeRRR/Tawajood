export interface Project {
    id: number;
    type: number;
    name: string;
    link_ios: string | null;
    link_android: string | null;
    link_website: string;
    home_screen: string;
    created_at: string;
    images: string[];
}
