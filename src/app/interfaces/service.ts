export interface Service {
    id: number;
    admin_id: number | null;
    icon: string;
    sorting: number;
    active: number;
    name: string;
    content: string;
}
