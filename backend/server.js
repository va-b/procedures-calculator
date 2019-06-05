'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const dbConnectionString  = "postgres://postgres:NeveroyatniyKonOlegaGazmanova@localhost:5432/procedures_calculator";
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
        //host: '37.235.251.79',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../dist')
            },
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
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
            let items = await db.query(`SELECT r.* FROM "Expression" e, "ResultItemView" r WHERE e."Id" in (${qe}) AND r."ProcedureId" = e."ProcedureId"`);
            let stages = await db.query('SELECT s."Id" as "StepId", s."Title" as "StepName", s."Order" as "StepNum" FROM "Stage" s');
            let result = stages.rows;
            result.forEach(s => {
                let it = items.rows.filter(i => i.StageId === s.StepId);
                s.Items = it;
                s.TotalTime = it.reduce((a, b) => clsc(a.PerformingTime, 0) + clsc(b.PerformingTime, 0), 0)
            });
            return result;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
}



init();


const clsc = (v, val) =>  v === null || v === undefined ? val : v;