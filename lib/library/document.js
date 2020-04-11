"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Document {
    constructor() {
        this.links = [];
        this.styles = [];
        this.scripts = [];
    }
    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }
    setDescription(description) {
        this.description = description;
    }
    getDescription() {
        return this.description;
    }
    setKeywords(keywords) {
        this.keywords = keywords;
    }
    getKeywords() {
        return this.keywords;
    }
    addLink(href, rel) {
        this.links = [...this.links, {
                href,
                rel
            }];
    }
    getLinks() {
        return this.links;
    }
    addStyle(href, rel = 'stylesheet', media = 'screen') {
        this.styles = [...this.styles, {
                href,
                rel,
                media
            }];
    }
    getStyles() {
        return this.styles;
    }
    addScript(href, postion = 'header') {
        if (!this.scripts[postion]) {
            this.scripts[postion] = [];
        }
        this.scripts[postion] = [...this.scripts[postion], href];
    }
    getScripts(postion = 'header') {
        if (this.scripts[postion]) {
            return this.scripts[postion];
        }
        else {
            return [];
        }
    }
}
exports.default = Document;
//# sourceMappingURL=document.js.map