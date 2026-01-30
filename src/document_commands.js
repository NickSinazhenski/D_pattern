class Command {
  execute() {
    throw new Error("execute() must be implemented");
  }
}

class CloneDocumentCommand extends Command {
  constructor(document) {
    super();
    this.document = document;
  }

  execute() {
    return this.document.clone();
  }
}

class ApplyWatermarkCommand extends Command {
  constructor(document, watermarkFactory) {
    super();
    this.document = document;
    this.watermarkFactory = watermarkFactory;
  }

  execute() {
    return this.watermarkFactory(this.document);
  }
}

module.exports = {
  Command,
  CloneDocumentCommand,
  ApplyWatermarkCommand,
};
