
function connect() {
	var ip = query.get("ip") || "localhost";
	var port = query.get("port") || 2947;

	var socket = new WebSocket(`ws://${ip}:${port}/socket`);

	socket.addEventListener("open", () => {
		console.log("WebSocket opened");
	});

	socket.addEventListener("message", (message) => {
		var data = JSON.parse(message.data);
		var event = events[data._event];
		//console.log(event);
		if (event) {
			event(data);
		}
	});

	socket.addEventListener("close", () => {
		console.log("Failed to connect to server, retrying in 3 seconds");
		setTimeout(connect, 3000);
	});
}

connect();