import { getCurrentDateTime } from "../time";

const DEV_MODE = process.env.NODE_ENV === "development";

class LoggerHandler {
  static info(...msgs) {
    if (DEV_MODE) {
      console.info(...msgs);
    }
  }

  static log(...msgs) {
    if (DEV_MODE) {
      console.log(...msgs);
    }
  }

  static warn(...msgs) {
    if (DEV_MODE) {
      console.warn(...msgs);
    }
  }

  static debug(...msgs) {
    if (DEV_MODE) {
      console.debug(...msgs);
    }
  }

  static error(...msgs) {
    if (DEV_MODE) {
      console.error(...msgs);
    }
  }
}

const getCaller = () => {
  const stack = new Error().stack.toString();
  const preparedStack = stack.replace("Error\n", "");
  const stacks = preparedStack.split("\n");

  const searchText = "    at ";
  const splitRegex = /@http| /;

  let callers = [];

  const mainStacks = stacks.slice(2, 6);
  mainStacks.forEach((mainStack) => {
    if (mainStack) {
      const contentStr = mainStack.replace(searchText, "");
      const contentSplited = contentStr.split(splitRegex);
      const content =
        contentSplited && contentSplited[0] ? `${contentSplited[0]}` : "";
      if (content) {
        callers.push(content);
      }
    }
  });

  return `(${callers.join(" -> ")})`;
};

class Logger {
  static debug(...args) {
    var caller = getCaller();
    const dateTimeObj = getCurrentDateTime();
    LoggerHandler.debug(
      `[${dateTimeObj.date} ${dateTimeObj.time}]`,
      caller,
      ...args
    );
  }

  static error(...args) {
    var caller = getCaller();
    const dateTimeObj = getCurrentDateTime();
    LoggerHandler.error(
      `[${dateTimeObj.date} ${dateTimeObj.time}]`,
      caller,
      ...args
    );
  }

  static info(...args) {
    var caller = getCaller();
    if (
      caller.match("Object.fnStart()") ||
      caller.match("Object.fnEnd()") ||
      caller.match("apply()") ||
      caller.match("Object.fnEndRender()")
    ) {
      // Workaround to avoid printing the caller when it is called from
      // fnStart and fnEnd
      const dateTimeObj = getCurrentDateTime();
      LoggerHandler.info(`[${dateTimeObj.date} ${dateTimeObj.time}]`, ...args);
    } else {
      const dateTimeObj = getCurrentDateTime();
      LoggerHandler.info(
        `[${dateTimeObj.date} ${dateTimeObj.time}]`,
        caller,
        ...args
      );
    }
  }

  static log(...args) {
    var caller = getCaller();
    const dateTimeObj = getCurrentDateTime();
    LoggerHandler.log(
      `[${dateTimeObj.date} ${dateTimeObj.time}]`,
      caller,
      ...args
    );
  }

  static warn(...args) {
    var caller = getCaller();
    const dateTimeObj = getCurrentDateTime();
    LoggerHandler.warn(
      `[${dateTimeObj.date} ${dateTimeObj.time}]`,
      caller,
      ...args
    );
  }

  static assert(condition, message) {
    if (!condition) {
      var caller = getCaller();
      throw new Error(
        typeof message === "string"
          ? `Assertion failed at ${caller}: ${message}`
          : `Assertion failed at ${caller}`
      );
    }
  }

  static fnStart(...args) {
    var caller = getCaller();
    LoggerHandler.info(caller, "START", ...args);
  }

  static fnEnd(...args) {
    var caller = getCaller();

    LoggerHandler.info(caller, "END", ...args);
  }

  static fnEndRender(...args) {
    var caller = getCaller();

    LoggerHandler.info(caller, "END:RENDER", ...args);
  }
}

export default Logger;
