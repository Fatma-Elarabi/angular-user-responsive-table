export interface Result {
    name: string;
    gender: string;
    location: string;
    email: string;
    age: number;
    seniority: number;
    phoneNumber: string;
    img: string;
    nationality: string;
}

export interface Time {
    instruct: number;
    generate: number;
}

export interface UserInfo {
    username: string;
    tier: string;
    results: string;
    remaining: string;
}

export interface Info {
    seed: string;
    results: string;
    page: string;
    version: string;
    time: Time;
    user: UserInfo;
}

export interface User {
    results: Result[];
    info: Info;
}

export interface Column {
    field: string;
    header: string
}