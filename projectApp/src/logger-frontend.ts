
// level should be one of the following: "info", "warn", "error", "fatal", or "test"
// but error should use the sendError function below instead
// i will add a check for a acceptable level, i just want to get this out so people can start using it - Madison
// levels trace and debug also exist but they don't log to the locations chosen properly currently 
// (i will fix this just wanted to get people using this asap)
export function sendLog(level: string, message: string) {
    console.log(message);
    fetch('http://localhost:3030/log', {
        method: 'POST', 
        body: JSON.stringify({ 
            level: level,
            message: message
            }), 
        headers: {'Content-type': 'application/json'}
    })
    // .then(() => {alert("log sent")});
}

// use for logging errors because we can see more information about the error this way
// error - the error object that is thrown
export function sendError(error: any, message: string) {
    fetch('http://localhost:3030/error', {
        method: 'POST',
        body: JSON.stringify({
            name: error.name,
            errmessage: error.message,
            stack: error.stack,
            message: message
        }),
        headers: {'Content-type': 'application/json'}
    });
}