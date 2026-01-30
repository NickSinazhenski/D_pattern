const {
  Document,
  WatermarkDecorator,
} = require("./src/documents");
const {
  CloneDocumentCommand,
  ApplyWatermarkCommand,
} = require("./src/document_commands");

console.log("Document Manager ");

const baseDoc = new Document("Spec", "Initial requirements.");
baseDoc.setContent(`${baseDoc.getContent()}\nAdded scope and milestones.`);

const copy = new CloneDocumentCommand(baseDoc).execute();
const decorated = new ApplyWatermarkCommand(
  copy,
  (doc) => new WatermarkDecorator(doc, "int")
).execute();

console.log("Title:", decorated.getTitle());
console.log("Content:", decorated.getContent());
