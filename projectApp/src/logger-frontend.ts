/**
 * sendLog: Creates and sends a log to the log server
 * @param level level of the log
 * @param message non-empty message string describing the log
 * @preconditions
 * - Level should be one of the following: "info", "warn", "error", "fatal", or "test", which determines severity of log message
 * - message != null
 * @postconditions A log will be written to the log server with the set level and message, along with timestamp etc.
 */
export function sendLog(level: string, message: string) {
  // Send the log to the log server
  fetch("http://localhost:3030/log", {
    method: "POST",
    body: JSON.stringify({
      level: level,
      message: message,
    }),
    headers: { "Content-type": "application/json" },
  });
  // .then(() => {alert("log sent")});
}

/**
 * sendError: Creates and sends an *error* log to the log server
 * (used specifically in error cases to provide more info)
 * @param error error object that is sent
 * @param message non-empty message string describing the error context
 * @preconditions
 * - "error" must represent the error object that is thrown
 * - message != null
 * @postconditions An error log will be written to the log server with additional messaging to provide context regarding the error
 */
export function sendError(error: any, message: string) {
  // Send an error-specific log to the log server
  fetch("http://localhost:3030/error", {
    method: "POST",
    body: JSON.stringify({
      name: error.name,
      errmessage: error.message,
      stack: error.stack,
      message: message,
    }),
    headers: { "Content-type": "application/json" },
  });
}


export function changeLogLevel(level: string) {
  fetch("http://localhost:3030/changeLevel", {
    method: "POST",
    body: JSON.stringify({
      level: level,
    }),
    headers: { "Content-type": "application/json" },
  });
}
