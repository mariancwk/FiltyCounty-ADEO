import { filter, count } from "./src/commands/index.js";
import { parseFlag, logError, logHelp } from "./src/utils/index.js";
import { data } from "./src/infra/index.js";

const commands = {
  filter,
  count,
};

const args = process.argv.slice(2);
const { flag, value } = parseFlag(args);

const cmd = commands[flag];

if (!cmd) {
  logError(`unknow command : "${flag}"`);
  logHelp(`available commands : ${Object.keys(commands)}`);
  process.exit(1);
}

const result = cmd(data, value);

console.dir(result, { depth: null });
