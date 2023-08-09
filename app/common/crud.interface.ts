export interface CRUD {
    list: () => Promise<any>;
    getById: (id: string) => Promise<any>;
    create: (resource: any) => Promise<any>;
    deleteById: (id: string) => Promise<any>;
    update: (resource: any) => Promise<any>;
}