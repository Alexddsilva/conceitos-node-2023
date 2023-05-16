import http from "node:http";
import { json } from "./middlewares/json.js";

//GET, POST, PUT, PATCH, DELETE
//JSON - JavaScript Object Notation
// Statefull - Stateless
//Cabeçalhos (Request/response) => Metadata
//HTTP Status Code

const users = [];

const server = http.createServer(async (req, res) => {
	const { method, url } = req;

	await json(req, res);

	if (method === "GET" && url === "/users") {
		return res.end(JSON.stringify(users));
	}

	if (method === "POST" && url === "/users") {
		const { name, email } = req.body;
		users.push({
			id: 1,
			name,
			email,
		});
		return res.writeHead(201).end();
	}

	console.log(method, url);

	return res.writeHead(404).end();
});

server.listen(3333);
