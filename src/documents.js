class Document {
  constructor(title, content = "") {
    this.title = title;
    this.content = content;
  }

  clone() {
    return new Document(this.title, this.content);
  }

  getTitle() {
    return this.title;
  }

  getContent() {
    return this.content;
  }

  setContent(content) {
    this.content = content;
  }
}

class DocumentDecorator {
  constructor(document) {
    this.document = document;
  }

  clone() {
    return new this.constructor(this.document.clone());
  }

  getTitle() {
    return this.document.getTitle();
  }

  getContent() {
    return this.document.getContent();
  }

  setContent(content) {
    this.document.setContent(content);
  }
}

class WatermarkDecorator extends DocumentDecorator {
  constructor(document, watermark = "Private") {
    super(document);
    this.watermark = watermark;
  }

  getContent() {
    const base = this.document.getContent();
    return `${base}\n---\nWatermark: ${this.watermark}`;
  }
}

module.exports = {
  Document,
  DocumentDecorator,
  WatermarkDecorator,
};
