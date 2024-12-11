export interface Service {
    id: number;
    admin_id: number | null;
    icon: string;
    sorting: number;
    active: number;
    name: string;
    content: string;
    meta_keywords:any;
    meta_description:any;
    meta_title:any;
}
