export interface UnsplashPhoto {
    id: string;
    alt_description?: string;
    description?: string;
    urls: {
        regular: string;
        small: string;
    };
    user: {
        name: string;
        links: {
            html: string;
        };
    };
    links: {
        html: string;              // photographer credit link
        download: string;          // direct download
        download_location: string; // API download tracking link
    };
}

export interface UnsplashSearchResponse {
    total: number;
    total_pages: number;
    results: UnsplashPhoto[];
}