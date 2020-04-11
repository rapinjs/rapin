declare interface link {
  href: string;
  rel: string;
}
declare interface style {
  href: string;
  rel: string;
  media: string;
}

export declare class Document {

  setTitle(title: string): void
  getTitle(): string

  setDescription(description: string): void
  getDescription(): string

  setKeywords(keywords: string): void
  getKeywords(): string

  addLink(href: string, rel: string): void
	getLinks(): Array<link>
  
  addStyle(href: string, rel?: string, media?: string): void
	getStyles(): Array<style>
  
  addScript(href: string, postion?: string): void
  getScripts(postion?: string): Array<string>
}