--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

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
-- Name: biography; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.biography (
    content_md text,
    last_edit_timestamp bigint,
    last_edit_username text
);


ALTER TABLE public.biography OWNER TO postgres;

--
-- Name: email; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.email (
    username text,
    password text
);


ALTER TABLE public.email OWNER TO postgres;

--
-- Name: imagegallery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imagegallery (
    name text,
    description text,
    filename text,
    id integer NOT NULL
);


ALTER TABLE public.imagegallery OWNER TO postgres;

--
-- Name: imagegallery_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.imagegallery ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.imagegallery_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 300000000
    CACHE 1
    CYCLE
);


--
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    name text,
    director text,
    "coActors" text[],
    "releaseDate" bigint,
    languages text[],
    description text,
    "ticketLinks" text[],
    "actorRole" text,
    filename text
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.movies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.movies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tvshows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tvshows (
    id integer NOT NULL,
    name text,
    director text,
    "coActors" text[],
    "releaseDate" bigint,
    languages text[],
    description text,
    tv_channels text[],
    streaming_services text[],
    "actorRole" text,
    filename text
);


ALTER TABLE public.tvshows OWNER TO postgres;

--
-- Name: tvshows_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tvshows ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tvshows_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username text,
    password text,
    type text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: biography; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.biography (content_md, last_edit_timestamp, last_edit_username) FROM stdin;
Medeea Marinescu is a Romanian actress who has made many films in Romania but also in France!\n\nHer first role came in 1977 when she was only 3 years old in Mercea Moldovan's Duckling Winter. Since then, Medeea has been filming in Romania.\n\nBetween 1977 and 2006, she played in some twenty films in her native country, and at the age of 11 she received the award for best actress from the Romanian Film Association, and in 2004 the Order of the Star of Romania for cultural merit. Two years later, in 2006, she was decorated with the Order Steaua României to the rank of Cavalier by the President of Romania. In 2015, she was appointed Climate Ambassador and in 2017, she became a Chevalier of the French National Order of Merit.\n\nShe trained as a musician, first in a music high school in Bucharest and then in a jazz school. She then trained in theatre at the prestigious Bucharest Academy of Theatre and Film.\n\nShortly before the year 2000, she began a series of collaborations with France, including two films by Isabelle Mergault (Je vous trouve très beau (2005) and Donnant donnant (2010)), which revealed her to the general public in French.\n\nToday, aged 47, Medeea Marinescu is still active on the screen.	1652375021493	admin
\.


--
-- Data for Name: email; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.email (username, password) FROM stdin;
medeeamarinescuwebsite@gmail.com	Xq;$fYr4UCW>wwH
\.


