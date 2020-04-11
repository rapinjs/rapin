interface link {
  href: string;
  rel: string;
}
interface style {
  href: string;
  rel: string;
  media: string;
}
export default class Document {
  private title: string
  private description: string
  private keywords: string
  private links: Array<link> = []
  private styles: Array<style> = []
  private scripts: Array<string[]> = []

  public setTitle(title: string): void {
    this.title = title
  }

  public getTitle(): string {
    return this.title
  }

  public setDescription(description: string): void {
    this.description = description
  }

  public getDescription(): string {
    return this.description
  }

  public setKeywords(keywords: string): void {
    this.keywords = keywords
  }

  public getKeywords(): string {
    return this.keywords
  }

  public addLink(href: string, rel: string): void {
    this.links = [...this.links, {
      href,
      rel
    }]
  }

	public getLinks(): Array<link> {
		return this.links
  }
  
  public addStyle(href: string, rel: string = 'stylesheet', media: string = 'screen'): void {
		this.styles = [...this.styles, {
      href,
      rel,
      media
    }]
	}

	public getStyles(): Array<style> {
		return this.styles;
  }
  
  public addScript(href: string, postion: string = 'header'): void {
    if(!this.scripts[postion]) {
      this.scripts[postion] = []
    }
		this.scripts[postion] = [...this.scripts[postion], href];
	}

	public getScripts(postion: string = 'header'): string[] {
		if (this.scripts[postion]) {
			return this.scripts[postion];
		} else {
			return [];
		}
	}
}