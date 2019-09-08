--
-- PostgreSQL database dump
--

-- Dumped from database version 10.7
-- Dumped by pg_dump version 10.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: procedures_calculator; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE procedures_calculator WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';


ALTER DATABASE procedures_calculator OWNER TO postgres;

\connect procedures_calculator

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Choice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Choice" (
    "Id" integer NOT NULL,
    "Title" text,
    "ParameterId" integer NOT NULL,
    "Selected" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Choice" OWNER TO postgres;

--
-- Name: TABLE "Choice"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Choice" IS 'Выбор';


--
-- Name: Expression; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Expression" (
    "Id" integer NOT NULL,
    "ChoiceId" integer NOT NULL,
    "ProcedureId" integer NOT NULL
);


ALTER TABLE public."Expression" OWNER TO postgres;

--
-- Name: TABLE "Expression"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Expression" IS 'Связующее выражение (определяет последствия выбора - другие выборы или процедуры)';


--
-- Name: Link; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Link" (
    "Id" integer NOT NULL,
    "ChS" integer NOT NULL,
    "ChE" integer NOT NULL,
    CONSTRAINT "Link_check" CHECK (("ChS" <> "ChE"))
);


ALTER TABLE public."Link" OWNER TO postgres;

--
-- Name: TABLE "Link"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Link" IS 'Ребро графа';


--
-- Name: Procedure; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Procedure" (
    "Id" integer NOT NULL,
    "OrganisationId" integer NOT NULL,
    "DocumentId" integer NOT NULL,
    "StageId" integer NOT NULL,
    "PerformingTime" integer,
    "IsTimeByCalendar" boolean DEFAULT true NOT NULL,
    "Title" text
);


ALTER TABLE public."Procedure" OWNER TO postgres;

--
-- Name: ChoiceProcedureReferencePreview; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public."ChoiceProcedureReferencePreview" AS
 WITH RECURSIVE graph(choice_names, choice_ids, ids, id, expression_id) AS (
         SELECT c."Title",
            (c."Id")::text AS "Id",
            l."ChS",
            c."Id",
            ex."Id"
           FROM public."Choice" c,
            public."Link" l,
            public."Expression" ex
          WHERE ((l."ChE" = c."Id") AND (ex."ChoiceId" = c."Id"))
        UNION ALL
         SELECT ((g.choice_names || '|'::text) || c."Title"),
            ((g.choice_ids || '|'::text) || c."Id"),
            l."ChS",
            c."Id",
            g.expression_id
           FROM graph g,
            (public."Choice" c
             LEFT JOIN public."Link" l ON ((c."Id" = l."ChE")))
          WHERE (c."Id" = g.ids)
        )
 SELECT p."Id" AS procedure_id,
    e."Id" AS expression_id,
    graph.choice_ids,
    p."Title" AS procedure_name,
    graph.choice_names
   FROM graph,
    public."Expression" e,
    public."Procedure" p
  WHERE ((graph.ids IS NULL) AND (e."Id" = graph.expression_id) AND (e."ProcedureId" = p."Id"));


ALTER TABLE public."ChoiceProcedureReferencePreview" OWNER TO postgres;

--
-- Name: Choice_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Choice_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Choice_Id_seq" OWNER TO postgres;

--
-- Name: Choice_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Choice_Id_seq" OWNED BY public."Choice"."Id";


--
-- Name: Document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Document" (
    "Id" integer NOT NULL,
    "Title" text
);


ALTER TABLE public."Document" OWNER TO postgres;

--
-- Name: Document_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Document_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Document_Id_seq" OWNER TO postgres;

--
-- Name: Document_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Document_Id_seq" OWNED BY public."Document"."Id";


--
-- Name: Expression_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Expression_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Expression_Id_seq" OWNER TO postgres;

--
-- Name: Expression_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Expression_Id_seq" OWNED BY public."Expression"."Id";


--
-- Name: FrontendStep; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FrontendStep" (
    "Id" integer NOT NULL,
    "Title" text,
    "Order" integer NOT NULL
);


ALTER TABLE public."FrontendStep" OWNER TO postgres;

