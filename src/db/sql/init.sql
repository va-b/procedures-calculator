create table "FrontendStep"
(
  "Id"    serial  not null,
  "Title" text,
  "Order" integer not null,
  constraint """BuildSteps""_pk"
    primary key ("Id"),
  UNIQUE ("Order")
);

comment on table "FrontendStep" is 'Шаг в интерфейсе калькулятора (группировка по страницам)';

comment on column "FrontendStep"."Order" is 'Порядок отображения';

create table "Parameter"
(
  "Id"             serial  not null,
  "FrontendStepId" integer not null,
  "Title"          text,
  "Description"    text,
  "ImageUrl"       text,
  constraint """Parameter""_pk"
    primary key ("Id"),
  constraint parameter_buildstep_id_fk
    foreign key ("FrontendStepId") references "FrontendStep"
);

comment on table "Parameter" is 'Параметр (напр. этажность)';

create index parameter_frontendstepid_index
  on "Parameter" ("FrontendStepId");

create table "Choice"
(
  "Id"          serial  not null,
  "Title"       text,
  "ParameterId" integer not null,
  "Selected" boolean default false not null,
constraint """Choice""_pk"
    primary key ("Id"),
  constraint choice_parameter_id_fk
    foreign key ("ParameterId") references "Parameter"
      on delete cascade
);

comment on table "Choice" is 'Выбор';

create index choice_parameterid_index
  on "Choice" ("ParameterId");

create table "Link"
(
  "Id"  serial  not null,
  "ChS" integer not null,
  "ChE" integer not null,
  constraint "Link_pk" primary key ("Id"),
  constraint link_chs_fk foreign key ("ChS") references "Choice" on delete cascade,
  constraint link_che_fk foreign key ("ChE") references "Choice" on delete cascade,
  CHECK ("ChS" != "ChE"),
  unique ("ChS", "ChE")
);
comment on table "Link" is 'Ребро графа';
create index link_chs_index on "Link" ("ChS");
create index link_che_index on "Link" ("ChE");

create table "Document"
(
  "Id"    serial not null,
  "Title" text,
  constraint """Document""_pk"
    primary key ("Id")
);

create table "Stage"
(
  "Id"    serial  not null,
  "Title" text,
  "Order" integer not null,
  constraint """Stage""_pk"
    primary key ("Id"),
  UNIQUE ("Order")
);

comment on table "Stage" is 'Стадия строительства';

comment on column "Stage"."Order" is 'Порядок отображения';

create table "Subregion"
(
  "Id"    serial not null,
  "Title" text,
  constraint """Subregion""_pk"
    primary key ("Id")
);

comment on table "Subregion" is 'Деление организаций на областные/муниципальные/городские и др';

create table "Organisation"
(
  "Id"             serial               not null,
  "Title"          text,
  "Phone"          text,
  "Fax"            text,
  "Email"          text,
  "Address"        text,
  "Latitude"       double precision,
  "Longitude"      double precision,
  "SubregionId"    integer              not null,
  "IsByGovernment" boolean default true not null,
  constraint """Organisation""_pk"
    primary key ("Id"),
  constraint organisation_subregion_id_fk
    foreign key ("SubregionId") references "Subregion"
      on delete cascade
);

create index organisation_subregionid_index
  on "Organisation" ("SubregionId");

create table "Procedure"
(
  "Id"               serial               not null,
  "OrganisationId"   integer              not null,
  "DocumentId"       integer              not null,
  "StageId"          integer              not null,
  "PerformingTime"   integer,
  "IsTimeByCalendar" boolean default true not null,
  "Title"            text,
  constraint """Procedure""_pk"
    primary key ("Id"),
  constraint procedure_document_id_fk
    foreign key ("DocumentId") references "Document"
      on delete cascade,
  constraint procedure_organisation_id_fk
    foreign key ("OrganisationId") references "Organisation"
      on delete cascade,
  constraint procedure_stage_id_fk
    foreign key ("StageId") references "Stage"
      on delete cascade
);

create index procedure_organisationid_index
  on "Procedure" ("OrganisationId");

create index procedure_stageid_index
  on "Procedure" ("StageId");

create table "Expression"
(
  "Id"          serial  not null,
  "ChoiceId"    integer not null,
  "ProcedureId" integer not null,
  constraint """Expression""_pk"
    primary key ("Id"),
  unique ("ChoiceId", "ProcedureId"),
  constraint expression_choice_id_fk
    foreign key ("ChoiceId") references "Choice"
      on delete cascade,
  constraint expression_procedure_id_fk
    foreign key ("ProcedureId") references "Procedure"
      on delete cascade
);

comment on table "Expression" is 'Связующее выражение (определяет последствия выбора - другие выборы или процедуры)';

create index expression_choiceid_index
  on "Expression" ("ChoiceId");

create index expression_procedureid_index
  on "Expression" ("ProcedureId");

create or replace view "ProcedureResultPreview" as
SELECT pr."Id"                                                 AS "ProcedureId",
       o."Id"                                                  AS "OrganisationId",
       ((o."Title" || ' по '::text) || r."Title")              AS "OrganisationName",
       d."Title"                                               AS "Document",
       ((('['::text || s."Order") || '] '::text) || s."Title") AS "Stage"
FROM "Procedure" pr,
     "Stage" s,
     "Document" d,
     "Organisation" o,
     "Subregion" r
WHERE ((o."Id" = pr."OrganisationId") AND (s."Id" = pr."StageId") AND (d."Id" = pr."DocumentId") AND
       (r."Id" = o."SubregionId"));

create or replace view "ChoiceProcedureReferencePreview" as
  WITH RECURSIVE graph(choice_names, choice_ids, ids, id, expression_id) as (
    SELECT c."Title",
           c."Id"::text,
           l."ChS",
           c."Id",
           ex."Id"
    FROM "Choice" c,
         "Link" l,
         "Expression" ex
    WHERE l."ChE" = c."Id"
      AND ex."ChoiceId" = c."Id"
    UNION ALL
    SELECT g.choice_names || '|' || c."Title",
           g.choice_ids || '|' || c."Id",
           l."ChS",
           c."Id",
           g.expression_id
    FROM graph g,
         "Choice" c
           LEFT JOIN "Link" l on c."Id" = l."ChE"
    WHERE c."Id" = g.ids
    )
    SELECT p."Id"    as procedure_id,
           e."Id"    as expression_id,
           graph.choice_ids,
           p."Title" as procedure_name,
           graph.choice_names
    FROM graph,
         "Expression" e,
         "Procedure" p
    WHERE graph.ids isnull
      AND e."Id" = graph.expression_id
      AND e."ProcedureId" = p."Id";

CREATE OR REPLACE VIEW "ResultItemView"
AS
SELECT  p."StageId" as "StageId",
        p."Id" as "ProcedureId",
        p."Title" as "ProcedureName",
        o."Id" as "OrganisationId",
        o."Title" as "OrganisationName",
        p."PerformingTime" as "PerformingTime",
        d."Title" as "DocumentName",
        p."IsTimeByCalendar" as "IsTimeByCalendar"
FROM "Procedure" p,
     "Document" d,
     "Organisation" o
WHERE d."Id" = p."DocumentId"
  AND o."Id" = p."OrganisationId"; 