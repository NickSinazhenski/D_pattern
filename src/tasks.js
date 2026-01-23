class TaskComponent {
  constructor(name, strategy = null) {
    this.name = name;
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  isComposite() {
    return false;
  }

  getChildren() {
    return [];
  }

  execute() {
    if (!this.strategy) {
      throw new Error(`Strategy not set for task "${this.name}"`);
    }
    return this.strategy.execute(this).join("\n");
  }
}

class Task extends TaskComponent {
  constructor(name, type, strategy = null) {
    super(name, strategy);
    this.type = type;
  }
}

class TaskGroup extends TaskComponent {
  constructor(name, strategy = null) {
    super(name, strategy);
    this.children = [];
  }

  isComposite() {
    return true;
  }

  add(task) {
    this.children.push(task);
  }

  remove(task) {
    const index = this.children.indexOf(task);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  getChildren() {
    return [...this.children];
  }
}

function applyStrategy(task, strategy) {
  task.setStrategy(strategy);
  if (task.isComposite()) {
    for (const child of task.getChildren()) {
      applyStrategy(child, strategy);
    }
  }
}

module.exports = {
  TaskComponent,
  Task,
  TaskGroup,
  applyStrategy,
};
