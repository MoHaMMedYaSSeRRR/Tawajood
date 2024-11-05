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
}
