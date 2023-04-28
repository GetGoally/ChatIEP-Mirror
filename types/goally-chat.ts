export type Role = 'assistant' | 'user' | 'system';

export interface Message {
    id: string;
    role: Role;
    content: string;
}

export interface UploadResponse {
    s3_file_path: string;
}