import { randomUUID } from 'node:crypto';
import { Database } from './src/db/db.js';
import { buildRoutePath } from './src/utils/build-route-path.js';
import { formattedDateTime } from './src/utils/todays-date.js';

const taskId = randomUUID();
const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.query;

            const search = {};
            if (title) search.title = title;
            if (description) search.description = description;

            const tasks = database.select('tasks', Object.keys(search).length > 0 ? search : null);

            return res.end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body;

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: formattedDateTime,
                updated_at: null
            };

            database.insert('tasks', task);

            return res.writeHead(201).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            const taskExists = database.select('tasks', task => task.id === id)

            if (!taskExists.length) {
                return res.writeHead(404).end();
            }

            database.delete('tasks', id);

            return res.writeHead(204).end();
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params

            const task = database.select('tasks', task => task.id === id)[0];

            if (!task) {
                return res.writeHead(404).end();
            }

            database.update('tasks', id, {
                ...task,
                completed_at: formattedDateTime,
            });

            return res.writeHead(204).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;

            const task = database.select('tasks', task => task.id === id)[0];

            if (!task) {
                return res.writeHead(404).end(JSON.stringify({ error: 'Task not found' }));
            }

            const updatedTask = {
                ...task,
                title: title ?? task.title,
                description: description ?? task.description,
                updated_at: formattedDateTime
            };

            database.update('tasks', id, updatedTask);

            return res.writeHead(200).end(JSON.stringify(updatedTask));
        }
    }
];

