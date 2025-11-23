export default interface IShow {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: string;
    premiered: Date;
    image: IImage;
    officialSite: string;
    schedule: string;
    rating: IRating;
}

interface IImage {
    medium: string;
    original: string;
}

interface IRating {
    average: number;
}