--
-- Data for Name: imagegallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.imagegallery (name, description, filename, id) FROM stdin;
Photo 9	Tournage donnant donnant	Photo9.jpg-1652257251184.jpeg	20
Photo 10	Tournage donnant donnant	Photo10.jpg-1652257257699.jpeg	21
Photo 11	Tournage donnant donnant	Photo11.jpg-1652257268563.jpeg	22
Photo 12	Tournage donnant donnant	Photo12.jpg-1652257279025.jpeg	23
Photo 13	Tournage donnant donnant	Photo13.jpg-1652257288459.jpeg	24
Photo 14	Tournage donnant donnant	Photo14.jpg-1652257297031.jpeg	25
Photo 15	Tournage donnant donnant	Photo15.jpg-1652257307052.jpeg	26
Photo 16	Portrait	Photo16.jpg-1652257328200.jpeg	27
Photo 17	Portrait	Photo17.jpg-1652257341193.jpeg	28
Photo 18	Portrait	Photo18.jpg-1652257345783.jpeg	29
Photo 19	Portrait	Photo19.jpg-1652257355882.jpeg	30
Photo 20	Portrait	Photo20.jpg-1652257367826.jpeg	31
Photo 21	Portrait	Photo21.jpg-1652257390596.jpeg	32
Photo 22	Portrait	Photo22.jpg-1652257395311.jpeg	33
Photo 23	Journal	Photo23.jpg-1652257415532.jpeg	34
Photo 24	Journal	Photo24.jpg-1652257433043.jpeg	35
Photo 25	Journal	Photo25.jpg-1652257440583.jpeg	36
Photo 26	Journal	Photo26.jpg-1652257448777.jpeg	37
Photo 27	Journal	Photo27.jpg-1652257458473.jpeg	38
Photo 28	Journal	Photo28.jpg-1652257467859.jpeg	39
Photo 29	Journal	Photo29.jpg-1652257476058.jpeg	40
Photo 30	Journal	Photo30.jpg-1652257484630.jpeg	41
Photo 31	Débuts	Photo31.jpg-1652257496601.jpeg	42
Photo 32	/	Photo32.jpg-1652257510984.jpeg	43
Photo 33	/	Photo33.png-1652257525733.png	44
Photo 34	/	Photo34.png-1652257536174.png	45
Photo 35	/	Photo35.png-1652257543332.png	46
Photo 36	/	Photo36.png-1652257550094.png	47
Photo 37	/	Photo37.png-1652257558667.png	48
Photo 38	/	Photo38.jpg-1652257568694.jpeg	49
Photo 2	Tournage Donnant donnant	Photo2.png-1652257159272.png	13
Photo 3	Tournage Donnant donnant	Photo3.png-1652257171372.png	14
Photo 4	Tournage Donnant donnant	Photo4.png-1652257177557.png	15
Photo 5	Tournage Donnant donnant	Photo5.png-1652257196445.png	16
Photo 6	Tournage Donnant donnant	Photo5.png-1652257196445.png	17
Photo 7	Tournage Donnant donnant	Photo7.png-1652257221574.png	18
Photo 8	Tournage Donnant donnant	Photo8.jpg-1652257228620.jpeg	19
Photo 1	Tournage Donnant donnant	Photo1.png-1652257130278.png	12
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, name, director, "coActors", "releaseDate", languages, description, "ticketLinks", "actorRole", filename) FROM stdin;
27	Weekend with my mother (Weekend cu mama)	Stere Gulea	{"Adela Popescu","Tudor Istodor","Ion Sapdaru"}	1237507200000	{RO}	Il y a 15 ans, Luiza a décidé de prendre un nouveau départ en Espagne. Elle a laissé sa fille Cristina, âgée de 3 ans, aux soins de ses proches et a décollé. Quand elle retourne en Roumanie, la femme apprend des vérités choquantes qui lui ont été cachées : Cristina s’est enfuie de chez elle, est toxicomane et a une fillette de 2 ans qui vit dans un orphelinat. Submergée par la culpabilité, Luiza tente de sauver sa fille et ainsi racheter les erreurs de sa jeunesse. Pour ce faire, elle a un délai serré : un week-end...	{}	Luiza	MV5BOTM3YWY5ODAtM2I5My00MWIyLTgxZjMtODk1MmUzYTY5NjRkXkEyXkFqcGdeQXVyMjQ1MzcwMDM@._V1_.jpg-1652193536939.jpeg
21	Maria, Mirabella	Natalya Bodyul, Ion Popescu-Gopo	{"Gilda Manolescu","Ingrid Celia"}	377740800000	{RO}	Deux petites filles - Maria et Mirabella - se promènent dans les bois et rencontrent plusieurs personnages magiques, parmi lesquels une grenouille aux pieds gelés dans la glace, un ver de feu dont les chaussures prennent feu et un papillon qui a peur de voler. Pour aider leurs nouveaux amis, les filles doivent les porter à une sorcière qui vit au fond de la forêt	{}	Mirabella	Maria, mirabella.jpg-1652191637759.jpeg
16	Je vous trouve très beau	Isabelle Mergault	{"Wladimir Yordanoff","Eva Darlan"}	1165795200000	{FR}	Aymé Pigrenet vient de perdre sa femme. Il n'est pas submergé par le chagrin, mais anéanti par le travail qu'il va devoir désormais effectuer tout seul à la ferme.Très vite, Aymé s'aperçoit qu'il ne peut pas s'en sortir. Il doit impérativement trouver une autre femme. Mais dans ce village, la chose n'est pas facile. Aymé décide alors de faire appel à une agence matrimoniale. Contrairement aux autres "clients", il ne recherche pas l'âme soeur mais seulement une femme solide, bien plantée sur ses deux jambes, susceptible de le seconder à la ferme. Comprenant qu'il ne recherche pas l'affectif mais l'utile, la directrice de l'agence propose à Aymé de se rendre en Roumanie où là, les filles sont prêtes à tout pour quitter la misère dans laquelle elles vivent.Et c'est effectivement en Roumanie, qu'Aymé va rencontrer Elena.	{}	Elena	image15.png-1652189429842.png
14	Donnant Donnant	Isabelle Mergault	{"Daniel Auteuil","Sabine Azéma"}	1286323200000	{FR}	Constant est incarcéré après avoir commis un crime. Selon lui, ce n'était qu'un accident. Victime d'un accident vasculaire cérébral, il réussit à s'évader de l'hôpital. Après s'être réfugié sur une péniche abandonnée, il rencontre Silvia, une jeune femme qui identifie le fugitif. Pensant que Constant est un tueur professionnel, elle lui propose un marché : il doit assassiner Jeanne, sa mère adoptive dépressive dont elle convoite l'héritage, ou elle le livrera à la police. Constant accepte cette offre mais à défaut de tuer Jeanne, il la sauve d'une tentative de suicide.	{}	Silvia	image4.png-1652188931378.png
22	Quaranteen	Florin Babei	{"Maruca Baiasu","Vlad Durtuna","Bodan Iancu"}	1609459200000	{RO}	Matei est un adolescent insouciant qui s'amuse, enfreignant les règles de la pandémie. Son monde bascule lorsqu'il apprend la mort de son grand-père, qu'il a infecté par le COVID-19.	{}	Mama	Capture d’écran 2022-05-10 à 16.23.32.png-1652192623837.png
18	Second Voice (Vocea a doua)	Daniel Sandu	{}	1356998400000	{RO}	Gabi, assistante sociale dans un foyer d'accueil à Bucarest, organise la fête de Noël pour les enfants. Elle reçoit la visite d'une gitane, mère de deux frères placés en famille d'accueil, qui souhaite les ramener chez elle pour les fêtes. Soupçonnant que la mère ne veuille emmener ses enfants que pour les envoyer mendier dans la rue, Gabi doit décider de les laisser à leur mère ou de les éloigner d'elle.	{}	Gabi	Second Voice.png-1652190104689.png
17	Le lit de Procuste	Viorica Mesinã	{"Oleg Yankovskiy"," Petru Vutcarau","Maia Morgenstern"}	1012521600000	{RO}	George Ladima, poète et journaliste de renom, aime Emilia, une actrice qu'il aide dans sa carrière, mais qui profite de lui. Il se suicide et dans sa poche se trouve une note d'amour à une Mme T	{}	Mouthy	image19.png-1652189901645.png
23	Michelangelo	Anghel Damian	{"Luca Dascalescu-Marinescu","Emanuel Parvu"}	1527638400000	{RO}	Un père est forcé d’avoir l’une des conversations les plus cruciales de la parentalité : le discours sur la mort.	{}	Marta	Capture d’écran 2022-05-10 à 16.27.09.png-1652192851619.png
24	A Random Act of Kindness (O Fapta Buna)	Andrei Gruzniczki	{"Liliana Ghita","Nicoleta Lefter","Adjan Titieni"}	1433116800000	{RO}	Veille de Noël. Jeune couple en détresse. Il la harcèle pour chaque petite chose. Elle aperçoit un chien blessé errant. Ils essaient de faire ce qu'il faut. Cela les hantera pour le reste de leur vie. 	{}	/	images.jpeg-1652193022853.jpeg
25	Zavera	Andrei Guzscniczki	{"Dorian Boguta","Serban Pavlu","Ioana Flora"}	1574985600000	{RO}	Stefan est un homme d’affaires d’âge moyen qui a développé une entreprise de construction avec son ami de toujours, Nic. Après la mort suspecte de Nic, étant sous la pression de reprendre la direction de leur entreprise, Stefan est confronté à une crise existentielle. Au cours des six jours suivant la mort de Nic, Stefan découvre pas à pas des mensonges et de petits compromis liés à Nic et maintenant il doit faire face à eux pour accepter sa nouvelle vie.	{}	Nona	MV5BYjY0MGIyYjQtYWZiMy00NjBhLWJhMDQtMDhjOTAyMjQxYzQ4XkEyXkFqcGdeQXVyNDgxMDU4NTU@._V1_FMjpg_UX1000_.jpg-1652193282883.jpeg
26	03.ByPass	Nap Toader	{"Iona Craciunescu","Irina Dinescu","Tache Florescu"}	1462406400000	{RO}	Au cours d'un quart de nuit, une ambulance d'urgence avec une équipe de trois personnes, un médecin, un ambulancier et un chauffeur, est appelée dans l'appartement d'un vieil homme. L'événement va changer leur vie pour toujours.	{}	Monica	1707863.webp-1652193392496.webp
28	Promesses	Elisabeta Bostan, Virgil Calotescu	{"Maria Ploae","Mircea Diaconu","Ion Caramitru"}	497491200000	{RO}	Des tensions surgissent dans une famille après la découverte que le vrai père d'Oara, une fille de 12 ans, est différent du mari de sa mère. Les choses se compliquent lorsque le père biologique tente en vain de gagner l'affection de la fille.	{}	Oana Petrus	Promisiuni_poster.jpg-1652193608607.jpeg
15	Une femme piégée	Laurent Carcélès	{"Marion Cotillard","Cédrice Chevalme","Jean-Marie Winling"}	1003622400000	{FR}	Pour avoir trompé son mari une seule fois, une jeune femme voit sa vie tourner au cauchemar. La police la croit, en effet, coupable du meurtre de l'homme avec qui elle a passé la nuit.	{}	Arlette	image20.png-1652189159739.png
29	Miss Christina (Domnisoara Christina)	Viorel Sergovici	{"Adrian Pintea","Dragos Pîslaru","Irina Petrescu"}	694224000000	{RO}	La jeune Christina tuée en 1907 est la descendante d'une vieille famille de propriétaires terriens dont les champs se trouvent dans les plaines du Danube. Elle corrompt l'esprit de sa nièce Simina à l'âge de 10 ans, pour s'impliquer dans une relation avec le peintre Egor Paschievici hébergé au manoir. Le film nous présente la famille Moscu, deux filles, Sanda et Simina et la sœur de Mme Moscu, Christina, décédée il y a 30 ans. L'atmosphère de mystère rend Simina piégée dans un rituel spiritualiste lorsque Miss Christina tombe amoureuse de l'un des invités du manoir et tente de le conquérir, d'abord dans les rêves.	{}	Simina	MV5BMjIzMzE2ODI3NF5BMl5BanBnXkFtZTgwNTIwNTY2MDE@._V1_.jpg-1652193818960.jpeg
20	Les saltambique (Saltimbancii)	Elisabeta Bostan	{"Octavian Cotescu","Carmlen Galin","Gina Patrichi"}	370137600000	{RO}	Une famille de cirque rencontre des moments difficiles et des conflits familiaux, mais est mise sous les feux de la rampe grâce à sa rencontre fortuite avec un ourson polaire.	{}	Enfant du cirque	Les saltambique.jpg-1652190755257.jpeg
19	Gardez un œil sur le bonheur	Alexandru Maftei	{"Dragos Pîslaru","Dan Condurache","Dorel Visan"}	662688000000	{RO}	Pas de description disponible	{}	Mihaela	image24.png-1652190624280.png
\.