--
-- Name: TABLE "FrontendStep"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."FrontendStep" IS 'Шаг в интерфейсе калькулятора (группировка по страницам)';


--
-- Name: COLUMN "FrontendStep"."Order"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."FrontendStep"."Order" IS 'Порядок отображения';


--
-- Name: FrontendStep_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FrontendStep_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."FrontendStep_Id_seq" OWNER TO postgres;

--
-- Name: FrontendStep_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FrontendStep_Id_seq" OWNED BY public."FrontendStep"."Id";


--
-- Name: Link_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Link_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Link_Id_seq" OWNER TO postgres;

--
-- Name: Link_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Link_Id_seq" OWNED BY public."Link"."Id";


--
-- Name: Organisation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Organisation" (
    "Id" integer NOT NULL,
    "Title" text,
    "Phone" text,
    "Fax" text,
    "Email" text,
    "Address" text,
    "SubregionId" integer NOT NULL,
    "IsByGovernment" boolean DEFAULT true NOT NULL,
    "YandexMapsLink" text,
    "Description" text
);


ALTER TABLE public."Organisation" OWNER TO postgres;

--
-- Name: Organisation_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Organisation_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Organisation_Id_seq" OWNER TO postgres;

--
-- Name: Organisation_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Organisation_Id_seq" OWNED BY public."Organisation"."Id";


--
-- Name: Parameter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Parameter" (
    "Id" integer NOT NULL,
    "FrontendStepId" integer NOT NULL,
    "Title" text,
    "Description" text,
    "ImageUrl" text
);


ALTER TABLE public."Parameter" OWNER TO postgres;

--
-- Name: TABLE "Parameter"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Parameter" IS 'Параметр (напр. этажность)';


--
-- Name: Parameter_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Parameter_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Parameter_Id_seq" OWNER TO postgres;

--
-- Name: Parameter_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Parameter_Id_seq" OWNED BY public."Parameter"."Id";


--
-- Name: Stage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Stage" (
    "Id" integer NOT NULL,
    "Title" text,
    "Order" integer NOT NULL
);


ALTER TABLE public."Stage" OWNER TO postgres;

--
-- Name: TABLE "Stage"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Stage" IS 'Стадия строительства';


--
-- Name: COLUMN "Stage"."Order"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Stage"."Order" IS 'Порядок отображения';


--
-- Name: Subregion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Subregion" (
    "Id" integer NOT NULL,
    "Title" text
);


ALTER TABLE public."Subregion" OWNER TO postgres;

--
-- Name: TABLE "Subregion"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Subregion" IS 'Деление организаций на областные/муниципальные/городские и др';


--
-- Name: ProcedureResultPreview; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public."ProcedureResultPreview" AS
 SELECT pr."Id" AS "ProcedureId",
    o."Id" AS "OrganisationId",
    ((o."Title" || ' по '::text) || r."Title") AS "OrganisationName",
    d."Title" AS "Document",
    ((('['::text || s."Order") || '] '::text) || s."Title") AS "Stage"
   FROM public."Procedure" pr,
    public."Stage" s,
    public."Document" d,
    public."Organisation" o,
    public."Subregion" r
  WHERE ((o."Id" = pr."OrganisationId") AND (s."Id" = pr."StageId") AND (d."Id" = pr."DocumentId") AND (r."Id" = o."SubregionId"));


ALTER TABLE public."ProcedureResultPreview" OWNER TO postgres;

--
-- Name: Procedure_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Procedure_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Procedure_Id_seq" OWNER TO postgres;

--
-- Name: Procedure_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Procedure_Id_seq" OWNED BY public."Procedure"."Id";


--
-- Name: ResultItemView; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public."ResultItemView" AS
 SELECT p."StageId",
    p."Id" AS "ProcedureId",
    p."Title" AS "ProcedureName",
    o."Id" AS "OrganisationId",
    o."Title" AS "OrganisationName",
    p."PerformingTime",
    d."Title" AS "DocumentName",
    p."IsTimeByCalendar"
   FROM public."Procedure" p,
    public."Document" d,
    public."Organisation" o
  WHERE ((d."Id" = p."DocumentId") AND (o."Id" = p."OrganisationId"));


