
export function sendLog(message: string) {
    console.log(message);
    fetch('http://localhost:3030/log', {
        method: 'POST', 
        body: JSON.stringify({ message }), 
        headers: {'Content-type': 'application/json'}})
    // .then(() => {alert("log sent")});
}