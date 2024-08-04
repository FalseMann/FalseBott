import { createLogger, format, Logger, transports } from "winston";

type Dependencies = {
  apiKey: string;
  applicationName: string;
  logLevel: string;
};

export function makeLogger({
  apiKey,
  applicationName,
  logLevel,
}: Dependencies): Logger {
  const transporters = [];

  if (apiKey && applicationName) {
    transporters.push(
      new transports.Http({
        host: "http-intake.logs.datadoghq.com",
        path: `/api/v2/logs?dd-api-key=${apiKey}&ddsource=nodejs&service=${applicationName}`,
        ssl: true,
      }),
    );
  } else {
    transporters.push(new transports.Console());
  }

  const logger = createLogger({
    level: logLevel,
    exitOnError: false,
    format: format.json(),
    transports: transporters,
  });

  return logger;
}
