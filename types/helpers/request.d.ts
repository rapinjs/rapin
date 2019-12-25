export declare const GET: (
  path: string,
  type?: string
) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
export declare const POST: (
  path: string,
  type?: string
) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
export declare const PUT: (
  path: string,
  type?: string
) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
export declare const DELETE: (
  path: string,
  type?: string
) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
export declare const required: (
  list: string[]
) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
export declare const validate: (
  action: string
) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void