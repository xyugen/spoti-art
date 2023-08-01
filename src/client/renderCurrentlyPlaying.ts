interface MusicStat {
    timestamp: number;
    context: {
        external_urls: {
            spotify: string;
        };
        href: string;
        type: string;
        uri: string;
    };
    progress_ms: number;
    item: {
        album: {
            artists: {
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
            }[];
            images: {
                height: number;
                url: string;
                width: number;
            }[];
            name: string;
            release_date: string;
            release_date_precision: string;
            total_tracks: number;
            type: string;
            uri: string;
        };
        name: string;
    };
    is_playing: boolean;
    
}

export const renderCurrentlyPlaying = (musicStats: MusicStat) => {
    
}