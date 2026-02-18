export interface UnsplashPhoto {
    id: string;
    alt_description?: string;
    description?: string;
    urls: {
        regular: string;
        small: string;
        thumb: string;
    };
    user: {
        name: string;
        profile_image: {
            small: string;
        }
        links: {
            html: string;
        };
    };
    links: {
        html: string;              
        download: string;          
        download_location: string;
    };
}

export interface UnsplashSearchResponse {
    total: number;
    total_pages: number;
    results: UnsplashPhoto[];
}
export interface UnsplashTopic {
    id: string;
    slug: string;
    title: string;
}

export type SearchOrderBy = | "relevant" | "latest";

export type TopicOrderBy = | "latest" | "oldest" | "popular";

export type Topic = {
  id: string;
  slug: string;
  title: string;
};

export const COLOR_OPTIONS = [
  "black_and_white",
  "black",
  "white",
  "yellow",
  "orange",
  "red",
  "purple",
  "magenta",
  "green",
  "teal",
  "blue"
] as const;

export type Color = typeof COLOR_OPTIONS[number];

export type Filters = {
  topicFilter?: UnsplashTopic; // topic slugs
  orientation?: "landscape" | "portrait" | "squarish";
  color?: Color;
    //default for photos without topics filter - relevant
  searchOrderBy? : SearchOrderBy;
    //default for photos with topics filter- latest
  topicOrderBy?: TopicOrderBy; 
  infiniteScroll: boolean;
};  