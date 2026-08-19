import { filter, count } from "./src/commands/index.js";
import { parseFlag, logError, logHelp } from "./src/utils/index.js";
import { data } from "./src/infra/index.js";

const registery = {
  filter,
  count,
};

const args = process.argv.slice(2);
const { flag, value } = parseFlag(args);

const cmd = registery[flag];

if (!cmd) {
  logError(`Registery doesn't include command : "${flag}"`);
  process.exit(1);
}

const result = cmd(data, value);

console.dir(result, { depth: null });
