export interface PartnersPostsType {
  id: string;
  'company-name': string;
  articleTitle: string;
  description: string;
  text: string;
  image: string;
  created: {
    nanoseconds: number;
    seconds: number;
  };
}