ALTER TABLE public."ResultItemView" OWNER TO postgres;

--
-- Name: Stage_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Stage_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Stage_Id_seq" OWNER TO postgres;

--
-- Name: Stage_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Stage_Id_seq" OWNED BY public."Stage"."Id";


--
-- Name: Subregion_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Subregion_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Subregion_Id_seq" OWNER TO postgres;

--
-- Name: Subregion_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Subregion_Id_seq" OWNED BY public."Subregion"."Id";


--
-- Name: Choice Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Choice" ALTER COLUMN "Id" SET DEFAULT nextval('public."Choice_Id_seq"'::regclass);


--
-- Name: Document Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document" ALTER COLUMN "Id" SET DEFAULT nextval('public."Document_Id_seq"'::regclass);


--
-- Name: Expression Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expression" ALTER COLUMN "Id" SET DEFAULT nextval('public."Expression_Id_seq"'::regclass);


--
-- Name: FrontendStep Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FrontendStep" ALTER COLUMN "Id" SET DEFAULT nextval('public."FrontendStep_Id_seq"'::regclass);


--
-- Name: Link Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link" ALTER COLUMN "Id" SET DEFAULT nextval('public."Link_Id_seq"'::regclass);


--
-- Name: Organisation Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organisation" ALTER COLUMN "Id" SET DEFAULT nextval('public."Organisation_Id_seq"'::regclass);


--
-- Name: Parameter Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parameter" ALTER COLUMN "Id" SET DEFAULT nextval('public."Parameter_Id_seq"'::regclass);


--
-- Name: Procedure Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Procedure" ALTER COLUMN "Id" SET DEFAULT nextval('public."Procedure_Id_seq"'::regclass);


--
-- Name: Stage Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stage" ALTER COLUMN "Id" SET DEFAULT nextval('public."Stage_Id_seq"'::regclass);


--
-- Name: Subregion Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subregion" ALTER COLUMN "Id" SET DEFAULT nextval('public."Subregion_Id_seq"'::regclass);


--
-- Data for Name: Choice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Choice" ("Id", "Title", "ParameterId", "Selected") FROM stdin;
2	Среднеэтажный жилой дом	1	f
3	Многоэтажный жилой дом	1	f
4	Линейные объекты	1	f
5	Производственного или коммерческого назначения	1	f
7	Для производственной деятельности	2	f
8	Не для проживания граждан и производственной деятельности	2	f
14	Район	5	f
16	Право собственности	6	f
21	Нет	8	f
31	Нет	13	f
33	Нет	14	f
35	Нет	15	f
37	Нет	16	f
39	Нет	17	f
41	Нет	18	f
43	Нет	19	f
45	Негосударственная экспертиза	20	f
46	Не предполагается	20	f
48	Не предполагается	21	f
50	Нет	22	f
51	Предполагается	23	f
29	Собственные средства	12	f
1	Малоэтажный жилой дом: жилой дом с количеством этажей не более чем три, состоящие из нескольких блоков, количество которых не превышает десять и каждый из которых предназначен для проживания одной семьи	1	t
55	Соглашение об установлении сервитута, решение об установлении публичного сервитута	6	f
28	Средства бюджета (городского, муниципального, областного, федерального)	12	t
44	Государственная экспертиза	20	t
30	Да	13	t
36	Да	16	t
32	Да	14	t
34	Да	15	t
38	Да	17	t
40	Да	18	t
42	Да	19	t
6	Для проживания граждан	2	t
9	Не более 1500м2	3	t
20	Да	8	t
52	Не предполагается	23	t
49	Да	22	t
15	Город	5	t
17	Право аренды	6	t
47	Предполагается	21	t
57	Объект требует установления санитарно-защитных зон	10	f
26	Объект в границе зоны	11	f
23	Объект не в границе зоны	9	t
25	Объект не в границе зоны	10	t
22	Объект в границе зоны	9	f
27	Объект не в границе зоны	11	t
24	Объект в границе зоны	10	f
53	Более 1500м2	3	f
54	ИЖС	1	f
18	Предполагается	7	f
19	Не предполагается	7	t
12	до 4-х этажей	4	f
13	не выше 8 этажей	4	f
58	9 и выше	4	f
10	не более 2-х этажей	4	f
11	не более 3-х этажей	4	t
\.


