import winston from 'winston'

import { ILogger } from '../interfaces/ILogger'

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
}

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info

    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`
  }),
)

class Logger {
  private logger: winston.Logger

  constructor() {
    const prodTransport = new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    })
    const transport = new winston.transports.Console({
      format: formatter,
    })
    this.logger = winston.createLogger({
      level: process.env.NODE_ENV === 'development' ? 'trace' : 'error',
      levels: customLevels.levels,
      transports: [
        process.env.NODE_ENV === 'development' ? transport : prodTransport,
      ],
    })
    winston.addColors(customLevels.colors)
  }

  trace(msg: string, meta?: ILogger) {
    this.logger.log('trace', msg, meta)
  }

  debug(msg: string, meta?: ILogger) {
    this.logger.debug(msg, meta)
  }

  info(msg: string, meta?: ILogger) {
    this.logger.info(msg, meta)
  }

  warn(msg: string, meta?: ILogger) {
    this.logger.warn(msg, meta)
  }

  error(msg: string, meta?: ILogger) {
    this.logger.error(msg, meta)
  }

  fatal(msg: string, meta?: ILogger) {
    this.logger.log('fatal', msg, meta)
  }
}

export const logger = new Logger()
