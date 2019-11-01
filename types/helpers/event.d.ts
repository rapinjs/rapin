export declare const Listing: (action: any, type: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const triggerEvent: (action: any, type: any, args: any) => Promise<void>;
export declare const Trigger: (action: any, type: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => Promise<void>;
