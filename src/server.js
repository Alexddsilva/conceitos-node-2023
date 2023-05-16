import http from "node:http";

//GET, POST, PUT, PATCH, DELETE
//JSON - JavaScript Object Notation
// Statefull - Stateless
//Cabeçalhos (Request/response) => Metadata
//HTTP Status Code

const users = [];

const server = http.createServer(async (req, res) => {
	const { method, url } = req;

	const buffers = [];

	for await (const chunk of req) {
		buffers.push(chunk);
	}

	try {
		req.body = JSON.parse(Buffer.concat(buffers).toString());
	} catch {
		req.body = null;
	}

	if (method === "GET" && url === "/users") {
		return res
			.setHeader("Content-type", "application/json")
			.end(JSON.stringify(users));
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