--
-- Data for Name: Document; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Document" ("Id", "Title") FROM stdin;
1	Градостроительный план земельного участка
2	Договор о технологическом присоединении к электрическим сетям 
3	Договор о подключении (технологического присоединения) к централизованной системе холодного водоснабжения
4	Договор о подключении (технологического присоединения) к централизованным бытовым или общесплавным системам водоотведения
5	Договор о подключении (технологическом присоединении) к сетям газораспределения
6	Договор о подключении (технологическом присоединении) к централизованным ливневой системам водоотведения
7	Договор о подключении (технологическом присоединении) к системе теплоснабжения
8	Договор о подключении (присоединении) к централизованным системам горячего водоснабжения
9	Проектная документация
10	Разрешения на отклонение от предельных параметров разрешенного строительства, реконструкции объектов капитального строительства
11	Уведомление о планируемых строительстве или реконструкции объекта индивидуального жилищного строительства
12	Постановление Администрации о присвоении адреса объекту адресации или аннулировании адреса
13	Разрешения на осуществление земляных работ  
14	Порубочный билет
15	Положительное заключение государственной экспертизы результатов инженерных изысканий и проектной документации
16	Положительное заключение экспертизы результатов инженерных изысканий и проектной документации
17	Разрешение на строительство
18	Разрешение на ввод объекта в эксплуатацию
19	Выписка из ЕГРН
20	Технический план
21	Постановление Администрации о согласовании архитектурно-градостроительного облика объекта
22	Заключение государственной экологической экспертизы
23	Правоустанавливающие документы на земельный участок
24	Копия решения об установлении или изменении зоны с особыми условиями использования территории
25	Проект планировки и проекта межевания территорий
\.


--
-- Data for Name: Expression; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Expression" ("Id", "ChoiceId", "ProcedureId") FROM stdin;
162	57	28
163	19	29
164	27	17
165	54	11
27	27	27
166	44	15
167	45	16
84	18	9
85	20	10
101	47	13
102	49	12
103	51	14
104	51	19
105	52	19
106	51	20
107	52	20
108	51	21
109	52	21
110	51	18
111	52	18
112	51	22
113	52	22
139	16	27
140	17	27
141	55	27
144	32	2
145	30	3
146	19	1
148	34	4
149	36	5
150	38	6
151	40	7
152	42	8
153	19	26
\.


--
-- Data for Name: FrontendStep; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FrontendStep" ("Id", "Title", "Order") FROM stdin;
1	Параметры планируемого объекта	1
4	Инженерно-техническое обеспечение	4
5	Параметры строительства	5
2	Подготовка проектной документации	2
3	Зоны с особыми условиями использования территории	3
\.


--
-- Data for Name: Link; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Link" ("Id", "ChS", "ChE") FROM stdin;
199	1	19
200	2	19
201	3	19
202	5	19
203	54	19
204	7	8
206	1	11
207	2	13
208	3	58
209	54	12
215	5	10
216	45	46
168	1	6
169	2	6
170	3	6
241	1	27
242	2	27
243	3	27
244	4	27
245	5	27
250	1	26
175	4	8
176	8	53
251	2	26
252	3	26
179	5	7
180	54	6
177	29	45
253	4	26
254	5	26
255	54	26
194	4	18
\.


