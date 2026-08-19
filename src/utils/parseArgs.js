import { logError, logWarning, logHelp } from "../utils/index.js";
import { flags } from "./flags.js";

export const parseFlag = (args) => {
  if (args.length > 1) {
    logWarning("Only one param can be specified, first one will remain");
  }

  const arg = args[0];

  const match = arg?.match(/^--([a-zA-Z][a-zA-Z0-9-]*)(?:=(.*))?$/);

  if (!match) {
    logError(`Invalid argument: ${arg}. Expected --<FLAG>[=<VALUE>].`);
    logHelp(
      `available commands : ${Object.keys(flags)
        .map((key) => `--${key}`)
        .join(", ")}`,
    );
    process.exit(1);
  }

  const [, flag, value] = match;
  const config = flags[flag];

  if (!config) {
    logError(`Unknown flag: --${flag}`);
    process.exit(1);
  }

  if (config.requiresValue && value === undefined) {
    logError(`Flag --${flag} requires a value.`);
    process.exit(1);
  }

  if (!config.requiresValue && value !== undefined) {
    logError(`Flag --${flag} does not accept a value.`);
    process.exit(1);
  }

  return {
    flag,
    value: value ?? null,
  };
};
