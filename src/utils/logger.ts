import fs from 'fs'

interface ILogger {
  info: (message: string) => void;
  warn: (message: string) => void;
  debug: (message: string) => void;
  error: (message: string) => void;
}

function createLogFile(message: string) {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const createStream = fs.createWriteStream(`src/log/${day}-${month}-${year}.txt`)
  createStream.write(message)
  createStream.end()
}

const developmentLogger = (): ILogger => ({
  info: (message: string) => {
    console.info(message);
  },
  warn: (message: string) => {
    console.warn(message);
  },
  debug: (message: string) => {
    console.debug(message);
  },
  error: (message: string) => {
    console.error(message);
  },
});

const productionLogger = (): ILogger => ({
  info: (message: string) => {},
  warn: (message: string) => {
    createLogFile(message)
  },
  debug: (message: string) => {},
  error: (message: string) => {
    createLogFile(message)
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