--
-- Data for Name: tvshows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tvshows (id, name, director, "coActors", "releaseDate", languages, description, tv_channels, streaming_services, "actorRole", filename) FROM stdin;
8	Docteur des mères (doctori de mame)	Peter Kerek, Craig Lines	{"Vlad Zamfirescu"," Eugenia Serban"}	1222819200000	{RO}	Mihnea Zaharescu, Ana Drăgan et Augustin Popa sont les trois actionnaires du bureau privé "Materna", qui est traversé par de nombreuses femmes qui s'apprêtent à devenir mères. Mihnea est un homme ambitieux qui a avancé dans sa carrière, mais il n'est pas complètement heureux car il ne peut pas renoncer aux sentiments qui le lient encore à Mara Manea, son ancien grand amour, qu'il a quitté à cause de sa réticence à démarrer une famille.\nLes cas décrits dans la série sont des situations extrêmes, des défis nés de l'indifférence et de la négligence humaines.	{}	{}	Manea Mara	Doctori DiMama.jpg-1652194853384.jpeg
1	Tuff Money	HBO Europe - Mobra Films	{"Alexandru Papadopol","Christian Bota","Gavril Patru"}	1606003200000	{RO}	Two municipal workers, depressed in a bar, spontaneously joke about being able to rob a bank van, in order to sound big. Trouble starts when their plan is taken at face value by a mobster, who threatens them to actually do the heist.	{TV1,"HBO INT"}	{"HBO Max",Netflix}	Evelina	tuff_money.png-1652194692867.png
6	Questionable : Discutabil	Vlad Zamfirescu	{"Sabina Nadiana Grigoriu","Marius Manole"}	1616803200000	{RO}	Série en ligne pour parler	{}	{YouTube,Facebook}	Demi	Discutabil.jpg-1652193920821.jpeg
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (username, password, type) FROM stdin;
admin	$2b$10$Ylq/i/IaNsU45YCz/Yo9ge5VsdmVEJUNbPqOaXbRF4Sgj4zFrcCL6	admin
\.


--
-- Name: imagegallery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imagegallery_id_seq', 49, true);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 34, true);


--
-- Name: tvshows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tvshows_id_seq', 8, true);


--
-- Name: imagegallery imagegallery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagegallery
    ADD CONSTRAINT imagegallery_pkey PRIMARY KEY (id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: tvshows tvshows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tvshows
    ADD CONSTRAINT tvshows_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

