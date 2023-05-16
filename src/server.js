import http from "node:http";

//GET, POST, PUT, PATCH, DELETE

const server = http.createServer((req, res) => {
	const { method, url } = req;

	if (method === "GET" && url === "/users") {
		return res.end("Listagem de usuarios");
	}

	if (method === "POST" && url === "/users") {
		return res.end("Criação de usuarios");
	}

	console.log(method, url);

	return res.end("Hello World auto change");
});

server.listen(3333);
