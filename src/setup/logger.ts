import { initLogger, level, LoggerOptions } from '@ekarpovs/simple-logger';
import { LoggerFormatter, initHttpLogger } from '@ekarpovs/http-logger';

export const setupLogger = ({ app }) => {
  // const logRotated: loggerOptionsRotated = {
  //   fullFilename: process.env.SIMPLE_LOGGER_FILE_LOCATION,
  //   datePattern: process.env.SIMPLE_LOGGER_FILE_DATE_PATTERN,
  //   fileMaxSize: process.env.SIMPLE_LOGGER_FILE_MAX_SIZE,
  //   maxFiles: process.env.SIMPLE_LOGGER_MAX_FILES,
  //   zippedArchive: process.env.SIMPLE_LOGGER_ZIPPED_ARCHIVE,
  // };
  const loggerConfig: LoggerOptions = {
    loggerService: 'Node-Backend-Logger',
    loggerLevel: level.http,
    // loggerOptionsRotated: logRotated,
  };

  const logger = initLogger(loggerConfig);

  const cfg: LoggerFormatter = {
    token:
      ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  };

  const httpLogger = initHttpLogger(logger, cfg);
  app.use(httpLogger);

  return logger;
};
