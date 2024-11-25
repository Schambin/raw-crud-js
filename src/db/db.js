import fs from 'node:fs/promises';

const databasePath = new URL('./db.json', import.meta.url);

export class Database {
    #database = {};

    constructor() {
        this.#load();
    }

    async #load() {
        try {
            const data = await fs.readFile(databasePath, 'utf8');
            this.#database = JSON.parse(data);
        } catch (error) {
            this.#database = {};
            await this.#persist();
        }
    }

    async #persist() {
        await fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2));
    }

    select(table, search) {
        let data = this.#database[table] ?? [];

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).every(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase());
                });
            });
        }

        return data;
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }
        this.#persist();

        return data;
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { ...this.#database[table][rowIndex], ...data };
            this.#persist();
            return this.#database[table][rowIndex];
        }

        return null;
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex > -1) {
            const [deletedItem] = this.#database[table].splice(rowIndex, 1);
            this.#persist();
            return deletedItem;
        }

        return null;
    }
}