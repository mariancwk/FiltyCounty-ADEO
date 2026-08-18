import { logError, logWarning } from "../utils/index.js";

export const parseFlag = (args) => {
  const flagRegex = /^--([a-zA-Z][a-zA-Z0-9-]*)=(.+)$/;

  if (args.length > 1)
    logWarning("Only one param can be specified, first one will remain");

  const arg = args[0];
  const match = arg.match(flagRegex);

  if (!match) {
    logError(`Invalid argument: ${arg}. Expected --<FLAG>=<VALUE>.`);
    process.exit(1);
  }

  const [, flag, value] = match;

  return { flag, value };
};
