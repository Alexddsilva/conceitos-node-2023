import http from "node:http";

const server = http.createServer((req, res) => {
	return res.end("Hello World auto change");
});

server.listen(3333);
