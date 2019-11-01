declare interface LanguageList {
  [x: string]: string;
}
export declare class Language {
  get(key: string): string
  set(key: string, value: string): string
  all(): LanguageList
  load(filename: string): LanguageList
}