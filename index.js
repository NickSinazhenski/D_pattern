const { Task, TaskGroup, applyStrategy } = require("./src/tasks");
const {
  AgileStrategy,
  WaterfallStrategy,
  SpiralStrategy,
  RUPStrategy,
} = require("./src/strategies");

const project = new TaskGroup("Release 1.0");

const frontend = new TaskGroup("Frontend");
frontend.add(new Task("Landing page layout", "design"));
frontend.add(new Task("UI components", "development"));

const backend = new TaskGroup("Backend");
backend.add(new Task("Auth service", "development"));
backend.add(new Task("Reporting API", "development"));

const qa = new TaskGroup("QA");
qa.add(new Task("Regression suite", "testing"));
qa.add(new Task("Load testing", "testing"));

project.add(frontend);
project.add(backend);
project.add(qa);

const strategies = [
  new AgileStrategy(),
  new WaterfallStrategy(),
  new SpiralStrategy(),
  new RUPStrategy(),
];

for (const strategy of strategies) {
  applyStrategy(project, strategy);
  const title = strategy.constructor.name.replace("Strategy", "");
  console.log(`\n=== ${title} ===`);
  console.log(project.execute());
}
