export interface Blog {
    id: number;
    name:string;
    admin_id: number;
    topic_id: number;
    title: string;
    content: string; // Assuming content is a string, you can change this if it's structured differently
    image: string;
    created_at: string; // You might want to use Date type depending on your implementation
    topic: {
      id: number;
      name: string;
    };
    image_one:string;
    image_two:string;
    image_three:string;
    meta_keywords:any;
    meta_description:any;
    meta_title:any;
    secondary_content:any;
    last_blogs:any;
    description:any;
    plainDescription:any;
}
