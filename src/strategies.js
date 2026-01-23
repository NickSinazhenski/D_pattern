class StrategyBase {
  execute(task, level = 0) {
    return this._execute(task, level);
  }

  _execute(task, level) {
    const lines = [];

    if (task.isComposite()) {
      lines.push(...this.compositeStart(task, level));

      for (const child of task.getChildren()) {
        const strategy = child.strategy || this;
        lines.push(...strategy.execute(child, level + 1));
      }

      lines.push(...this.compositeEnd(task, level));
      return lines;
    }

    return [...this.leaf(task, level)];
  }

  compositeStart(_task, _level) {
    return [];
  }

  compositeEnd(_task, _level) {
    return [];
  }

  leaf(_task, _level) {
    return [];
  }

  indent(level) {
    return "  ".repeat(level);
  }
}

class AgileStrategy extends StrategyBase {
  compositeStart(task, level) {
    const indent = this.indent(level);
    return [`${indent}[Agile] Backlog for ${task.name}`];
  }

  compositeEnd(task, level) {
    const indent = this.indent(level);
    return [`${indent}[Agile] Sprint review for ${task.name}`];
  }

  leaf(task, level) {
    const indent = this.indent(level);
    return [`${indent}[Agile] Sprint task: ${task.name} (${task.type})`];
  }
}

class WaterfallStrategy extends StrategyBase {
  compositeStart(task, level) {
    const indent = this.indent(level);
    return [`${indent}[Waterfall] Freeze requirements for ${task.name}`];
  }

  compositeEnd(task, level) {
    const indent = this.indent(level);
    return [`${indent}[Waterfall] Integration test for ${task.name}`];
  }

  leaf(task, level) {
    const indent = this.indent(level);
    return [`${indent}[Waterfall] Build ${task.name} (${task.type}) after prior phase`];
  }
}

class SpiralStrategy extends StrategyBase {
  compositeStart(task, level) {
    const indent = this.indent(level);
    return [`${indent}[Spiral] Identify risks for ${task.name}`];
  }

  compositeEnd(task, level) {
    const indent = this.indent(level);
    return [`${indent}[Spiral] Evaluate iteration for ${task.name}`];
  }

  leaf(task, level) {
    const indent = this.indent(level);
    return [`${indent}[Spiral] Prototype ${task.name} (${task.type})`];
  }
}

class RUPStrategy extends StrategyBase {
  compositeStart(task, level) {
    const indent = this.indent(level);
    return [`${indent}[RUP] Inception for ${task.name}`];
  }

  compositeEnd(task, level) {
    const indent = this.indent(level);
    return [`${indent}[RUP] Transition for ${task.name}`];
  }

  leaf(task, level) {
    const indent = this.indent(level);
    return [`${indent}[RUP] Elaborate and construct ${task.name} (${task.type})`];
  }
}

module.exports = {
  StrategyBase,
  AgileStrategy,
  WaterfallStrategy,
  SpiralStrategy,
  RUPStrategy,
};
