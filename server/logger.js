const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Formato personalizado de log
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Criar o logger com configurações de nível e formato
const logger = createLogger({
  level: 'info', // nível mínimo de log: info, warn, error
  format: combine(
    colorize(), // Colore o output no console
    timestamp(), // Adiciona timestamp ao log
    myFormat // Aplica o formato personalizado
  ),
  transports: [
    new transports.Console(), // Log no console
    new transports.File({ filename: 'combined.log' }) // Log em arquivo
  ],
});

module.exports = logger;
