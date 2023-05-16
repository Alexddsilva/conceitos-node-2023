import http from "node:http";

//GET, POST, PUT, PATCH, DELETE
//JSON - JavaScript Object Notation
//Cabeçalhos (Request/response) => Metadata

const users = [];

const server = http.createServer((req, res) => {
	const { method, url } = req;

	if (method === "GET" && url === "/users") {
		return res
			.setHeader("Content-type", "application/json")
			.end(JSON.stringify(users));
	}

	if (method === "POST" && url === "/users") {
		users.push({
			id: 1,
			name: "John Doe",
			email: "jhondoe@example.com",
		});
		return res.end("Criação de usuarios");
	}

	console.log(method, url);

	return res.end("Hello World auto change");
});

server.listen(3333);
