'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const dbConnectionString  = "postgres://postgres:NeveroyatniyKonOlegaGazmanova@37.235.251.79:8002/procedures_calculator";
const { Pool } = require('pg');

process.on('unhandledRejection', (err) => {
    console.error(err);
    //process.exit(1);
});

async function init()
{
    const db = new Pool({ connectionString: dbConnectionString });
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../dist')
            }
        }
    });
    await server.register(require('@hapi/inert'));

    server.route({
        method : 'GET',
        path   : '/{filename*}',
        handler: { directory: { path: '.' } }
    });

    server.route({
        method : 'GET',
        path   : '/api/initial',
        handler: async (request, h) => {
            let res = await Promise.all([
                db.query('SELECT * FROM "FrontendStep" ORDER BY "Order"'),
                db.query('SELECT * FROM "Parameter" ORDER BY "FrontendStepId", "Id"'),
                db.query('SELECT * FROM "Choice" ORDER BY "ParameterId", "Id"'),
                db.query('SELECT * FROM "Expression"'),
                db.query('SELECT * FROM "Link"')
            ]);
            return {
                FrontendSteps:  res[0].rows,
                Parameters:     res[1].rows,
                Choices:        res[2].rows,
                Expressions:    res[3].rows,
                Links:          res[4].rows
            };
        }
    });

    server.route({
        method : 'GET',
        path   : '/api/organisation',
        handler: async (request, h) => {
            let id = parseInt(request.query.id);
            let res = await db.query('SELECT * FROM "Organisation" WHERE "Id" = $1 LIMIT 1', [id]);
            return res.rows[0];
        }
    });

    server.route({
        method : 'GET',
        path   : '/api/results',
        handler: async (request, h) => {
            let exids = request.query.exids.split('_').map(x => parseInt(x));
            let qe = exids.join(", ");
            let items = await db.query(`SELECT r FROM "Expression" e, "ResultItemView" r WHERE e."Id" in (${qe}) AND r."ProcedureId" = e."ProcedureId"`);
            //let res = await db.query('SELECT * FROM "Organisation" WHERE "Id" = $1 LIMIT 1', [id]);
            return items.rows;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
}



init();