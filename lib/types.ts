export function isID(id: any): boolean {
    return id != undefined
        && id != null
        && typeof id === 'number'
        && Number.isInteger(id);
}

export function parseID(id: any): number {
    const parsed_id = typeof id == 'number' ? id : Number.parseInt(id);
    if (!isID(parsed_id)) {
        throw 'Invalid Book Id';
    }
    return parsed_id;
}

export function isToken(id: any): boolean {
    // TODO Actual check
    return id != undefined
        && id != null
        && typeof id === 'string';
}

export interface UserBookInfo {
    chapters_read: number,
}

export interface BookInfo {
    book_id: number,
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
    book_id: number,
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

export interface BookVolume {
    book_id: number,
    volume_number: number,
    chapter_count: number,
    extra_chapter_count: number,
    cover_url: string,
}