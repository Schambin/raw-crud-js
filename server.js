import http from 'node:http';
import { json } from './src/middleware/auth.js';
import { routes } from './routes.js';
import { extractQueryParams } from './src/utils/extract-query-params.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    await json(req, res);

    const route = routes.find(route => {
        return route.method === method && route.path.test(url);
    });

    if (route) {
        const routeParams = req.url.match(route.path);

        const { query, ...params } = routeParams.groups;
        req.params = params;
        req.query = query ? extractQueryParams(query) : {};

        return route.handler(req, res);
    }

    return res.writeHead(404).end();
});

const port = 3000;
server.listen(port);
console.log(`Running on > http://localhost:${port}`);