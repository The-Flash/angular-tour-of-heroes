export interface Hero {
    id: number;
    name: string;
    saveCount?: number;
}

export interface CRUDAction<T> {
    action: "add" | "update" | "delete";
    data: T
}