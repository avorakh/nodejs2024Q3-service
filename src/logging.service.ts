import { LoggerService, Injectable, Scope } from '@nestjs/common';
import { resolve, join } from 'path';
import {
  existsSync,
  mkdirSync,
  appendFileSync,
  renameSync,
  statSync,
} from 'fs';

const LOG_LEVEL_VERBOSE = 0;
const LOG_LEVEL_DEBUG = 1;
const LOG_LEVEL_LOG = 2;
const LOG_LEVEL_WARN = 3;
const LOG_LEVEL_ERROR = 4;

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService implements LoggerService {
  private readonly logLevel: number;
  private readonly logDir: string;
  private readonly maxFileSize: number;

  constructor() {
    this.logLevel = parseInt(process.env.LOG_LEVEL || '1', 10);
    this.logDir = process.env.LOG_DIR || resolve(__dirname, '..', 'logs');
    this.maxFileSize = parseInt(process.env.MAX_FILE_SIZE || '1048576', 10);

    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  log(message: any, context?: string) {
    if (this.shouldLog(LOG_LEVEL_LOG)) {
      const formattedMessage = this.formatMessage('LOG', message, context);
      console.log(formattedMessage);
      this.logToFile('application.log', formattedMessage);
    }
  }

  error(message: any, trace?: string, context?: string) {
    if (this.shouldLog(LOG_LEVEL_ERROR)) {
      const formattedMessage = this.formatMessage('ERROR', message, context);

      const formattedErrorMessage = this.formatMessage(
        'ERROR',
        `${message} ${trace || ''}`,
        context,
      );
      console.error(formattedMessage);
      this.logToFile('application.log', formattedMessage);
      this.logToFile('error.log', formattedErrorMessage);
    }
  }

  warn(message: any, context?: string) {
    if (this.shouldLog(LOG_LEVEL_WARN)) {
      const formattedMessage = this.formatMessage('WARN', message, context);
      console.warn(formattedMessage);
      this.logToFile('application.log', formattedMessage);
    }
  }

  debug(message: any, context?: string) {
    if (this.shouldLog(LOG_LEVEL_DEBUG)) {
      const formattedMessage = this.formatMessage('DEBUG', message, context);
      console.debug(formattedMessage);
      this.logToFile('application.log', formattedMessage);
    }
  }

  verbose(message: any, context?: string) {
    if (this.shouldLog(LOG_LEVEL_VERBOSE)) {
      const formattedMessage = this.formatMessage('VERBOSE', message, context);
      console.log(formattedMessage);
      this.logToFile('application.log', formattedMessage);
    }
  }

  private shouldLog(level: number): boolean {
    return level >= this.logLevel;
  }

  private formatMessage(level: string, message: any, context?: string): string {
    const timestamp = new Date().toISOString();
    const pid = process.pid;
    const logContext = context || 'Application';

    return `${timestamp} - [${pid}] [${level}] [${logContext}] ${message}`;
  }

  private logToFile(filename: string, message: string) {
    const filePath = join(this.logDir, filename);
    const stats = existsSync(filePath) ? statSync(filePath) : null;

    if (stats && stats.size >= this.maxFileSize) {
      renameSync(filePath, `${filePath}.${Date.now()}`);
    }
    appendFileSync(filePath, message + '\n');
  }
}
