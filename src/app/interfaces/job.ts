export interface Job {
  id: number;
  job_title_name: string;
  content: string;
  createdAt: string;
  endTime: string;
  image: string;
  metaDescription: string | null;
  metaKeywords: string | null;
  metaTitle: string | null;
  status: number;
  firstParagraph: any;
  description: any;
}