--
-- Data for Name: Organisation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Organisation" ("Id", "Title", "Phone", "Fax", "Email", "Address", "SubregionId", "IsByGovernment", "YandexMapsLink", "Description") FROM stdin;
5	Самостоятельно застройщиком или с привлечением проектной организации	-	-	-	-	3	f	\N	\N
2	Администрация города Тамбова	(4752) 79‑03-08	\N	post@cityadm.tambov.gov.ru	г.Тамбов, ул.Коммунальная, 6	1	t	CCwIFXlN	\N
1	Управление градостроительства и архитектуры области	(4752) 78-27-66	(4752) 78-27-60	post@archit.tambov.gov.ru	г.Тамбов, ул.Ленинградская, 1А 	2	t	CCwIQS30	\N
3	АО «Тамбовская сетевая компания»	(4752) 71-94-79	(4752) 71-97-08	priem@oaotsk.ru	г.Тамбов, ул. Пирогова, 22А	1	f	CCwIJV0d	\N
10	Кадастровый инженер	-	-	-	-	3	f	\N	\N
7	Тамбовское областное государственное автономное учреждение «Центр государственной экспертизы документов  в области  градостроительной деятельности» (ТОГАУ «Тамбовгосэкспериза»)	(4752)71-95-96	(4752)71-95-96	 gge_tambov@mail.ru, gge-tambov9@yandex.ru	г.Тамбов, ул.М.Горького, 129а	2	t	CCwIRN3m	\N
4	Филиал АО «Газпром газораспределение Тамбов»	(4752) 79-09-10	(4752) 72-45-65	-	г. Тамбов, ул. Московская, д. 19Д	1	f	CCwIREi2	\N
9	Федеральная служба государственной регистрации, кадастра и картографии	(4752) 72-80-02	(4752) 72-76-26	68_upr@rosreestr.ru	г.Тамбов, ул.Сергея Рахманинова, 1А	2	t	\N	\N
8	Организация, аккредитованных на право проведения негосударственной экспертизы проектной документации и результатов инженерных изысканий	-	-	-	-	3	f	\N	\N
6	Проектная организация	-	-	-	-	3	f	\N	\N
12	Управление по государственной охране объектов культурного наследия Тамбовской области	(4752) 78‑28-82	(4752) 78-28-74	post@pam.tambov.gov.ru	г.Тамбов, ул.Советская, 106А	1	t	CCwIV0Iz	\N
11	Управление по охране окружающей среды и природопользованию Тамбовской области	(4752) 79-14-42		post@opr.tambov.gov.ru	г.Тамбов, ул.Базарная, д.104	1	t	CCwIVR-s	\N
\.


