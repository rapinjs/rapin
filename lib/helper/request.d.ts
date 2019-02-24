import Registry from "../engine/registry";
export declare const GET: (path: any, type?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const POST: (path: any, type?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const DELETE: (path: any, type?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const PUT: (path: any, type?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const required: (list: any) => (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
export declare const validate: (action: string) => (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
export declare const routes: (registryOption: Registry) => any[];
