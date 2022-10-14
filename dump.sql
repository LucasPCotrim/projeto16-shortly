--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT "urls_visitCount_check" CHECK (("visitCount" >= 0))
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '34a487bd-1b5b-4f70-a8d7-be3001c30add', 3, '2022-10-12 03:10:26.335107');
INSERT INTO public.sessions VALUES (4, 'b43e4218-43cc-4dec-9bc3-59c383c6ebd2', 6, '2022-10-14 02:02:16.214741');
INSERT INTO public.sessions VALUES (6, 'c99d9ca4-909f-4875-9097-87cb3da1bdfe', 1, '2022-10-14 02:05:26.883932');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'https://s3.amazonaws.com/www-inside-design/uploads/2019/02/hackerman.png', '3lJi7nGI', 3, 1, '2022-10-12 03:04:44.475373');
INSERT INTO public.urls VALUES (2, 'https://assets-global.website-files.com/5f3c19f18169b62a0d0bf387/60d33be745999ac3353f49bd_KyhyHs_Rlf3kWWoC8Al_C9Y9SZ4dQu_K0fiLIsiCA5Gl8M3Eq77np68PFUgDPd6lKA8EmhKgWs7joHpsQm8upaoIayr4hi6O7Oj3HTzcoVop1HORjy74OdVTZNqFg_mIlfotr0EJ.png', 'OvtOj9HG', 0, 2, '2022-10-12 03:04:44.475373');
INSERT INTO public.urls VALUES (3, 'https://res.cloudinary.com/practicaldev/image/fetch/s--hdBGvvFK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zp7vxtgnlczthk02e51o.png', 'Mhms0XBC', 1, 3, '2022-10-12 03:04:44.475373');
INSERT INTO public.urls VALUES (4, 'https://devs.lol/uploads/2021/12/meme-dev-humor-if-youre-a-programmer-there-is-i-in-for-250.jpg', 'hC4JzZzg', 10, 1, '2022-10-12 03:04:44.475373');
INSERT INTO public.urls VALUES (5, 'https://www.teste.com', 'SR_tZ2ml', 0, 3, '2022-10-12 03:10:40.900236');
INSERT INTO public.urls VALUES (6, 'https://www.teste2.com', '8adWDlXw', 0, 3, '2022-10-12 03:10:44.096282');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Lucas', 'lucaspcotrim@gmail.com', '$2a$10$EqTz4FXwkoSpCO/5t5xY6Ol2IPxEPe/oPDefUSL0ZIP2h63a2fBb2', '2022-10-12 03:04:44.467258');
INSERT INTO public.users VALUES (2, 'VovA3 JuJu', 'vovojuju@hotmail.com', '$2a$10$sd2dL3bMRxmjo0H5YrDfeuncV0oTq.UGqOSqpoKQN6bgP3OJPqJ6i', '2022-10-12 03:04:44.467258');
INSERT INTO public.users VALUES (3, 'Jorel', 'jorel@gmail.com', '$2a$10$ujfXC.0BTTTgx99LMYtZteByZ8q.YEAQjG8Xahi4euqyOuCvck8lC', '2022-10-12 03:04:44.467258');
INSERT INTO public.users VALUES (4, 'IrmA£o do Jorel', 'imraodojorel@gmail.com', '$2a$10$DBQ.rkyiMT5XCcswbN0nW.iaOqhRxA1P7x49YYsbOsny9LRCcyyhy', '2022-10-12 03:04:44.467258');
INSERT INTO public.users VALUES (5, 'Lele', 'lele@gmail.com', '$2a$10$C497wa//SZgDpppYmIy.S.DrRZb.gz.R2PLG623deThOKePkY.Dn.', '2022-10-12 03:04:44.467258');
INSERT INTO public.users VALUES (6, 'TesteFront', 'testefront@gmail.com', '$2b$10$MUs1vqFSGiIhx2rsMiCEMOpRNYfTUZA1jjq6kEZSBDvYH6x9gLcTG', '2022-10-14 02:00:47.323663');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 6, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: sessions sessions_userId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_key" UNIQUE ("userId");


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);