--
-- Data for Name: Parameter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Parameter" ("Id", "FrontendStepId", "Title", "Description", "ImageUrl") FROM stdin;
17	4	Подключение (технологического присоединения) к централизованным ливневой системам водоотведения	\N	http://archit.tmbreg.ru/assets/files/news/calculator/LivSisVodoot.png
16	4	Подключение (технологическое присоединение) к сетям газораспределения	\N	http://archit.tmbreg.ru/assets/files/news/calculator/gas.png
3	1	Общая площадь планируемого объекта	\N	http://archit.tmbreg.ru/assets/files/news/calculator/Plos.png
15	4	Подключение (технологическое присоединение) к централизованным бытовым или общесплавным системам водоотведения	\N	http://archit.tmbreg.ru/assets/files/news/calculator/ObcespSisVodoot.png
2	1	Назначение планируемого объекта	\N	http://archit.tmbreg.ru/assets/files/news/calculator/Nazn.jpg
14	4	Подключение (технологическое присоединение) к цетрализованной системе холодного водоснабжения	\N	http://archit.tmbreg.ru/assets/files/news/calculator/HolodVodos.png
13	4	Технологическое присоединение к электрическим сетям	\N	http://archit.tmbreg.ru/assets/files/news/calculator/ElecSet.png
1	1	Тип планируемого объекта		http://archit.tmbreg.ru/assets/files/news/calculator/tip1.png
5	2	Местоположение планируемого объекта строительства	\N	http://archit.tmbreg.ru/assets/files/news/calculator/mestopol1.png
4	1	Этажность	\N	http://archit.tmbreg.ru/assets/files/news/calculator/Etagnost.jpg
6	2	Право на земельный участок	\N	http://archit.tmbreg.ru/assets/files/news/calculator/pravo2.png
7	2	Подготовка документации по планировке территории	\N	http://archit.tmbreg.ru/assets/files/news/calculator/planTerr.png
10	3	Установление санитарно-защитных зон	\N	http://archit.tmbreg.ru/assets/files/news/calculator/SanitZon.png
19	4	Подключение (присоединение) к централизованным системам горячего водоснабжения	\N	http://archit.tmbreg.ru/assets/files/news/calculator/GorychVodosn.PNG
18	4	Подключение (технологическое присоединение) к системам теплоснабжения	\N	http://archit.tmbreg.ru/assets/files/news/calculator/teplosnab.png
11	3	Зоны охраны объектов культурного наследия	\N	http://archit.tmbreg.ru/assets/files/news/calculator/KulNasl.png
8	2	Отклонение от предельных параметров разрешенного строительства	 Выдача разрешения на отклонение от предельных параметров разрешенного строительства осуществляется администрацией городского округа (городского или сельского поселения в соответствии с административным регламентом предоставления муниципальной услуги, принятым органом местного самоуправления по месту нахождения земельного участка. Процедура предусматривает проведение публичных слушаний в соответствии с правовыми актами муниципального образования.	http://archit.tmbreg.ru/assets/files/news/calculator/otkl.png
12	5	Источник финансирования	\N	http://archit.tmbreg.ru/assets/files/news/calculator/IstochFin.png
9	3	Защитные зоны объектов культурного наследия	\N	http://archit.tmbreg.ru/assets/files/news/calculator/OhranZon.png
23	5	Вырубка или пересадка деревьев	\N	http://archit.tmbreg.ru/assets/files/news/calculator/VirubDerev.png
22	5	Присвоение адреса объекту адресации	\N	http://archit.tmbreg.ru/assets/files/news/calculator/PrisAddresa.png
20	5	Предполагается ли экспертиза проектной документации и результатов инженерных изысканий	\N	http://archit.tmbreg.ru/assets/files/news/calculator/ExpProektDoc.png\r\n
21	5	Осуществление земляных работ	\N	http://archit.tmbreg.ru/assets/files/news/calculator/ZemRabot.png
\.


--
-- Data for Name: Procedure; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Procedure" ("Id", "OrganisationId", "DocumentId", "StageId", "PerformingTime", "IsTimeByCalendar", "Title") FROM stdin;
1	2	1	1	20	f	Выдача градостроительного плана земельного участка
10	1	10	2	60	f	Предоставление разрешения на отклонение от предельных параметров разрешенного строительства, реконструкции объектов капитального строительства
11	1	11	3	\N	t	Направление уведомление о планируемых строительстве или реконструкции объекта индивидуального жилищного строительства
14	2	14	3	10	f	Выдача порубочного билета
13	2	13	3	7	f	Предоставление разрешения на осуществление земляных работ
12	2	12	3	18	f	Присвоение адреса объекту адресации или аннулирование адреса
7	3	7	1	14	t	Заключение договора о подключении (технологическом присоединении) к системе теплоснабжения
4	3	3	1	14	t	Заключение договора о подключении (технологического присоединения) к централизованным бытовым или общесплавным системам водоотведения
5	3	4	1	14	t	Заключение договора о подключении (технологическом присоединении) к сетям газораспределения
2	3	2	1	14	t	Заключение договора о подключении (технологического присоединения) к централизованной системе холодного водоснабжения
3	3	5	1	30	t	Заключение договора о технологическом присоединении к электрическим сетям
6	3	6	1	30	t	Заключение договора о подключении (технологическом присоединении) к централизованным ливневой системам водоотведения
8	3	8	1	30	t	Заключение договора о подключении (присоединении) к централизованным системам горячего водоснабжения
17	1	17	3	7	f	Выдача разрешения на строительство
19	1	18	5	7	f	Выдача разрешения на ввод объекта в эксплуатацию
18	10	20	5	\N	t	Получение технических планов на здание или наружные коммуникации
20	9	19	5	5	f	Постановка на кадастровый учет
21	9	19	5	7	f	Государственная регистрация права собственности на объект недвижимого имущества
16	8	16	3	\N	t	Проведение негосударственной экспертизы проектной документации и результатов инженерных изысканий
23	12	17	3	10	f	Выдача разрешения на строительство, если при проведении работ по сохранению объекта культурного наследия затрагиваются конструктивные и другие характеристики надежности и безопасности такого объекта
25	11	22	3	90	f	Проведение государственной экологической экспертизы объектов регионального уровня
22	9	19	5	10	f	Государственный кадастровый учет и государственная регистрация прав
26	2	21	2	13	f	Предоставление решения о согласовании архитектурно-градостроительного облика объекта
24	11	17	3	10	f	Подготовка и выдача разрешения на строительство, реконструкцию объекта капитального строительства, реконструкцию которого планируется осуществлять в границах особо охраняемых природных территорий регионального значения
9	6	9	1	\N	t	Разработка проектной документации
28	10	24	3	\N	t	Решение об установлении зоны с особыми условиями использования территории
29	1	25	1	85	t	Принятие решения о подготовке документации по планировке территории и утверждение документации по планировке территории
27	9	23	1	7	t	Регистрация права на землю
15	7	15	3	63	t	Проведение государственной экспертизы результатов инженерных изысканий и проектной документации
\.


--
-- Data for Name: Stage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Stage" ("Id", "Title", "Order") FROM stdin;
1	ПРЕДВАРИТЕЛЬНАЯ ПОДГОТОВКА 	1
2	ПРОЕКТИРОВАНИЕ	2
3	ПОДГОТОВКА К СТРОИТЕЛЬСТВУ	3
5	ВВОД ОБЪЕКТА В ЭКСПЛУАТАЦИЮ 	5
4	СТРОИТЕЛЬНО-МОНТАЖНЫЕ РАБОТЫ И ПОДКЛЮЧЕНИЕ К ИНЖЕНЕРНЫМ СЕТЯМ 	4
\.


--
-- Data for Name: Subregion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Subregion" ("Id", "Title") FROM stdin;
1	г.Тамбов
2	Тамбовская обл
3	Не определен
\.


--
-- Name: Choice_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Choice_Id_seq"', 9, true);


--
-- Name: Document_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Document_Id_seq"', 25, true);


--
-- Name: Expression_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Expression_Id_seq"', 167, true);


--
-- Name: FrontendStep_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FrontendStep_Id_seq"', 5, true);


--
-- Name: Link_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Link_Id_seq"', 255, true);


--
-- Name: Organisation_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Organisation_Id_seq"', 11, true);


--
-- Name: Parameter_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Parameter_Id_seq"', 1, false);


--
-- Name: Procedure_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Procedure_Id_seq"', 30, true);


--
-- Name: Stage_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Stage_Id_seq"', 5, true);


--
-- Name: Subregion_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Subregion_Id_seq"', 3, true);


--
-- Name: FrontendStep "BuildSteps"_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FrontendStep"
    ADD CONSTRAINT """BuildSteps""_pk" PRIMARY KEY ("Id");


--
-- Name: Choice "Choice"_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Choice"
    ADD CONSTRAINT """Choice""_pk" PRIMARY KEY ("Id");


--
-- Name: Document "Document"_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT """Document""_pk" PRIMARY KEY ("Id");


--
-- Name: Expression "Expression"_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expression"
    ADD CONSTRAINT """Expression""_pk" PRIMARY KEY ("Id");


--
-- Name: Organisation "Organisation"_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organisation"
    ADD CONSTRAINT """Organisation""_pk" PRIMARY KEY ("Id");


--
-- Name: Parameter "Parameter"_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parameter"
    ADD CONSTRAINT """Parameter""_pk" PRIMARY KEY ("Id");


--
-- Name: Procedure "Procedure"_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Procedure"
    ADD CONSTRAINT """Procedure""_pk" PRIMARY KEY ("Id");


--
-- Name: Stage "Stage"_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stage"
    ADD CONSTRAINT """Stage""_pk" PRIMARY KEY ("Id");


--
-- Name: Subregion "Subregion"_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subregion"
    ADD CONSTRAINT """Subregion""_pk" PRIMARY KEY ("Id");


--
-- Name: Expression Expression_ChoiceId_ProcedureId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expression"
    ADD CONSTRAINT "Expression_ChoiceId_ProcedureId_key" UNIQUE ("ChoiceId", "ProcedureId");


--
-- Name: FrontendStep FrontendStep_Order_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FrontendStep"
    ADD CONSTRAINT "FrontendStep_Order_key" UNIQUE ("Order");


--
-- Name: Link Link_ChS_ChE_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link"
    ADD CONSTRAINT "Link_ChS_ChE_key" UNIQUE ("ChS", "ChE");


--
-- Name: Link Link_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link"
    ADD CONSTRAINT "Link_pk" PRIMARY KEY ("Id");


--
-- Name: Stage Stage_Order_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stage"
    ADD CONSTRAINT "Stage_Order_key" UNIQUE ("Order");


--
-- Name: choice_parameterid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX choice_parameterid_index ON public."Choice" USING btree ("ParameterId");


--
-- Name: expression_choiceid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expression_choiceid_index ON public."Expression" USING btree ("ChoiceId");


--
-- Name: expression_procedureid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expression_procedureid_index ON public."Expression" USING btree ("ProcedureId");


--
-- Name: link_che_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX link_che_index ON public."Link" USING btree ("ChE");


--
-- Name: link_chs_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX link_chs_index ON public."Link" USING btree ("ChS");


--
-- Name: organisation_subregionid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX organisation_subregionid_index ON public."Organisation" USING btree ("SubregionId");


--
-- Name: parameter_frontendstepid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX parameter_frontendstepid_index ON public."Parameter" USING btree ("FrontendStepId");


--
-- Name: procedure_organisationid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX procedure_organisationid_index ON public."Procedure" USING btree ("OrganisationId");


--
-- Name: procedure_stageid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX procedure_stageid_index ON public."Procedure" USING btree ("StageId");


--
-- Name: Choice choice_parameter_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Choice"
    ADD CONSTRAINT choice_parameter_id_fk FOREIGN KEY ("ParameterId") REFERENCES public."Parameter"("Id") ON DELETE CASCADE;


--
-- Name: Expression expression_choice_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expression"
    ADD CONSTRAINT expression_choice_id_fk FOREIGN KEY ("ChoiceId") REFERENCES public."Choice"("Id") ON DELETE CASCADE;


--
-- Name: Expression expression_procedure_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expression"
    ADD CONSTRAINT expression_procedure_id_fk FOREIGN KEY ("ProcedureId") REFERENCES public."Procedure"("Id") ON DELETE CASCADE;


--
-- Name: Link link_che_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link"
    ADD CONSTRAINT link_che_fk FOREIGN KEY ("ChE") REFERENCES public."Choice"("Id") ON DELETE CASCADE;


--
-- Name: Link link_chs_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link"
    ADD CONSTRAINT link_chs_fk FOREIGN KEY ("ChS") REFERENCES public."Choice"("Id") ON DELETE CASCADE;


--
-- Name: Organisation organisation_subregion_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organisation"
    ADD CONSTRAINT organisation_subregion_id_fk FOREIGN KEY ("SubregionId") REFERENCES public."Subregion"("Id") ON DELETE CASCADE;


--
-- Name: Parameter parameter_buildstep_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parameter"
    ADD CONSTRAINT parameter_buildstep_id_fk FOREIGN KEY ("FrontendStepId") REFERENCES public."FrontendStep"("Id");


--
-- Name: Procedure procedure_document_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Procedure"
    ADD CONSTRAINT procedure_document_id_fk FOREIGN KEY ("DocumentId") REFERENCES public."Document"("Id") ON DELETE CASCADE;


--
-- Name: Procedure procedure_organisation_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Procedure"
    ADD CONSTRAINT procedure_organisation_id_fk FOREIGN KEY ("OrganisationId") REFERENCES public."Organisation"("Id") ON DELETE CASCADE;


--
-- Name: Procedure procedure_stage_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Procedure"
    ADD CONSTRAINT procedure_stage_id_fk FOREIGN KEY ("StageId") REFERENCES public."Stage"("Id") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

