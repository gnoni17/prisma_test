interface ILogger {
  info: (message: string) => void;
  warn: (message: string) => void;
  debug: (message: string) => void;
  error: (message: string) => void;
}

const developmentLogger = (): ILogger => ({
  info: (message: string) => {
    console.log(message);
  },
  warn: (message: string) => {
    console.log(message);
  },
  debug: (message: string) => {
    console.log(message);
  },
  error: (message: string) => {
    console.log(message);
  },
});

const productionLogger = (): ILogger => ({
  info: (message: string) => {},
  warn: (message: string) => {
    console.log(message);
  },
  debug: (message: string) => {},
  error: (message: string) => {
    console.log(message);
  },
});

function createLogger(): ILogger {
  if (process.env.NODE_ENV == "development") {
    return developmentLogger()
  } else {
    return productionLogger()
  }
}

export const logger = createLogger()
