export function isID(id: any): boolean {
    return typeof id === 'number' && Number.isInteger(id);
}

export function isToken(id: any): boolean {
    // TODO Actual check
    return typeof id === 'string';
}

export interface BookInfo {
    cover_url: string,
    title: string,
    title_romanized: string,
    title_native: string,
    description: string,
    author: string,
    start_date: Date,
    end_date: Date,
    banner_url: string,
    release_status: string,
}

export interface SerializableBookInfo {
    cover_url: string,
    title: string,
    title_romanized: string,
    title_native: string,
    description: string,
    author: string,
    start_date: string, // ISO String
    end_date: string, // ISO String
    banner_url: string,
    release_status: string,
}

export function createSerializableBookInfo(info: BookInfo): SerializableBookInfo {
    const { start_date, end_date } = info;

    return { ...info, start_date: start_date && start_date.toISOString(), end_date: end_date && end_date.toISOString() };
}

export function createBookInfo(info: SerializableBookInfo): BookInfo {
    const { start_date, end_date } = info;

    return { ...info, start_date: start_date && new Date(start_date), end_date: end_date && new Date(end_date) };
}