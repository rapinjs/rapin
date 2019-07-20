export declare class Loader {
  controller(route: string, data: any): Promise<any>
  model(route: string): void
  view(route: string, data: object): Promise<string>
  config(route: string): void
  language(route: string): object
}
