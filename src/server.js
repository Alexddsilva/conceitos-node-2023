import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

//GET, POST, PUT, PATCH, DELETE
//JSON - JavaScript Object Notation
// Statefull - Stateless
//Cabeçalhos (Request/response) => Metadata
//HTTP Status Code

// Query Parameters: URL Stateful => filtros, paginação, não obrigatórios 'http://localhost:3333/users?userId=1&name='Alex'
// Route Parameters: ex: Identificação de recurso =>  GET | http://localhost:3333/users/1
// Request Body: Dados em geral

const server = http.createServer(async (req, res) => {
	const { method, url } = req;

	await json(req, res);

	const route = routes.find((route) => {
		return route.method === method && route.path.test(url);
	});

	if (route) {
		const routeParams = req.url.match(route.path);

		console.log(routeParams);
		return route.handler(req, res);
	}

	return res.writeHead(404).end();
});

server.listen(3333);
