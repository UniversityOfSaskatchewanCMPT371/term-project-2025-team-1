
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