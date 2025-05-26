export type Song = {
    id: string;
    title: string;
    imgUrl: string;
    songUrl: string;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
};

export type SongCreateInput = Omit<
    Song,
    "id" | "createdAt" | "updatedAt" | "likesCount"
>;

export type SongUpdateInput = Partial<SongCreateInput>;
