
export function sendLog(message: string) {
    fetch('http://localhost:3030/log', {
        method: 'POST', body: `topic=${message}`, headers: {'Content-type': 'application/x-www-form-urlencoded'}})
    .then(() => alert("log sent"));
}