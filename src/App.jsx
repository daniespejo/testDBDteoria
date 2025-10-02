import React, { useState, useMemo } from 'react';
import { BookOpen, AlertCircle, CheckCircle, XCircle, RotateCcw, List, Bookmark, BookmarkCheck, LayoutGrid, Zap, TrendingUp } from 'lucide-react';

const DBDQuizApp = () => {
  const [mode, setMode] = useState('menu');
  const [selectedTopics, setSelectedTopics] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [markedMode, setMarkedMode] = useState(false);

  
  // ------------------------------------------------------------------
  // 1. ESTRUCTURA DE DATOS A RELLENAR (El objeto de Preguntas)
  // ------------------------------------------------------------------
  // Debes llenar este objeto 'questionsData' con todas tus 501 preguntas.
  // La clave (key) del objeto DEBE ser el ID de la pregunta.
  const allQuestionsArray = [
    // --- TEMA 0: Introduction (Preguntas 1-27) ---
  {
    id: 1,
    topic: "0. Introduction",
    question: "PostgreSQL és una base de dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 2,
    topic: "0. Introduction",
    question: "¿Quin NO podem considerar un sinònim?",
    options: { A: "Taula", B: "Registre", C: "Dataset", D: "Fitxer", E: "Relació", F: "Classe" },
    correctAnswer: "B"
  },
  {
    id: 3,
    topic: "0. Introduction",
    question: "¿Quin NO podem considerar un sinònim?",
    options: { A: "Característica", B: "Individu", C: "Registre", D: "Tupla", E: "Fila", F: "Instància" },
    correctAnswer: "A"
  },
  {
    id: 4,
    topic: "0. Introduction",
    question: "¿Quin NO podem considerar un sinònim?",
    options: { A: "Característica", B: "Camp", C: "Atribut", D: "Registre", E: "Columna" },
    correctAnswer: "D"
  },
  {
    id: 5,
    topic: "0. Introduction",
    question: "¿Quin NO és un dels subsistemes d'una organització?",
    options: { A: "Producció", B: "Decisió", C: "Informació", D: "Econòmic" },
    correctAnswer: "D"
  },
  {
    id: 6,
    topic: "0. Introduction",
    question: "¿A quin dels subsistemes d'una organització dona support el subsistema d'informació?",
    options: { A: "Només al de producció", B: "Només al de decisió", C: "A tots dos", D: "A cap dels dos" },
    correctAnswer: "C"
  },
  {
    id: 7,
    topic: "0. Introduction",
    question: "¿Quin és un tipus sistema d'informació operational?",
    options: { A: "DW", B: "OLTP", C: "Machine Learning", D: "OLAP" },
    correctAnswer: "B"
  },
  {
    id: 8,
    topic: "0. Introduction",
    question: "¿Quin tipus de sistema d'informació és orientat a temes?",
    options: { A: "Operational", B: "Decisional" },
    correctAnswer: "B"
  },
  {
    id: 9,
    topic: "0. Introduction",
    question: "¿Quin tipus de sistema d'informació té més usuaris?",
    options: { A: "Decisional", B: "Operational" },
    correctAnswer: "B"
  },
  {
    id: 10,
    topic: "0. Introduction",
    question: "¿Les consultes de quin tipus de sistema d'informació accedeixen, en general, més tuples?",
    options: { A: "Operational", B: "Decisional" },
    correctAnswer: "B"
  },
  {
    id: 11,
    topic: "0. Introduction",
    question: "¿Quin tipus de sistema d'informació utilitza menys fonts de dades?",
    options: { A: "Decisional", B: "Operational" },
    correctAnswer: "B"
  },
  {
    id: 12,
    topic: "0. Introduction",
    question: "¿Quin tipus de sistema d'informació utilitza accedeix dades atòmiques?",
    options: { A: "Operational", B: "Decisional" },
    correctAnswer: "A"
  },
  {
    id: 13,
    topic: "0. Introduction",
    question: "¿Quin tipus de sistema d'informació utilitza principalment dades històriques?",
    options: { A: "Decisional", B: "Operational" },
    correctAnswer: "A"
  },
  {
    id: 14,
    topic: "0. Introduction",
    question: "Un sistema d'informació decisional es considera ...",
    options: { A: "... Read-only", B: "... Write-only", C: "... Read-write" },
    correctAnswer: "A"
  },
  {
    id: 15,
    topic: "0. Introduction",
    question: "¿Quin tipus de sistema d'informació utilitza transaccions?",
    options: { A: "Operational", B: "Decisional" },
    correctAnswer: "A"
  },
  {
    id: 16,
    topic: "0. Introduction",
    question: "¿Per a quin tipus de sistemes d'informació es rellevant el seu rendiment (performance)?",
    options: { A: "Només operacionals", B: "Només decisionals", C: "Tots dos", D: "Cap dels dos" },
    correctAnswer: "C"
  },
  {
    id: 17,
    topic: "0. Introduction",
    question: "¿Quin tipus de sistema d'informació ha de gestionar un volum de dades més gran?",
    options: { A: "Decisional", B: "Operational" },
    correctAnswer: "A"
  },
  {
    id: 18,
    topic: "0. Introduction",
    question: "El disseny dels sistemes decisionals es fa segons ...",
    options: { A: "... Problemes", B: "... Funcionalitats", C: "... Estats", D: "... Temes" },
    correctAnswer: "D"
  },
  {
    id: 19,
    topic: "0. Introduction",
    question: "¿Quin NO és una de les tres fases principals del disseny de bases de dades?",
    options: { A: "Lògic", B: "Captura de requisits", C: "Físic", D: "Conceptual" },
    correctAnswer: "B"
  },
  {
    id: 20,
    topic: "0. Introduction",
    question: "El disseny de la base de dades relacional per a un sistema d'informació segueix els mateixos tres passos, independentment que aquest sigui operacional o decisional.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 21,
    topic: "0. Introduction",
    question: "La diferència en la fase de disseny conceptual d'un sistema operacional i un decisional és que l'operacional utilitza qualsevol estructura de classes i interrelacions, mentre que el decisional utilitza una molt concreta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 22,
    topic: "0. Introduction",
    question: "La diferència en la fase de disseny lògic d'un sistema operacional i un decisional és que el decisional utilitza qualsevol estructura de taules i restriccions d'integritat, mentre que l'operacional utilitza una molt concreta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 23,
    topic: "0. Introduction",
    question: "¿Què és el més rellevant pel disseny de la base de dades?",
    options: { A: "Diagrames de seqüència", B: "Diagrama de classes", C: "Casos d'us", D: "Diagrama d'estats" },
    correctAnswer: "B"
  },
  {
    id: 24,
    topic: "0. Introduction",
    question: "¿En que es basa el disseny de la base de dades?",
    options: { A: "Només amb les dades", B: "Només amb els processos", C: "En les dues coses", D: "En cap de les dues coses" },
    correctAnswer: "C"
  },
  {
    id: 25,
    topic: "0. Introduction",
    question: "És fonamental que l'esquema lògic l'entenguin els usuaris del sistema.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 26,
    topic: "0. Introduction",
    question: "¿Quin dels models ha de ser més expressiu?",
    options: { A: "El conceptual", B: "El lògic", C: "Els dos igual", D: "No importa" },
    correctAnswer: "A"
  },
  {
    id: 27,
    topic: "0. Introduction",
    question: "¿En quina dècada va aparèixer la primera versió de SQL?",
    options: { A: "70s", B: "80s", C: "90s", D: "00s" },
    correctAnswer: "B"
  },

  // --- TEMA 1: Relational Translation - Difficulties, Criteria and Tools (Preguntas 28-67) ---
  {
    id: 28,
    topic: "1. Relational Translation - Difficulties",
    question: "El mètode de disseny que utilitzem NO depèn de la mida de la companyia.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 29,
    topic: "1. Relational Translation - Difficulties",
    question: "El mètode de disseny que utilitzem és diferent si ja existeix una base de dades prèviament o no.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 30,
    topic: "1. Relational Translation - Difficulties",
    question: "¿Quina NO és una alternativa de disseny?",
    options: { A: "Automàtica", B: "Integració de vistes", C: "Manual", D: "Definició de procediments" },
    correctAnswer: "D"
  },
  {
    id: 31,
    topic: "1. Relational Translation - Difficulties",
    question: "¿Quina és la fase de disseny més tardana?",
    options: { A: "Quantificació de volums i freqüències", B: "Consideracions respecte a temps de resposta, concurrència, recuperació y seguretat", C: "Control de rendiment (monitorització i pla d'accés)", D: "Afinació (Tuning)" },
    correctAnswer: "C"
  },
  {
    id: 32,
    topic: "1. Relational Translation - Difficulties",
    question: "Per ajudar-nos a entendre millor les multiplicitats de les associacions, podem dibuixar algunes instàncies i les seves interrelacions.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 33,
    topic: "1. Relational Translation - Difficulties",
    question: "L'esquema lògic de la base de dades, només hauria de permetre instanciacions correctes de l'esquema conceptual.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 34,
    topic: "1. Relational Translation - Difficulties",
    question: "¿Què NO és relativisme semàntic?",
    options: { A: "Dos atributs que representen el mateix valor, però en unitats de mesura diferents", B: "Dues classes del mateix concepte, però amb noms diferents", C: "Dues taules amb dades equivalents, però amb noms diferents", D: "Dos procediments emmagatzemats que fan el mateix, però en llenguatges de programació diferents" },
    correctAnswer: "D"
  },
  {
    id: 35,
    topic: "1. Relational Translation - Difficulties",
    question: "Un atribut d'una classe, es pot representar també mitjançant una associació d'aquesta amb una segona classe.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 36,
    topic: "1. Relational Translation - Difficulties",
    question: "Una especialització mai pot ser equivalent a una aggregació.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 37,
    topic: "1. Relational Translation - Difficulties",
    question: "Parlem de relativisme semàntic només quan els dos (o més) esquemes representen exactament la mateixa realitat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 38,
    topic: "1. Relational Translation - Difficulties",
    question: "Parlem de relativisme semàntic només quan els dos (o més) esquemes contenen exactament el mateix nombre de taules.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 39,
    topic: "1. Relational Translation - Difficulties",
    question: "El valor null és un dels del domini de l'atribut.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 40,
    topic: "1. Relational Translation - Difficulties",
    question: "Utilitzar un zero és equivalent a utilitzar un valor null, sempre que el primer no pertanyi al domini de l'atribut.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 41,
    topic: "1. Relational Translation - Difficulties",
    question: "¿En quin cas NO s'haurien d'utilitzar valor nulls?",
    options: { A: "Per a poder inserir una tupla amb un valor desconegut", B: "Per no haver de tractar casos especials en les funcions d'agregació", C: "Per a poder inserir una tupla amb un valor que mai pot tenir", D: "Per a afegir una columna a una taula que no està buida" },
    correctAnswer: "C"
  },
  {
    id: 42,
    topic: "1. Relational Translation - Difficulties",
    question: "El problema d'utilitzar valors null és que malbaratem espai.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 43,
    topic: "1. Relational Translation - Difficulties",
    question: "¿Quina afirmació es certa?",
    options: { A: "El valor null dividit per zero dona error", B: "Un null igualat amb ell mateix ('NULL=NULL') avalua cert", C: "Un valor null ocupa el mateix espai que qualsevol altra valor", D: "Cap de les anteriors afirmacions és certa" },
    correctAnswer: "D"
  },
  {
    id: 44,
    topic: "1. Relational Translation - Difficulties",
    question: "Les taules de veritat de lògica binària són un subconjunt de les de lògica temària, on simplement eliminem les files i columnes que fan referència a 'Desconegut'.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 45,
    topic: "1. Relational Translation - Difficulties",
    question: "¿Quina afirmació és certa?",
    options: { A: "Una tupla que té un valor null a la clau forana viola la restricció d'integritat", B: "Una tupla que avalua el predicat d'un CHECK a 'desconegut' viola la restricció d'integritat", C: "Una tupla que avalua el predicat del WHERE a 'desconegut' surt al resultat de la consulta", D: "Cap de les anteriors afirmacions és certa" },
    correctAnswer: "D"
  },
  {
    id: 46,
    topic: "1. Relational Translation - Difficulties",
    question: "Si a l'entrada de l'operació algebraica d'unió hi ha dues files que només tenen valor null a tots els seus atributs, a la sortida tindré només una fila.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 47,
    topic: "1. Relational Translation - Difficulties",
    question: "Si a l'entrada de l'operació algebraica d'intersecció hi ha dues files (una a cada taula) que només tenen valor null a tots els seus atributs, a la sortida no apareixerà aquesta fila.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 48,
    topic: "1. Relational Translation - Difficulties",
    question: "Si a l'entrada de l'operació algebraica de diferència hi ha dues files (una a cada taula) que només tenen valor null a tots els seus atributs, a la sortida no apareixerà aquesta fila.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 49,
    topic: "1. Relational Translation - Difficulties",
    question: "Si com a resultat d'una operació algebraica de projecció queda més d'una fila que només te valor null a tots els seus atributs, a la sortida apareixerà aquesta fila tantes vegades com la tingues a l'entrada.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 50,
    topic: "1. Relational Translation - Difficulties",
    question: "¿Quina de les següents expressions dona error en SQL estàndard?",
    options: { A: "0/NULL", B: "NULL/0", C: "NULL/NULL" },
    correctAnswer: "D"
  },
  {
    id: 51,
    topic: "1. Relational Translation - Difficulties",
    question: "El GROUP BY genera un grup per a cada valor null que troba.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 52,
    topic: "1. Relational Translation - Difficulties",
    question: "El UNIQUE permet tenir més d'un valor nul.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 53,
    topic: "1. Relational Translation - Difficulties",
    question: "Sempre puc implementar una diferència indistintament amb un 'NOT IN' o un 'NOT EXISTS'.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 54,
    topic: "1. Relational Translation - Difficulties",
    question: "¿Quin NO és un tipus de Generalització/Especialització?",
    options: { A: "Disjoint", B: "Complete", C: "Overlapping", D: "Imbalanced" },
    correctAnswer: "D"
  },
  {
    id: 55,
    topic: "1. Relational Translation - Difficulties",
    question: "En qualsevol dels tres tipus d'implementació de Generalització/Especialització posem un atribut discriminant.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 56,
    topic: "1. Relational Translation - Difficulties",
    question: "En cap dels tres tipus d'implementació de Generalització/Especialització posem claus foranes.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 57,
    topic: "1. Relational Translation - Difficulties",
    question: "¿Quina de les tres implementacions de Generalització/Especialització NO genera mai nuls ni repeteix valors?",
    options: { A: "Creació d'una única taula corresponent a la superclasse", B: "Creació d'una taula per cada classe (tant per a la superclasse com per a les subclasses)", C: "Creació d'una taula per cada subclasse, però no per a la superclasse", D: "Cap de les tres, totes poden generar problemes depenent del tipus de Generalització/Especialització" },
    correctAnswer: "B"
  },
  {
    id: 58,
    topic: "1. Relational Translation - Difficulties",
    question: "Quan implementem una Generalització/Especialització en un SGBD relacional, sempre cal fer una join per consultar juntes totes les dades de la superclasse.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 59,
    topic: "1. Relational Translation - Difficulties",
    question: "Quan implementem una Generalització/Especialització en un SGBD relacional, sempre cal utilitzar una outer join per consultar juntes totes les dades de qualsevol de les subclasses.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 60,
    topic: "1. Relational Translation - Difficulties",
    question: "¿Quin dels tres tipus de join NO genera mai valors null?",
    options: { A: "Full outer join", B: "Right outer join", C: "Left outer join", D: "Tots tres en poden generar" },
    correctAnswer: "D"
  },
  {
    id: 61,
    topic: "1. Relational Translation - Difficulties",
    question: "Si una consulta té només dues taules al FROM, podem intercanviar LEFT per RIGHT i obtenir el mateix resultat, simplement canviant a la vegada l'ordre de les taules.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 62,
    topic: "1. Relational Translation - Difficulties",
    question: "La FULL OUTER JOIN de dues taules permet obtenir el mateix resultat que una LEFT OUTER JOIN o una RIGHT OUTER JOIN, simplement afegint un cert predicat al WHERE.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 63,
    topic: "1. Relational Translation - Difficulties",
    question: "La FULL OUTER JOIN de dues taules és equivalent a fer la unió d'una LEFT OUTER JOIN i una RIGHT OUTER JOIN.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 64,
    topic: "1. Relational Translation - Difficulties",
    question: "Quan utilitzem la implementació de l'herència en PostgreSQL, ¿Quina de les següents afirmacions és certa?",
    options: { A: "Només podem inserir dades a la taula de la subclasse", B: "Només podem inserir dades a la taula de la superclasse", C: "Podem inserir dades indistintament a qualsevol de les dues taules i tindrem de mateix resultat", D: "Podem inserir dades a qualsevol de les dues taules, però no tindrem del mateix resultat" },
    correctAnswer: "D"
  },
  {
    id: 65,
    topic: "1. Relational Translation - Difficulties",
    question: "¿Quina NO és una raó per a crear un surrogate?",
    options: { A: "No existeix una clau externa", B: "El atributs de la clau externa canvien molt sovint", C: "La clau externa requereix massa espai", D: "Totes ho son" },
    correctAnswer: "D"
  },
  {
    id: 66,
    topic: "1. Relational Translation - Difficulties",
    question: "Un atribut tipus SERIAL sempre tindrà valors consecutius tret que haguem esborrat alguna fila de la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 67,
    topic: "1. Relational Translation - Difficulties",
    question: "Una SEQUENCE de PostgreSQL es pot utilitzar a taules diferents.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },

  // --- TEMA 2: Relational Translation - Relationships (Preguntas 68-104) ---
  {
    id: 68,
    topic: "2. Relational Translation - Relationships",
    question: "¿Com podem implementar les restriccions d'integritat?",
    options: { A: "Dins del CREATE TABLE", B: "Amb Persistent Stored Modules", C: "Amb JDBC", D: "Amb qualsevol de les anteriors" },
    correctAnswer: "D"
  },
  {
    id: 69,
    topic: "2. Relational Translation - Relationships",
    question: "¿La clau primària d'una taula sempre genera automàticament un índex B+ associat?",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 70,
    topic: "2. Relational Translation - Relationships",
    question: "¿Les claus alternatives no tenen una clàusula pròpia a l'estàndard per a crear-les?",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 71,
    topic: "2. Relational Translation - Relationships",
    question: "La millor manera per a resoldre un deadlock provocat per claus foranes entre dues taules, és sempre crear una de les taules sense clau forana i afegir-li a posteriori.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 72,
    topic: "2. Relational Translation - Relationships",
    question: "Un deadlock provocat per claus foranes entre dues taules, es pot resoldre creant una tercera taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 73,
    topic: "2. Relational Translation - Relationships",
    question: "¿Quina és la millor opció per inserir tuples quan tenim un deadlock provocat per claus foranes entre dues taules?",
    options: { A: "Diferir la comprovació de les claus foranes", B: "Desactivar una de les claus foranes i tornar a activar-la després", C: "Esborrar una de les claus foranes i tornar a crear-la després", D: "Cap de les anteriors" },
    correctAnswer: "A"
  },
  {
    id: 74,
    topic: "2. Relational Translation - Relationships",
    question: "¿Què perdem si esborrem una taula que només té l'atribut identificador i una clau forana que l'apunta?",
    options: { A: "Les seves dades", B: "Una part del disseny", C: "La restricció d'integritat", D: "La seva informació" },
    correctAnswer: "C"
  },
  {
    id: 75,
    topic: "2. Relational Translation - Relationships",
    question: "¿Què és menys important en una associació binària quan fem el disseny conceptual de la base de dades?",
    options: { A: "Si la multiplicitat màxima de cada costat", B: "Si la multiplicitat mínima de cada costat", C: "El nom de l'associació", D: "La direcció de navegació" },
    correctAnswer: "D"
  },
  {
    id: 76,
    topic: "2. Relational Translation - Relationships",
    question: "¿En quin tipus d'associació binària és totalment irrellevant si un dels costats admet zeros o no?",
    options: { A: "*.*", B: "1-*", C: "1-1", D: "Sempre és rellevant" },
    correctAnswer: "A"
  },
  {
    id: 77,
    topic: "2. Relational Translation - Relationships",
    question: "¿Quin tipus d'associació binària s'ha d'implementar sempre amb una taula propia (a més de les dues corresponents a les classes)?",
    options: { A: "*.*", B: "1-*", C: "1-1", D: "Totes les anteriors" },
    correctAnswer: "A"
  },
  {
    id: 78,
    topic: "2. Relational Translation - Relationships",
    question: "¿En quin tipus d'associació binària podem triar a quina taula posem la clau forana?",
    options: { A: "*.*", B: "1-*", C: "1-1", D: "Totes les anteriors" },
    correctAnswer: "C"
  },
  {
    id: 79,
    topic: "2. Relational Translation - Relationships",
    question: "Independentment de les multiplicitats d'una associació binària, sempre hi ha una opció per evitar que es puguin generar valors null.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 80,
    topic: "2. Relational Translation - Relationships",
    question: "El millor és sempre triar la implementació d'una associació binària que no genera mai valors null.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 81,
    topic: "2. Relational Translation - Relationships",
    question: "En el model relacional clàssic, ¿en presència de quin tipus d'associació binària podem fusionar les dues taules en una?",
    options: { A: "*.*", B: "1-*", C: "1-1", D: "Totes les anteriors" },
    correctAnswer: "C"
  },
  {
    id: 82,
    topic: "2. Relational Translation - Relationships",
    question: "¿Quin NO és un criteri per a triar la clau primària entre les alternatives que hi hagin?",
    options: { A: "Freqüència d'us a les consultes", B: "Freqüència de canvi", C: "Espai requerit", D: "Nombre de dependències funcionals" },
    correctAnswer: "D"
  },
  {
    id: 83,
    topic: "2. Relational Translation - Relationships",
    question: "¿Quina de les següents afirmacions respecte a les associacions reflexives és falsa?",
    options: { A: "Poden ser simètriques o no", B: "Poden generar cadenes amb infinites instàncies", C: "En podem trobar amb qualsevol multiplicitat", D: "Gairebé sempre tenen zeros" },
    correctAnswer: "B"
  },
  {
    id: 84,
    topic: "2. Relational Translation - Relationships",
    question: "Una associació reflexiva simètrica només pot tenir multiplicitat 1-1.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 85,
    topic: "2. Relational Translation - Relationships",
    question: "En una associació reflexiva simètrica, cal guardar sempre a la base de dades les dues versions de la parella.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 86,
    topic: "2. Relational Translation - Relationships",
    question: "Per tal de garantir la simetria d'una associació binària, sempre haurem d'utilitzar triggers.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 87,
    topic: "2. Relational Translation - Relationships",
    question: "La implementació d'una associació ternària genera ...",
    options: { A: "... una clau candidata", B: "... dues claus candidates", C: "... una o dues claus candidates", D: "... una, dues o tres claus candidates" },
    correctAnswer: "D"
  },
  {
    id: 88,
    topic: "2. Relational Translation - Relationships",
    question: "Hi ha casos en que podem implementar una associació ternària amb simplement una clau forana (sense cap taula intermitja).",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 89,
    topic: "2. Relational Translation - Relationships",
    question: "La implementació d'una associació ternària en un SGBD relacional mai genera valors null.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 90,
    topic: "2. Relational Translation - Relationships",
    question: "Una classe pot se part de dues amb una agregació composta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 91,
    topic: "2. Relational Translation - Relationships",
    question: "En una aggregació composta, tots dos costats poden tenir un zero.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 92,
    topic: "2. Relational Translation - Relationships",
    question: "Podem encadenar tantes agregacions compostes com vulguem.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 93,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE CASCADE.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 94,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE RESTRICT.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 95,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE SET NULL.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 96,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE NO ACTION.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 97,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE SET DEFAULT.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 98,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE CASCADE, però només si la cardinalitat màxima del costat del tot és 1.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 99,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE CASCADE, però només si la cardinalitat màxima del costat de la part és 1.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 100,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE CASCADE, però només si la cardinalitat màxima del costat del tot és *.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 101,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE CASCADE, però només si la cardinalitat màxima del costat de la part és *.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 102,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE CASCADE, independentment de les cardinalitats.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 103,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE CASCADE, però només si la cardinalitat mínima del costat de la part és 1.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 104,
    topic: "2. Relational Translation - Relationships",
    question: "Una aggregació composta es pot implementar amb una clau forana amb ON DELETE CASCADE, però només si la cardinalitat mínima del costat del tot és 1.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
// --- TEMA 3: Normalization (Preguntas 105-141) ---
  {
    id: 105,
    topic: "3. Normalization",
    question: "Les anomalies a les que fa referència la normalització no afecten a les consultes.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 106,
    topic: "3. Normalization",
    question: "¿Quina NO és una conseqüència de les anomalies que motiven la teoria de la normalització?",
    options: { A: "Algunes dades es poden perdre sense voler", B: "Un únic canvi pot provocar moltes modificacions a la base de dades", C: "Es generen joins innecessàries", D: "No podem inserir una certa dada de forma independent" },
    correctAnswer: "C"
  },
  {
    id: 107,
    topic: "3. Normalization",
    question: "La normalització formalitza les propietats que ha de complir un disseny de bases de dades relacionals per a ser considerat de qualitat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 108,
    topic: "3. Normalization",
    question: "¿Quin és el propòsit fonamental de la normalització?",
    options: { A: "Cada relació correspon a una classe", B: "Cada relació correspon a una entitat", C: "Cada relació correspon a una funcionalitat", D: "Cada relació correspon a un concepte semàntic" },
    correctAnswer: "D"
  },
  {
    id: 109,
    topic: "3. Normalization",
    question: "El producte cartesià de dos conjunts és també un tipus de relació, però no funcional.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 110,
    topic: "3. Normalization",
    question: "Una clau primària correspon a ... entre la instància i el valor",
    options: { A: "... una funció exhaustiva", B: "... una funció bijectiva", C: "... una funció injectiva", D: "... cap de les anteriors" },
    correctAnswer: "C"
  },
  {
    id: 111,
    topic: "3. Normalization",
    question: "Una clau primària i un altre atribut de la mateixa relació podem estar relacionats amb ...",
    options: { A: "... una funció injectiva", B: "... una funció bijectiva", C: "... una funció exhaustiva", D: "... qualsevol de les anteriors" },
    correctAnswer: "D"
  },
  {
    id: 112,
    topic: "3. Normalization",
    question: "Una dependència funcional de X a Y ({X} → {Y}) vol dir que si sabem el valor de X, podem saber el de Y.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 113,
    topic: "3. Normalization",
    question: "Una dependència funcional plena és una dependència funcional amb un únic atribut a la part dreta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 114,
    topic: "3. Normalization",
    question: "El principal propòsit de les formes normals del model relacional és millorar el rendiment (és a dir, temps de resposta) del sistema.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 115,
    topic: "3. Normalization",
    question: "Una relació està en 1NF si tots els seus atributs són atòmics (és a dir, indivisibles).",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 116,
    topic: "3. Normalization",
    question: "¿Quin dels següents tipus de dades és atòmic?",
    options: { A: "JSON", B: "Matriu", C: "Tots dos ho són", D: "Cap dels dos ho és" },
    correctAnswer: "D"
  },
  {
    id: 117,
    topic: "3. Normalization",
    question: "Una relació està en 2NF si totes les dependències funcionals cap als atributs que no formen part d'una clau són plenes.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 118,
    topic: "3. Normalization",
    question: "Si una relació que no està en 2FN i volem que ho estigui, el que hem de fer és dividir els seus atributs en subconjunts disjunts tant com calgui fins que ho estigui.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 119,
    topic: "3. Normalization",
    question: "Una relació està en 3NF si cap dels seus atributs està a la part esquerra d'una dependència funcional.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 120,
    topic: "3. Normalization",
    question: "Si una relació que no està en 3FN i volem que ho estigui, el que hem de fer és dividir els seus atributs en subconjunts disjoints tant com calgui fins que ho estigui, però deixant en cada divisió com clau forana entre les parts el determinant que provoca la violació de la forma normal.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 121,
    topic: "3. Normalization",
    question: "¿Quines formes normals tenen excepció?",
    options: { A: "1NF i 2NF", B: "2NF i 3NF", C: "1NF i 3NF", D: "1NF, 2NF, 3NF" },
    correctAnswer: "B"
  },
  {
    id: 122,
    topic: "3. Normalization",
    question: "BCNF no permet tenir claus alternatives.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 123,
    topic: "3. Normalization",
    question: "La BCNF es va definir perquè 2NF i 3NF no garanteixen l'absència d'anomalies.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 124,
    topic: "3. Normalization",
    question: "La normalització fins a BCNF és única.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 125,
    topic: "3. Normalization",
    question: "¿Quina NO és una de les regles d'Armstrong?",
    options: { A: "Distributivitat", B: "Pseudo-transitivitat", C: "Adició", D: "Projectabilitat/Descomposició", E: "Augmentativitat", F: "Transitivitat", G: "Reflexivitat" },
    correctAnswer: "A"
  },
  {
    id: 126,
    topic: "3. Normalization",
    question: "La clausura de dependències funcionals conté totes les dependències implícites al disseny.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 127,
    topic: "3. Normalization",
    question: "¿Què NO puc deduir a partir de la clausura de dependències funcionals?",
    options: { A: "Tot el conjunt de claus candidates", B: "Si un esquema es correcte", C: "Si dos esquemes relacionals són equivalents", D: "Si una dependència funcional és certa o no" },
    correctAnswer: "B"
  },
  {
    id: 128,
    topic: "3. Normalization",
    question: "Amb l'algorisme de normalització d'anàlisi es poden perdre dependències funcionals.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 129,
    topic: "3. Normalization",
    question: "Si executem l'algorisme de normalització d'anàlisi diverses vegades, podem obtenir resultats diferents.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 130,
    topic: "3. Normalization",
    question: "L'algorisme de normalització d'anàlisi NO garanteix que al final complim BCNF.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 131,
    topic: "3. Normalization",
    question: "L'algorisme de normalització d'anàlisi tracta de trobar la 'relació universal'.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 132,
    topic: "3. Normalization",
    question: "No tots els casos es poden normalitzar fins a BCNF.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 133,
    topic: "3. Normalization",
    question: "Donades les dependències funcionals, la normalització es pot automatitzar totalment.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 134,
    topic: "3. Normalization",
    question: "Un esquema normalitzat és millor que un que no ho està, perquè el primer conté redundancies que el segon no té.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 135,
    topic: "3. Normalization",
    question: "¿Quina NO és una raó per a desnormalitzar?",
    options: { A: "Quan no s'esperen canvis a les dades", B: "Quan les taules s'haurien d'ajuntar (join) molt sovint", C: "Quan la consistència de les dades es pot garantir d'alguna altra manera", D: "Quan la base de dades és molt petita" },
    correctAnswer: "D"
  },
  {
    id: 136,
    topic: "3. Normalization",
    question: "Donada la seqüència de conjunts d'esquemes tals que compleixen una certa dependència funcional: E_INF, E_2NF, E_3NF, E_BCNF i E_4NF (per exemple, E_3NF representa tots el esquemes que compleixen 3NF). Si considerem qualsevol parella E_X - E_Y tal que E_X apareix abans que E_Y en aquesta seqüència, podem afirmar que:",
    options: { A: "E_X ∩ E_Y = ∅ (no hi ha cap esquema que compleixi X i Y alhora)", B: "E_X ⊇ E_Y (tots els que compleixen Y, també compleixen X)", C: "E_X ⊆ E_Y (tots els que compleixen X, també compleixen Y)", D: "Cap de les anteriors" },
    correctAnswer: "B"
  },
  {
    id: 137,
    topic: "3. Normalization",
    question: "Qualsevol relació està en NF².",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 138,
    topic: "3. Normalization",
    question: "Una dependència multivaluada és un tipus de dependència funcional.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 139,
    topic: "3. Normalization",
    question: "Si una relació està en 4NF ho està també en BCNF.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 140,
    topic: "3. Normalization",
    question: "La 4NF no permet tenir dependències multivaluades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 141,
    topic: "3. Normalization",
    question: "Per normalitzar una relació que no estigui en 4FN, hem de fer el producte cartesià del atributs que l'estiguin violant.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },

  // --- TEMA 4: Data Warehousing and OLAP (Preguntas 142-190) ---
  {
    id: 142,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de sistema NO forma part del suport a la presa de decisions?",
    options: { A: "Machine Learning", B: "ETL", C: "Reporting", D: "OLAP", E: "ERP", F: "Data Warehouse" },
    correctAnswer: "E"
  },
  {
    id: 143,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de sistema té un us més repetitiu?",
    options: { A: "Operacional", B: "Decisional", C: "Els dos similar" },
    correctAnswer: "A"
  },
  {
    id: 144,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de sistema té més usuaris?",
    options: { A: "Operacional", B: "Decisional", C: "Els dos similar" },
    correctAnswer: "A"
  },
  {
    id: 145,
    topic: "4. Data Warehousing and OLAP",
    question: "¿En quin tipus de sistema una consulta acostuma a accedir més tuples?",
    options: { A: "Operacional", B: "Decisional", C: "Els dos similar" },
    correctAnswer: "B"
  },
  {
    id: 146,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de sistema té més dades històriques?",
    options: { A: "Operacional", B: "Decisional", C: "Els dos similar" },
    correctAnswer: "B"
  },
  {
    id: 147,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de sistema té més operacions de modificació?",
    options: { A: "Operacional", B: "Decisional", C: "Els dos similar" },
    correctAnswer: "A"
  },
  {
    id: 148,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de sistema utilitza transaccions?",
    options: { A: "Operacional", B: "Decisional", C: "Els dos", D: "Cap dels dos" },
    correctAnswer: "A"
  },
  {
    id: 149,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de sistema té consultes més complexes?",
    options: { A: "Operacional", B: "Decisional", C: "Els dos similar" },
    correctAnswer: "B"
  },
  {
    id: 150,
    topic: "4. Data Warehousing and OLAP",
    question: "¿En quin tipus de sistema és més important el seu rendiment?",
    options: { A: "Operacional", B: "Decisional", C: "En els dos" },
    correctAnswer: "C"
  },
  {
    id: 151,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de sistema emmagatzema més dades?",
    options: { A: "Operacional", B: "Decisional", C: "Els dos similar" },
    correctAnswer: "B"
  },
  {
    id: 152,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quina NO és una de les quatre característiques d'un magatzem de dades?",
    options: { A: "No volàtil", B: "Transaccional", C: "Històric", D: "Integrat", E: "Orientat a temes" },
    correctAnswer: "B"
  },
  {
    id: 153,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de temps ha de gestionar un magatzem de dades?",
    options: { A: "Temps de Transacció", B: "Temps de Validesa", C: "Tots dos", D: "Cap dels dos" },
    correctAnswer: "C"
  },
  {
    id: 154,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quina característica té un magatzem de dades?",
    options: { A: "Orientat a temes", B: "Orientat a la funcionalitat", C: "Orientat a decisions", D: "Orientat a transaccions" },
    correctAnswer: "A"
  },
  {
    id: 155,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Que un magatzem de dades sigui 'time variant' vol dir que el software associat està en permanent evolució?",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 156,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Que un magatzem de dades sigui 'non-volatile' vol dir que mai s'esborra cap dada?",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 157,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Que un magatzem de dades sigui 'integrated' vol dir que els seus components de programari interactuen com si fos un sistema monolític?",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 158,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quina diferència hi ha entre una arquitectura d'un sol nivell i una de dos d'emmagatzemament de dades (data warehousing)?",
    options: { A: "La d'un nivell no té cap base de dades", B: "La d'un nivell no té cap base de dades operacional", C: "La d'un nivell no té cap base de dades decisional", D: "Cap de les anteriors" },
    correctAnswer: "C"
  },
  {
    id: 159,
    topic: "4. Data Warehousing and OLAP",
    question: "Una arquitectura d'un sol nivell d'emmagatzemament de dades (data warehousing), genera un magatzem de dades virtual.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 160,
    topic: "4. Data Warehousing and OLAP",
    question: "En una arquitectura de dos nivells d'emmagatzemament de dades (data warehousing), les dades es poden replicar com a màxim dues vegades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 161,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de tasca NO fa un procés ETL?",
    options: { A: "Carregar les dades a una base de dades", B: "Treure dades de les fonts", C: "Encapsular l'accés a les dades", D: "Netejar les dades" },
    correctAnswer: "C"
  },
  {
    id: 162,
    topic: "4. Data Warehousing and OLAP",
    question: "Les bases de dades decisionals admeten redundàncies.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 163,
    topic: "4. Data Warehousing and OLAP",
    question: "Les bases de dades decisionals sempre actualitzen les dades en temps real.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 164,
    topic: "4. Data Warehousing and OLAP",
    question: "Les bases de dades decisionals NO necessiten control de concurrència.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 165,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quina NO es considera una limitació dels fulls de càlcul per analitzar dades multidimensionals?",
    options: { A: "No gestiona metadades", B: "No permeten operacions d'àlgebra línial", C: "Permet un número limitat de cel·les", D: "La posició de les dades limita certes operacions", E: "No gestiona jerarquies d'agregació" },
    correctAnswer: "B"
  },
  {
    id: 166,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quina NO és una característica de les eines OLAP?",
    options: { A: "Integra dades", B: "Respon consultes ràpidament", C: "Gestiona dades multidimensionals", D: "Serveix per a fer anàlisi de dades", E: "Permet compartir dades" },
    correctAnswer: "A"
  },
  {
    id: 167,
    topic: "4. Data Warehousing and OLAP",
    question: "Les eines OLAP guarden les dades en una estructura de dades física en forma de cub n-dimensional.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 168,
    topic: "4. Data Warehousing and OLAP",
    question: "Un cub de dades es una metàfora per a una taula estadística.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 169,
    topic: "4. Data Warehousing and OLAP",
    question: "Una taula relacional és equivalent a un cub de dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 170,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quina NO és una operació de les eines OLAP?",
    options: { A: "Slice", B: "Dice", C: "Drill-down", D: "Roll-up", E: "Cube" },
    correctAnswer: "E"
  },
  {
    id: 171,
    topic: "4. Data Warehousing and OLAP",
    question: "Les operacions de 'Slice & Dice' són seleccions sobre les dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 172,
    topic: "4. Data Warehousing and OLAP",
    question: "Les operacions de 'Roll-up' i 'Drill-Down' indiquen agrupacions de dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 173,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin avantatge de la modelització de dades operacionals ens és útil també per modelitzar dades decisionals?",
    options: { A: "Facilita la comprensió del domini per part dels usuaris finals", B: "Resulta en sistemes molt eficients quan tenen canvis freqüents", C: "Redueix la quantitat de dades redundants", D: "Elimina la necessitat de modificar molts registres per un sol canvi" },
    correctAnswer: "A"
  },
  {
    id: 174,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Què busquem quan fem un esquema en estrella?",
    options: { A: "Posar el focus en un tema concret", B: "Simplificar l'esquema conceptual", C: "Tots dos", D: "Cap dels dos" },
    correctAnswer: "C"
  },
  {
    id: 175,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quina multiplicitat permet un esquema en estrella entre el fet i les dimensions?",
    options: { A: "1-1", B: "1-*", C: "*-*", D: "Totes les anteriors" },
    correctAnswer: "B"
  },
  {
    id: 176,
    topic: "4. Data Warehousing and OLAP",
    question: "Un esquema en estrella té un únic fet.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 177,
    topic: "4. Data Warehousing and OLAP",
    question: "Un esquema en estrella no pot tenir més de quatre dimensions.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 178,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quins nivells té una eina ROLAP?",
    options: { A: "Emmagatzemament i consulta", B: "Consulta i traducció", C: "Emmagatzemament i traducció", D: "Tots els anteriors" },
    correctAnswer: "C"
  },
  {
    id: 179,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin tipus de SGBD utilitzen les eines ROLAP?",
    options: { A: "NOSQL", B: "Relacional", C: "Multidimensional", D: "Cap" },
    correctAnswer: "B"
  },
  {
    id: 180,
    topic: "4. Data Warehousing and OLAP",
    question: "Cada SGBD té la seva pròpia llibreria ROLAP.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 181,
    topic: "4. Data Warehousing and OLAP",
    question: "El principal problema de les eines ROLAP és que generen massa joins.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 182,
    topic: "4. Data Warehousing and OLAP",
    question: "Els sistemes OLAP i OLTP implementats sobre SGBDs relacionals segueixen les mateixes tres fases de disseny.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 183,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quantes claus primàries té la taula de fets d'un esquema en estrella?",
    options: { A: "Tantes com dimensions menys una", B: "Tantes com dimensions", C: "Una", D: "Un número indeterminat" },
    correctAnswer: "C"
  },
  {
    id: 184,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quants atributs té la clau primària de la taula de fets d'un esquema en estrella?",
    options: { A: "Un", B: "Tants com dimensions menys una", C: "Tants com dimensions", D: "Un número indeterminat" },
    correctAnswer: "C"
  },
  {
    id: 185,
    topic: "4. Data Warehousing and OLAP",
    question: "Una Cube-Query fa tantes joins com dimensions tingui el cub més una.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 186,
    topic: "4. Data Warehousing and OLAP",
    question: "Una Cube-Query sobre una eina ROLAP retorna una taula relacional.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 187,
    topic: "4. Data Warehousing and OLAP",
    question: "¿De quin tipus de valors faciliten el càlcul les clàusules 'GROUPING SETS'?",
    options: { A: "Agregats", B: "Atòmics", C: "Marginals", D: "Derivats" },
    correctAnswer: "C"
  },
  {
    id: 188,
    topic: "4. Data Warehousing and OLAP",
    question: "¿Quin NO és un possible significat del valor null?",
    options: { A: "Desconegut", B: "Agregat", C: "Integrat", D: "Inexistent" },
    correctAnswer: "C"
  },
  {
    id: 189,
    topic: "4. Data Warehousing and OLAP",
    question: "Qualsevol consulta que utilitzi ROLLUP i/o CUBE, sempre es pot rescriure utilitzant només GROUPING SETS.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 190,
    topic: "4. Data Warehousing and OLAP",
    question: "Sempre que es pugui, es millor utilitzar ROLLUP i/o CUBE, en lloc de GROUPING SETS, perquè facilita l'optimització de la consulta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  // --- TEMA 5: NOSQL (Preguntas 191-220) ---
  {
    id: 191,
    topic: "5. NOSQL",
    question: "Els SGBDs relationals permeten implementar qualsevol tipus de sistema d'informació de forma eficient.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 192,
    topic: "5. NOSQL",
    question: "Els sistemes NOSQL són schemaless.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 193,
    topic: "5. NOSQL",
    question: "Els sistemes NOSQL garanteixen les restriccions d'integritat, tal com fan els sistemes relationals.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 194,
    topic: "5. NOSQL",
    question: "Impedance mismatch vol dir que el format de les dades al disc i a la memoria és diferent.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 195,
    topic: "5. NOSQL",
    question: "El fet de niar unes instàncies dins d'unes altres trenca la 1NF.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 196,
    topic: "5. NOSQL",
    question: "¿Quina NO és una conseqüència d'acceptar la variabilitat de l'esquema?",
    options: { A: "Es guanya en flexibilitat", B: "Es perd semàntica", C: "Es perd el principi d'independència de dades", D: "Es guanya eficiència en les consultes" },
    correctAnswer: "D"
  },
  {
    id: 197,
    topic: "5. NOSQL",
    question: "La independència física, d'acord amb l'arquitectura ANSI/SPARC, garanteix que un canvi en l'esquema intern no afectara a les taules de la base de dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 198,
    topic: "5. NOSQL",
    question: "La independència lògica, d'acord amb l'arquitectura ANSI/SPARC, garanteix que un canvi en les vistes no afectara a les taules de la base de dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 199,
    topic: "5. NOSQL",
    question: "La independència lògica, d'acord amb l'arquitectura ANSI/SPARC, garanteix que un canvi en una taula no afectara a cap vista de la base de dades, tret que el canvi afecti els atributs o taules utilitzats en la vista.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 200,
    topic: "5. NOSQL",
    question: "Una SGBD relacional pot contenir una base de dades que segueixi a la vegada el model relacional i correlacional.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 201,
    topic: "5. NOSQL",
    question: "En PostgreSQL, per canviar el valor d'una posició concreta d'un array, hem de reassignar tot l'array complet a la fila corresponent.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 202,
    topic: "5. NOSQL",
    question: "Un array en PostgreSQL té un nombre fix de valors, indicat en la seva declaració.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 203,
    topic: "5. NOSQL",
    question: "Un array en PostgreSQL pot contenir valors nulls.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 204,
    topic: "5. NOSQL",
    question: "Un atribut multivaluat guardat en un array generarà tans accessos a disc com elements tingui l'array.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 205,
    topic: "5. NOSQL",
    question: "Un atribut multivaluat guardat en un array ocuparà més espai de disc que guardant-ho per files, però menys que fent-ho per columnes.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 206,
    topic: "5. NOSQL",
    question: "En general, la funció per calcular agregats a partir d'un array, l'ha de definir l'usuari.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 207,
    topic: "5. NOSQL",
    question: "PostgreSQL disposa de funcions booleanes específiques que permeten definir fàcilment restriccions d'integritat sobre cadascun dels elements d'un array.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 208,
    topic: "5. NOSQL",
    question: "El nivell de concurrència que permet guardar un atribut multivaluat en un array és el mateix que si el guardem per columnes.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 209,
    topic: "5. NOSQL",
    question: "La principal diferència entre un gestor de documents i un de parelles clau-valor és que el primer aprofita l'estructura dels documents per a permetre la definició d'índexs secundaris.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 210,
    topic: "5. NOSQL",
    question: "XML és un model de base de dades semi-estructurat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 211,
    topic: "5. NOSQL",
    question: "JSON és un model de base de dades semi-estructurat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 212,
    topic: "5. NOSQL",
    question: "Quan tenim documents JSON, els hem de guardar en un SGBD relacional utilitzant el tipus de dades corresponent.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 213,
    topic: "5. NOSQL",
    question: "Podem tenir un document JSON que compleixi la mateixa propietat de la BCNF (és a dir, cada determinant determina per ell mateix tots els atributs del document, ja sigui directa o indirectament).",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 214,
    topic: "5. NOSQL",
    question: "Podem tenir claus primàries en documents JSON.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 215,
    topic: "5. NOSQL",
    question: "Podem tenir claus foranes en documents JSON.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 216,
    topic: "5. NOSQL",
    question: "El principal propòsit de ninar diferents instàncies en un mateix document JSON és evitar joins.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 217,
    topic: "5. NOSQL",
    question: "En un gestor de documents, podem definir l'esquema que aquests han de seguir.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 218,
    topic: "5. NOSQL",
    question: "Un gestor de documents guarda sempre al disc exactament el mateix que posa a la memòria.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 219,
    topic: "5. NOSQL",
    question: "El tipus JSONB de PostgreSQL preserva l'ordre de les claus al document.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 220,
    topic: "5. NOSQL",
    question: "El tipus JSONB de PostgreSQL elimina claus duplicades al document.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },

  // --- TEMA 6: Views (Preguntas 221-266) ---
  {
    id: 221,
    topic: "6. Views",
    question: "¿Quin NO és un dels quatre nivells de l'arquitectura ANSI/SPARC?",
    options: { A: "Lògic", B: "External", C: "Conceptual", D: "Internal" },
    correctAnswer: "A"
  },
  {
    id: 222,
    topic: "6. Views",
    question: "¿En quin nivell de l'arquitectura ANSI/SPARC trobem més esquemes?",
    options: { A: "Internal", B: "Conceptual", C: "External", D: "Trobem a tots el mateix nombre" },
    correctAnswer: "C"
  },
  {
    id: 223,
    topic: "6. Views",
    question: "¿Quina de les següents possibilitats no existeix en els SGBDs relacionals?",
    options: { A: "Taules materialitzades", B: "Vistes materialitzades", C: "Taules no materialitzades", D: "Vistes no materialitzades" },
    correctAnswer: "C"
  },
  {
    id: 224,
    topic: "6. Views",
    question: "La consulta que defineix una vista sempre està guardada al catàleg de la base de dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 225,
    topic: "6. Views",
    question: "¿Quin és un exemple paradigmàtic de vistes materialitzades?",
    options: { A: "DW", B: "NOSQL", C: "Tots dos", D: "Cap dels dos" },
    correctAnswer: "A"
  },
  {
    id: 226,
    topic: "6. Views",
    question: "¿Quina NO és una utilitat de les vistes?",
    options: { A: "Comprovar restriccions d'integritat", B: "Simplificar consultes", C: "Simplificar el manteniment", D: "Amagar dades", E: "Simplificar esquemes complexos" },
    correctAnswer: "C"
  },
  {
    id: 227,
    topic: "6. Views",
    question: "¿Quin NO és un dels quatre problemes associats a les vistes?",
    options: { A: "Query rewriting", B: "Update through views", C: "View expansion", D: "View updating", E: "View materialization" },
    correctAnswer: "E"
  },
  {
    id: 228,
    topic: "6. Views",
    question: "¿Quin problema aplica només a vistes no-materialitzades?",
    options: { A: "Update through views", B: "Query rewriting", C: "View expansion", D: "View updating", E: "Tots quatre problemes apliquen a qualsevol tipus de vista" },
    correctAnswer: "C"
  },
  {
    id: 229,
    topic: "6. Views",
    question: "¿Quan es dóna el problema de View expansion?",
    options: { A: "Quan modifiquem una taula", B: "Quan consultem una vista", C: "Quan modifiquem una vista", D: "Quan consultem una taula" },
    correctAnswer: "B"
  },
  {
    id: 230,
    topic: "6. Views",
    question: "¿Quan es dóna el problema de Query rewriting?",
    options: { A: "Quan consultem una taula", B: "Quan modifiquem una vista", C: "Quan modifiquem una taula", D: "Quan consultem una vista" },
    correctAnswer: "A"
  },
  {
    id: 231,
    topic: "6. Views",
    question: "¿Quan es dóna el problema de View updating?",
    options: { A: "Quan modifiquem una vista", B: "Quan modifiquem una taula", C: "Quan consultem una vista", D: "Quan consultem una taula" },
    correctAnswer: "B"
  },
  {
    id: 232,
    topic: "6. Views",
    question: "¿Quan es dóna el problema de Update through views?",
    options: { A: "Quan consultem una taula", B: "Quan consultem una vista", C: "Quan modifiquem una vista", D: "Quan modifiquem una taula" },
    correctAnswer: "C"
  },
  {
    id: 233,
    topic: "6. Views",
    question: "¿Quan es varen introduir les vistes materialitzades a l'estàndard SQL?",
    options: { A: "Al seu inici", B: "Al 1992", C: "Al 2023", D: "Encara no ho estan" },
    correctAnswer: "D"
  },
  {
    id: 234,
    topic: "6. Views",
    question: "¿Quants dels tres problemes teòrics que tenen associats a les vistes materialitzades podem veure explícitament reflectits a la seva sentencia de creació d'Oracle?",
    options: { A: "Cap", B: "Un", C: "Dos", D: "Tres" },
    correctAnswer: "D"
  },
  {
    id: 235,
    topic: "6. Views",
    question: "Una vista sempre es pot expandir.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 236,
    topic: "6. Views",
    question: "Mai expandim vistes materialitzades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 237,
    topic: "6. Views",
    question: "View Expansion consisteix simplement en substituir el nom de la vista que apareix a la consulta per la corresponent definició que podem trobar al catàleg de la base de dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 238,
    topic: "6. Views",
    question: "No podem expandir vistes dins d'una altra vista.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 239,
    topic: "6. Views",
    question: "Update Through Views consisteix a utilitzar les vistes en comptes dels índexs per accedir més rapid a les dades quan les hem de modificar.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 240,
    topic: "6. Views",
    question: "Els SGBDs permeten modificar una taula a través d'una vista independentment del predicat lògic que es posi al WHERE de la definició de la vista, sempre que aquest no contingui cap subconsulta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 241,
    topic: "6. Views",
    question: "Els SGBDs permeten modificar una taula a través d'una vista definida sobre una altra vista si les dues definicions de les vistes compleixen, per separat, les condicions necessaries.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 242,
    topic: "6. Views",
    question: "Els SGBDs sempre permeten modificar una taula a través d'una vista que no conté cap altra taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 243,
    topic: "6. Views",
    question: "Els SGBDs sempre permeten modificar una taula a través d'una vista que tingui un agregat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 244,
    topic: "6. Views",
    question: "Els SGBDs sempre permeten modificar una taula a través d'una vista que faci una join.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 245,
    topic: "6. Views",
    question: "View Updating consisteix a propagar els canvis que es produeixen a una taula a totes les vistes materialitzades definides sobre ella.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 246,
    topic: "6. Views",
    question: "¿Quan NO podem propagar els canvis d'una taula a les seves vistes materialitzades?",
    options: { A: "Next < date>", B: "On statement", C: "On commit", D: "On demand", E: "Podem propagar-los de totes les maneres anteriors" },
    correctAnswer: "E"
  },
  {
    id: 247,
    topic: "6. Views",
    question: "Només cal crear un log per fer manteniment de vistes incremental.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 248,
    topic: "6. Views",
    question: "Hem de crear un únic log a cada taula que tingui vistes materialitzar a mantenir de forma incremental, independentment del seu nombre.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 249,
    topic: "6. Views",
    question: "Fer el manteniment d'una vista materialitzada de forma incremental sempre és el més eficient.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 250,
    topic: "6. Views",
    question: "Sempre es pot fer el manteniment d'una vista materialitzada de forma incremental si el log conté les dades adequades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 251,
    topic: "6. Views",
    question: "Sempre podem utilitzar una vista materialitzada per implementar una asserció.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 252,
    topic: "6. Views",
    question: "Per implementar una asserció amb una vista materialitzada, cal que la vista sempre estigui buida.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 253,
    topic: "6. Views",
    question: "Query Rewriting consisteix en que l'usuari rescrigui la seva consulta aprofitant les vistes materialitzades existents, en comptes de les taules.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 254,
    topic: "6. Views",
    question: "En general, els SGBDs fan una cerca exhaustiva de totes les possibilitats de rescriptura d'una consulta emprant les vistes materialitzades que s'hagin definit amb anterioritat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 255,
    topic: "6. Views",
    question: "¿Quin NO és un dels requisits per a poder recriure una consulta en termes d'una vista materialitzada?",
    options: { A: "Les taules utilitzades a la consulta han de ser un subconjunt de les que hi ha a la vista", B: "El predicat de la consulta ha d'estar subsumit pel de la vista", C: "El nivell d'agregació de la consulta ha de ser tan alt o més que el de la vista", D: "Els agregats de la consulta han de coincidir o ser calculables a partir dels de la vista" },
    correctAnswer: "A"
  },
  {
    id: 256,
    topic: "6. Views",
    question: "Si, en general, utilitzar vistes materialitzades millora el rendiment de les consultes, NO és perquè ...",
    options: { A: "... generen menys accessos a disc", B: "... tenen menys files", C: "... tenen menys atributs", D: "... ocupen menys espai", E: "... generen menys contenció" },
    correctAnswer: "E"
  },
  {
    id: 257,
    topic: "6. Views",
    question: "Per decidir si val la pena materialitzar o no una certa consulta, cal tenir en compte ...",
    options: { A: "... la freqüència amb que s'executa", B: "... l'espai que ocuparà el seu resultat", C: "... la freqüència amb que es modifiquen les taules que accedeix", D: "... totes les anteriors" },
    correctAnswer: "D"
  },
  {
    id: 258,
    topic: "6. Views",
    question: "Si el nostre SGBD no proporciona vistes materialitzades, podríem implementar-les nosaltres mateixos amb disparadors.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 259,
    topic: "6. Views",
    question: "Les vistes materialitzades que podem materialitzar ve limitat per ...",
    options: { A: "... l'espai disponible en el disc", B: "... el temps disponible per fer el seu manteniment", C: "... totes les anteriors", D: "... cap de les anteriors" },
    correctAnswer: "C"
  },
  {
    id: 260,
    topic: "6. Views",
    question: "Només tenint en compte les diferents possibilitats d'agregació, el nombre de potencials vistes materialitzades que podem crear ja és exponencial.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 261,
    topic: "6. Views",
    question: "¿Quina NO és una bona heurística per a triar quines vistes materialitzar en un esquema multidimensional?",
    options: { A: "Materialitzar una vista si coincideix amb una consulta crítica", B: "Materialitzar els nivells d'agregació més baixos", C: "No materialitzar una vista si ja s'ha materialitzat una altra que és un ancestre proper en la jerarquia d'agregació", D: "Materialitzar els nivells d'agregació més alts", E: "Totes les heurístiques anteriors són bones" },
    correctAnswer: "E"
  },
  {
    id: 262,
    topic: "6. Views",
    question: "Hem de considerar com a vista candidata a materialitzar la que conté un 'GROUP BY' que és la intersecció dels 'GROUP BY' de dues consultes crítiques.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 263,
    topic: "6. Views",
    question: "Utilitzant un algorisme greedy, sempre tindrem el conjunt òptim de vistes materialitzades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 264,
    topic: "6. Views",
    question: "Utilitzant un algorisme greedy, mai tindrem el conjunt òptim de vistes materialitzades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 265,
    topic: "6. Views",
    question: "Si hem utilitzat un algorisme greedy per seleccionar-les, ja no hem de canviar mai el conjunt de vistes que hem decidit materialitzar.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 266,
    topic: "6. Views",
    question: "Podem estimar la cardinalitat del resultat d'una consulta amb agregats sobre la taula T(a_1, … a_n) com ...",
    options: { A: "|T|", B: "dist(a_1) · … · dist(a_n)", C: "min(|T|, dist(a_1) · … · dist(a_n))", D: "max(|T|, dist(a_1) · … · dist(a_n))" },
    correctAnswer: "C"
  },

  // --- TEMA 7: Physical Design (Preguntas 267-310) ---
  {
    id: 267,
    topic: "7. Physical Design",
    question: "El disseny físic tracta d'adaptar l'esquema lògic a les particularitats d'un SGBD i una càrrega de treball (workload) concretes.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 268,
    topic: "7. Physical Design",
    question: "¿Quina NO és una de les tasques bàsiques del disseny físic?",
    options: { A: "Reconsiderar els requisits", B: "Escollir les estructures de dades", C: "Adaptar l'esquema lògic al SGBD", D: "Reconsiderar l'esquema relacional", E: "Testejar el rendiment" },
    correctAnswer: "A"
  },
  {
    id: 269,
    topic: "7. Physical Design",
    question: "¿Quin NO és un criteri per prendre decisions sobre el disseny físic?",
    options: { A: "Benefici econòmic", B: "Disponibilitat", C: "Escalabilitat", D: "Simplicitat de l'administració", E: "Millora de rendiment", F: "Integritat" },
    correctAnswer: "A"
  },
  {
    id: 270,
    topic: "7. Physical Design",
    question: "¿Quina NO és una dificultat en el disseny físic?",
    options: { A: "La xarxa", B: "Els usuaris", C: "La normalització", D: "Les imperfeccions del SGBD", E: "Tenir recursos limitats", F: "L'existència de criteris contraposats" },
    correctAnswer: "C"
  },
  {
    id: 271,
    topic: "7. Physical Design",
    question: "¿Quina afirmació NO és certa respecte al catàleg?",
    options: { A: "Conté la informació del sistema que el propi SGBD necessita per funcionar", B: "La seva estructura i continguts difereixen d'un SGBD a un altre, tot i que existeix un conjunt de vistes standard", C: "Conté totes les modificacions (insercions, modificacions i esborrats) realitzades des de l'última còpia de seguretat", D: "És útil per gestionar i afinar el funcionament de la base de dades" },
    correctAnswer: "C"
  },
  {
    id: 272,
    topic: "7. Physical Design",
    question: "¿Quin dels següents continguts del catàleg NO considerem estàtic?",
    options: { A: "Informació de les vistes, com ara el seu nom, o la consulta associada", B: "Informació dels usuaris, com ara els intents de connexió", C: "Informació de les taules, com ara el seu nom, atributs, o restriccions d'integritat", D: "Informació dels índexs, com ara el seu nom, tipus, o atributs implicats", E: "Paràmetres del sistema, com ara la grandària del pool de buffers o la grandària de pàgina" },
    correctAnswer: "B"
  },
  {
    id: 273,
    topic: "7. Physical Design",
    question: "¿Quin dels següents continguts del catàleg NO considerem dinàmic?",
    options: { A: "Informació de les taules, com ara la seva cardinalitat o el nombre de blocs", B: "Informació dels usuaris, com ara els intents de connexió", C: "Informació de les vistes, com ara si estan materialitzades o es poden expandir", D: "Informació dels índexs, com ara la seva alçada o el rang de valors" },
    correctAnswer: "C"
  },
  {
    id: 274,
    topic: "7. Physical Design",
    question: "L'estàndard SQL'03 defineix quines han de ser les taules del catàleg de qualsevol SGBD.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 275,
    topic: "7. Physical Design",
    question: "L'estàndard SQL'03 dintingeix entre la informació del catàleg necessària per l'administrador i la necessaria pels usuaris de la base dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 276,
    topic: "7. Physical Design",
    question: "Les estructures d'accés (es a dir, els índexs) són ... respecte a les taules.",
    options: { A: "Complementàries", B: "Redundants" },
    correctAnswer: "A"
  },
  {
    id: 277,
    topic: "7. Physical Design",
    question: "Un índex sempre té menys atributs que la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 278,
    topic: "7. Physical Design",
    question: "Sempre que posem un índex, la taula queda ordenada pels atributs indexats.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 279,
    topic: "7. Physical Design",
    question: "¿Què NO podem trobar en una entrada d'un índex?",
    options: { A: "El registre sencer", B: "Un mapa de bits", C: "Una adreça física del registre", D: "Una funció de hash", E: "Una llista d'adreces físiques de registres" },
    correctAnswer: "D"
  },
  {
    id: 280,
    topic: "7. Physical Design",
    question: "Els valors null sempre es troben a l'índex.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 281,
    topic: "7. Physical Design",
    question: "Els blocs de la taula contenen apuntadors als registres.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 282,
    topic: "7. Physical Design",
    question: "Els blocs de la taula contenen metadades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 283,
    topic: "7. Physical Design",
    question: "Tots el registres continguts al mateix bloc tenen la mateixa longitud.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 284,
    topic: "7. Physical Design",
    question: "Les entrades que trobem a les fulles d'un índex tipus arbre sempre estan ordenades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 285,
    topic: "7. Physical Design",
    question: "Tots els nodes d'un índex tipus arbre estan normalment plens al 100%.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 286,
    topic: "7. Physical Design",
    question: "Un índex tipus arbre incrementa la grandària de la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 287,
    topic: "7. Physical Design",
    question: "Les entrades que trobem als buckets d'un índex tipus hash sempre estan ordenades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 288,
    topic: "7. Physical Design",
    question: "Tots els buckets d'un índex tipus hash estan normalment plens al 100%.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 289,
    topic: "7. Physical Design",
    question: "Els buckets d'un índex tipus hash estan normalment més plens que els nodes d'un tipus arbre.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 290,
    topic: "7. Physical Design",
    question: "Un índex tipus hash incrementa la grandària de la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 291,
    topic: "7. Physical Design",
    question: "Un índex tipus cluster manté ordenades les dades de la taula segons l'atribut d'indexació.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 292,
    topic: "7. Physical Design",
    question: "Un índex tipus cluster incrementa la grandària de la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 293,
    topic: "7. Physical Design",
    question: "| T | representa el nombre de ... de la taula T.",
    options: { A: "Atributs", B: "Bytes", C: "Files", D: "Blocs" },
    correctAnswer: "C"
  },
  {
    id: 294,
    topic: "7. Physical Design",
    question: "¿Quin és típicament l'ordre (normalment representat per la lletra 'd') d'un índex tipus arbre?",
    options: { A: "Menor que 10", B: "Entre 10 i 50", C: "Entre 50 i 100", D: "Major que 100" },
    correctAnswer: "D"
  },
  {
    id: 295,
    topic: "7. Physical Design",
    question: "Els índexs ocupen sempre menys espai que la taula i conseqüentment mai generaran problemes d'espai.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 296,
    topic: "7. Physical Design",
    question: "Un índex tipus arbre sempre ocupa menys espai que l'índex cluster corresponent.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 297,
    topic: "7. Physical Design",
    question: "El nombre de blocs ocupats per qualsevol estructura de dades, sempre ha de ser un nombre enter.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 298,
    topic: "7. Physical Design",
    question: "El cost d'utilitzar un índex sempre és més petit que el de llegir la taula sencera.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 299,
    topic: "7. Physical Design",
    question: "Per estimar el cost d'accedir a una certa estructura, comptem només el cost corresponent a accedir els blocs de la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 300,
    topic: "7. Physical Design",
    question: "Per estimar el cost d'accedir a una certa estructura, comptem només el cost corresponent a accedir els blocs de disc.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 301,
    topic: "7. Physical Design",
    question: "El cost d'accés estimat per a una estructura d'accés, sempre ha de ser un nombre enter.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 302,
    topic: "7. Physical Design",
    question: "Els índexs tipus arbre i hash són molt útils quan l'atribut indexat té molts repetits.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 303,
    topic: "7. Physical Design",
    question: "Posar un índex sempre és útil, independentment del tipus de consulta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 304,
    topic: "7. Physical Design",
    question: "Posar índexs mai empitjorarà el temps de resposta del sistema.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 305,
    topic: "7. Physical Design",
    question: "El millor és sempre definir tants índexs com puguem, però sense arribar a omplir el disc del tot.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 306,
    topic: "7. Physical Design",
    question: "Els índexs tipus arbre i hash són molt útils en consultes amb condicions poc selectives.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 307,
    topic: "7. Physical Design",
    question: "Els índexs tipus hash només són útils si tinc una condició de selecció per igualtat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 308,
    topic: "7. Physical Design",
    question: "Els índexs són útils a qualsevol taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 309,
    topic: "7. Physical Design",
    question: "NO haig de definir un índex tipus arbre o hash si l'atribut té pocs valors.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 310,
    topic: "7. Physical Design",
    question: "Index-only query answering vol dir que el SGBD no accedirà la taula corresponent per a resoldre la consulta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  // --- TEMA 8: Query Optimization Phases (Preguntas 311-350) ---
  {
    id: 311,
    topic: "8. Query Optimization Phases",
    question: "¿En quina posició se situa l'optimització dins del procés de processament de consultes que du a terme el gestor de consultes?",
    options: { A: "Primera", B: "Segona", C: "Tercera", D: "Última" },
    correctAnswer: "D"
  },
  {
    id: 312,
    topic: "8. Query Optimization Phases",
    question: "L'optimització de consultes tradueix d'un llenguatge declaratiu a un de procedural.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 313,
    topic: "8. Query Optimization Phases",
    question: "¿Quina NO és una de les tres fases de l'optimització de consultes?",
    options: { A: "Sintàctica", B: "Semàntica", C: "Física", D: "Lògica" },
    correctAnswer: "D"
  },
  {
    id: 314,
    topic: "8. Query Optimization Phases",
    question: "L'optimització escaneja les taules involucrades en la consulta per a calcular les estadístiques que necessita.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 315,
    topic: "8. Query Optimization Phases",
    question: "L'optimitzador de consultes sempre troba el millor pla d'accés.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 316,
    topic: "8. Query Optimization Phases",
    question: "L'optimitzador prioritza acabar ràpid la tasca d'optimizació per davant de trobar el millor pla d'accés.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 317,
    topic: "8. Query Optimization Phases",
    question: "L'optimització semàntica canvia el llenguatge de representació de la consulta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 318,
    topic: "8. Query Optimization Phases",
    question: "L'optimització semàntica considera només la pròpia consulta i les lleis de la lògica.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 319,
    topic: "8. Query Optimization Phases",
    question: "L'optimització semàntica pot fer que el cost d'execució d'una consulta sigui zero.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 320,
    topic: "8. Query Optimization Phases",
    question: "L'optimització semàntica pot fer més curta la clàusula WHERE.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 321,
    topic: "8. Query Optimization Phases",
    question: "L'optimització semàntica pot fer més llarga la clàusula WHERE.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 322,
    topic: "8. Query Optimization Phases",
    question: "L'optimització sintàctica canvia el llenguatge de representació de la consulta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 323,
    topic: "8. Query Optimization Phases",
    question: "L'optimització sintàctica resol totes les vistes no-materialitzades que hi hagi a la consulta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 324,
    topic: "8. Query Optimization Phases",
    question: "L'optimització sintàctica canvia el cost de la consulta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 325,
    topic: "8. Query Optimization Phases",
    question: "Les dues regles heurístiques utilitzades a l'optimització sintàctica sempre milloren el cost de la consulta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 326,
    topic: "8. Query Optimization Phases",
    question: "¿Quina heurística utilitza l'optimització sintàctica?",
    options: { A: "Baixar les projeccions i seleccions tant com sigui possible", B: "Reduir el nombre d'operacions tant com sigui possible", C: "Pujar les projeccions i seleccions tant com sigui possible", D: "Reduir el cost de la consulta tant com sigui possible" },
    correctAnswer: "A"
  },
  {
    id: 327,
    topic: "8. Query Optimization Phases",
    question: "L'optimització sintàctica sempre redueix el nombre d'operacions a l'arbre sintàctic.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 328,
    topic: "8. Query Optimization Phases",
    question: "L'optimització sintàctica mai deixa una projecció just a sobre d'una fulla de l'arbre sintàctic.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 329,
    topic: "8. Query Optimization Phases",
    question: "Després de l'optimització sintàctica poden quedar dos subgrafs iguals a l'arbre sintàctic.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 330,
    topic: "8. Query Optimization Phases",
    question: "El resultat de l'optimització sintàctica sempre és un arbre.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 331,
    topic: "8. Query Optimization Phases",
    question: "L'optimització sintàctica mai elimina operacions de l'arbre sintàctic.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 332,
    topic: "8. Query Optimization Phases",
    question: "Si una selecció té un predicat complex, sempre la podem dividir en dues seleccions consecutives.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 333,
    topic: "8. Query Optimization Phases",
    question: "La selecció sempre commuta (sense posar ni treure res) amb la join.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 334,
    topic: "8. Query Optimization Phases",
    question: "La selecció sempre commuta (sense posar ni treure res) amb qualsevol operació de conjunts (es a dir, unió, intersecció i diferència).",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 335,
    topic: "8. Query Optimization Phases",
    question: "La selecció sempre commuta (sense posar ni treure res) amb la projecció.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 336,
    topic: "8. Query Optimization Phases",
    question: "La projecció sempre commuta (sense posar ni treure res) amb la join.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 337,
    topic: "8. Query Optimization Phases",
    question: "La projecció sempre commuta (sense posar ni treure res) amb qualsevol operació de conjunts (es a dir, unió, intersecció i diferència).",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 338,
    topic: "8. Query Optimization Phases",
    question: "¿Quines propietats compleix la join respecte a ella mateixa?",
    options: { A: "Commutativa", B: "Associativa", C: "Cap de les dues", D: "Totes dues" },
    correctAnswer: "D"
  },
  {
    id: 339,
    topic: "8. Query Optimization Phases",
    question: "¿Quin nom NO rep l'algorisme que segueix l'execution manager per obtenir el resultat d'una consulta?",
    options: { A: "Pla d'accés de la consulta", B: "Pla d'execució de la consulta", C: "Arbre de procés de la consulta", D: "Arbre d'execució de la consulta" },
    correctAnswer: "D"
  },
  {
    id: 340,
    topic: "8. Query Optimization Phases",
    question: "¿Qué NO considera l'optimització física per a generar el pla d'execució d'una consulta?",
    options: { A: "Les estructures físiques disponibles", B: "Els camins d'accés que permet el predicat de la consulta", C: "Els algorismes que té disponibles el SGBD", D: "Les propietats ACID" },
    correctAnswer: "D"
  },
  {
    id: 341,
    topic: "8. Query Optimization Phases",
    question: "¿Quina operació deixa de ser explícita en l'arbre de procés?",
    options: { A: "Join", B: "Projecció", C: "Unió", D: "Selecció" },
    correctAnswer: "B"
  },
  {
    id: 342,
    topic: "8. Query Optimization Phases",
    question: "L'arbre de procés mai té menys operacions que l'arbre sintàctic un cop optimitzat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 343,
    topic: "8. Query Optimization Phases",
    question: "L'arbre de procés mai té més operacions que l'arbre sintàctic un cop optimitzat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 344,
    topic: "8. Query Optimization Phases",
    question: "¿Qué NO genera alternatives en l'espai de cerca de la optimizació basada en costos?",
    options: { A: "Les estructures d'accés disponibles", B: "Els algorismes existents per cada operació", C: "L'ordre de les joins", D: "La utilització de la cache" },
    correctAnswer: "D"
  },
  {
    id: 345,
    topic: "8. Query Optimization Phases",
    question: "¿Quines propietats de la join utilitza l'optimització física per a generar possibles alternatives d'execució?",
    options: { A: "Associativitat i transitivitat", B: "Commutativitat i transitivitat", C: "Commutativitat i associativitat", D: "Totes tres propietats" },
    correctAnswer: "C"
  },
  {
    id: 346,
    topic: "8. Query Optimization Phases",
    question: "L'encarrilament (pipelining) és una tècnica d'execució de consultes que evita la materialització de resultats intermitjos.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 347,
    topic: "8. Query Optimization Phases",
    question: "L'encarrilament (pipelining) es pot fer servir només quan tenim un esquema en estrella.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 348,
    topic: "8. Query Optimization Phases",
    question: "Quan fem encarrilament (pipelining), l'ordre de les joins és ...",
    options: { A: "Decreixent (de més selectiva a menys selectiva)", B: "Creixent (de menys selectiva a més selectiva)", C: "Irrellevant", D: "El mateix que l'ordre dels atributs a la clau primària de la taula de fets" },
    correctAnswer: "A"
  },
  {
    id: 349,
    topic: "8. Query Optimization Phases",
    question: "El cost d'una operació de l'arbre de procés és el cost de llegir l'entrada i d'executar la pròpia operació.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 350,
    topic: "8. Query Optimization Phases",
    question: "El cost d'una consulta és la suma dels costos de totes les operacions del seu arbre de procés.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },

  // --- TEMA 9: Query Optimization Costs (Preguntas 351-392) ---
  {
    id: 351,
    topic: "9. Query Optimization Costs",
    question: "L'optimitzador calcula el cost de totes les alternatives d'execució que genera.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 352,
    topic: "9. Query Optimization Costs",
    question: "El factor de selecció de qualsevol operació és el percentatge de files al resultat respecte a mínim de files que podem tenir.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 353,
    topic: "9. Query Optimization Costs",
    question: "Un factor de selecció '1' és el més selectiu que pot haver.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 354,
    topic: "9. Query Optimization Costs",
    question: "La cardinalitat màxima d'una join coincideix amb la del producte cartesià.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 355,
    topic: "9. Query Optimization Costs",
    question: "El càlcul del factor de selecció de la UNION és el mateix que el de la UNION ALL.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 356,
    topic: "9. Query Optimization Costs",
    question: "El càlcul del factor de selecció de la join és el mateix que el de la intersecció.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 357,
    topic: "9. Query Optimization Costs",
    question: "Les cardinalitats dels resultats intermitjos es calculen top-down a l'arbre de procés.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 358,
    topic: "9. Query Optimization Costs",
    question: "El SGBD manté sempre actualitzades les estadístiques de les taules.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 359,
    topic: "9. Query Optimization Costs",
    question: "El SGBD típicament assumeix una distribució normal dels valors de cada atribut.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 360,
    topic: "9. Query Optimization Costs",
    question: "El SGBD típicament assumeix la independència estadística de tots els atributs de les taules.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 361,
    topic: "9. Query Optimization Costs",
    question: "El SGBD sempre calcula totes les estadístiques de la base de dades de cop.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 362,
    topic: "9. Query Optimization Costs",
    question: "El SGBD pot calcular les estadístiques de la base de dades només a partir d'un mostreig.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 363,
    topic: "9. Query Optimization Costs",
    question: "El factor de selecció d'un predicat mai pot ser '0'.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 364,
    topic: "9. Query Optimization Costs",
    question: "El factor de selecció d'un predicat mai pot ser '1'.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 365,
    topic: "9. Query Optimization Costs",
    question: "El factor de selecció d'una clàusula 'IN' és exactament el mateix que el d'un predicat complex amb la disjunció de les igualtats del mateix atribut amb cadascun dels valors al conjunt de la 'IN'.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 366,
    topic: "9. Query Optimization Costs",
    question: "¿Què NO afecta al factor de selecció d'una join?",
    options: { A: "Que un dels atributs sigui clau primària", B: "Que un dels atributs accepti valor nulls", C: "Que un dels atributs sigui clau forana", D: "Que un dels atributs tingui un check" },
    correctAnswer: "D"
  },
  {
    id: 367,
    topic: "9. Query Optimization Costs",
    question: "El factor de selecció de la θ-join amb '<>' és el mateix que el del producte cartesià.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 368,
    topic: "9. Query Optimization Costs",
    question: "La longitud d'un registre és la suma de les longituds dels seus atributs.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 369,
    topic: "9. Query Optimization Costs",
    question: "Estimem el nombre de registres a un bloc com la grandària del bloc dividit per la longitud del registre arrodonit per excés.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 370,
    topic: "9. Query Optimization Costs",
    question: "Estimem el nombre de blocs d'una taula com la cardinalitat de la taula dividida pel nombre de registres per bloc arrodonit per excés.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 371,
    topic: "9. Query Optimization Costs",
    question: "El primer pas per a processar una selecció d'un predicat complex és posar-ho en forma normal disjuntiva.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 372,
    topic: "9. Query Optimization Costs",
    question: "Si després de posar el predicat lògic d'una selecció en forma normal conjuntiva una de les condicions dins d'un parèntesi no permet utilitzar cap índex, llavors no podem utilitzar-ne cap tampoc a les altres condicions dins del parèntesi.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 373,
    topic: "9. Query Optimization Costs",
    question: "Si després de posar el predicat lògic d'una selecció en forma normal conjuntiva un dels parèntesi queda negat, simplement l'eliminem del procés.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 374,
    topic: "9. Query Optimization Costs",
    question: "La resolució de predicats de selecció amb operacions de llistes de RID, fa que no haguem de fer mai cap comprovació sobre les dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 375,
    topic: "9. Query Optimization Costs",
    question: "La resolució de predicats de selecció amb operacions de llistes de RID, fa que no haguem de fer mai un table scan.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 376,
    topic: "9. Query Optimization Costs",
    question: "Els index tipus arbre serveixen per avaluar clàusules lògiques amb qualsevol tipus de comparació.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 377,
    topic: "9. Query Optimization Costs",
    question: "Els index tipus hash serveixen per avaluar clàusules lògiques només amb comparacions per igualtat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 378,
    topic: "9. Query Optimization Costs",
    question: "Un bitmaps guarda un bit per cada fila de la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 379,
    topic: "9. Query Optimization Costs",
    question: "Un bitmap guarda una llista de bits per cada valor diferent de la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 380,
    topic: "9. Query Optimization Costs",
    question: "Les operacions amb bitmaps són equivalents a les operacions de llistes de RIDs.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 381,
    topic: "9. Query Optimization Costs",
    question: "Els índex tipus bitmaps serveixen per avaluar clàusules lògiques amb qualsevol tipus de comparació.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 382,
    topic: "9. Query Optimization Costs",
    question: "Un índex tipus arbre multi-atribut no necessàriament utilitza més espai que si indexem només el primer dels seus atributs.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 383,
    topic: "9. Query Optimization Costs",
    question: "Un índex tipus arbre multi-atribut permet resoldre qualsevol selecció amb un predicat lògic que involucri tots els atributs indexats.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 384,
    topic: "9. Query Optimization Costs",
    question: "L'ordre dels atributs en un índex tipus arbre multi-atribut és irrellevant per a les consultes que es puguin fer amb ell.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 385,
    topic: "9. Query Optimization Costs",
    question: "L'operació d'ordenació pot aparèixer en l'arbre de procés de consultes que NO tinguin ORDER BY.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 386,
    topic: "9. Query Optimization Costs",
    question: "Un índex tipus arbre es pot utilitzar per ordenar les dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 387,
    topic: "9. Query Optimization Costs",
    question: "Un índex tipus hash es pot utilitzar per ordenar les dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 388,
    topic: "9. Query Optimization Costs",
    question: "¿Quin algorisme d'ordenació a memòria utilitza el External Merge Sort?",
    options: { A: "Bubble Sort", B: "Quick Sort", C: "Cap", D: "És irrellevant" },
    correctAnswer: "D"
  },
  {
    id: 389,
    topic: "9. Query Optimization Costs",
    question: "El External Merge Sort requereix d'una zona d'espai temporal per a realitzar l'ordenació, de l'ordre de la grandària de la pròpia taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 390,
    topic: "9. Query Optimization Costs",
    question: "El nombre de vegades que l'algorisme External Merge Sort ha de llegir i escriure la taula es logarírmic respecte a la grandària de la pròpia taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 391,
    topic: "9. Query Optimization Costs",
    question: "L'operació de projecció sense eliminació de repetits no té cap cost associat quan la consulta té alguna altra operació.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 392,
    topic: "9. Query Optimization Costs",
    question: "L'eliminació de repetits considera les mateixes alternatives d'algorismes que l'ordenació.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },

  // --- TEMA 10: Query Optimization Costs: Join (Preguntas 393-416) ---
  {
    id: 393,
    topic: "10. Query Optimization Costs: Join",
    question: "Una estructura cluster incrementa l'espai requetis per les taules que l'ocupen.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 394,
    topic: "10. Query Optimization Costs: Join",
    question: "Una estructura cluster incrementa el cost d'accedir les dades de només una de les taules que l'ocupen.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 395,
    topic: "10. Query Optimization Costs: Join",
    question: "L'opció que dona el cost més baix per a fer una join es sempre tenir les dues taules en una estructura cluster.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 396,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Row Nested Loops és simètric.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 397,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Row Nested Loops requereix l'existència d'un índex a priori.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 398,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Row Nested Loops només es pot utilitzar si, en l'arbre de procés, l'operació de join esta situada directament sobre la taula de l'índex utilitzat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 399,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Row Nested Loops només es pot utilitzar si la comparació de la join és la igualtat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 400,
    topic: "10. Query Optimization Costs: Join",
    question: "El cost de l'algorisme de Row Nested Loops és sempre més baix si no hem d'accedir atributs de la taula interna que no siguin els del propi índex utilitzat per l'algorisme.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 401,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Row Nested Loops només permet utilitzar un índex tipus cluster si requerim atributs de la taula interna que no siguin els del propi índex.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 402,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Block Nested Loops sempre es pot utilitzar.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 403,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Block Nested Loops és simètric.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 404,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Block Nested Loops sempre té un cost més baix si posem la taula més gran al bucle extern.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 405,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Block Nested Loops requereix que una de les taules càpigui a memòria.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 406,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Hash-join requereix l'existència d'un índex tipus hash a priori.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 407,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Hash-join només es pot utilitzar si la comparació de la join és la igualtat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 408,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Hash-join és simètric.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 409,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Hash-join requereix que una de les taules càpigui a memòria.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 410,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Hash-join requereix dues passades si una de les taules no hi cap a memòria.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 411,
    topic: "10. Query Optimization Costs: Join",
    question: "Si la taula més petita no hi cap a memòria, l'algorisme de Hash-join particiona les dues.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 412,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Sort-Match només es pot utilitzar si la comparació de la join és la igualtat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 413,
    topic: "10. Query Optimization Costs: Join",
    question: "El cost de l'algorisme de Sort-Match depèn de la comparació de la join.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 414,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Sort-Match requereix que alguna de les taules estigui ordenada a priori.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 415,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Sort-Match requereix l'existència d'un índex cluster a priori.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 416,
    topic: "10. Query Optimization Costs: Join",
    question: "L'algorisme de Sort-Match deixa el resultat ordenat per l'atribut de join.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },

  // --- TEMA 11: Parametrization and Tuning (Preguntas 417-457) ---
  {
    id: 417,
    topic: "11. Parametrization and Tuning",
    question: "¿Quin NO és un dels tres espais d'un SGBD?",
    options: { A: "Logic", B: "Físic", C: "Conceptual", D: "Virtual" },
    correctAnswer: "C"
  },
  {
    id: 418,
    topic: "11. Parametrization and Tuning",
    question: "¿Que NO hi ha a l'espai logic d'un SGBD?",
    options: { A: "Files", B: "Vistes", C: "Columnes", D: "Taules" },
    correctAnswer: "B"
  },
  {
    id: 419,
    topic: "11. Parametrization and Tuning",
    question: "¿Que NO hi ha a l'espai virtual d'un SGBD?",
    options: { A: "Pàgines", B: "Clusters", C: "Particions", D: "Índexs", E: "Vistes", F: "Taules", G: "Tablespaces" },
    correctAnswer: "F"
  },
  {
    id: 420,
    topic: "11. Parametrization and Tuning",
    question: "¿Que NO hi ha a l'espai físic d'un SGBD?",
    options: { A: "Fitxers", B: "Índexs", C: "Blocks", D: "Extensions" },
    correctAnswer: "B"
  },
  {
    id: 421,
    topic: "11. Parametrization and Tuning",
    question: "Les extensions serveixen per a garantir que el sistema operatiu assigni espai físicament consecutiu al disc.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 422,
    topic: "11. Parametrization and Tuning",
    question: "Un Tablespace pot tenir associats més d'un fitxer.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 423,
    topic: "11. Parametrization and Tuning",
    question: "Els Tablespaces faciliten disposar d'espai il·limitat a la base de dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 424,
    topic: "11. Parametrization and Tuning",
    question: "Cal definir un Tablespace per a cada usuari del sistema.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 425,
    topic: "11. Parametrization and Tuning",
    question: "Cal definir un Tablespace per a cada patró d'accés diferent al sistema.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 426,
    topic: "11. Parametrization and Tuning",
    question: "Els paràmetres del SGBD serveixen per a configurar el comportament dels seus subsistemes (com ara el gestor de consultes, el planificador, o el gestor de dades).",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 427,
    topic: "11. Parametrization and Tuning",
    question: "El fillfactor és el percentatge màxim que pot tenir mai ple un bloc de la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 428,
    topic: "11. Parametrization and Tuning",
    question: "Reduir el fillfactor sempre fa que les taules ocupin més espai.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 429,
    topic: "11. Parametrization and Tuning",
    question: "Reduir el fillfactor fa que les modificacions de les dades sempre siguin més ràpides.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 430,
    topic: "11. Parametrization and Tuning",
    question: "El nombre de repeticions de cada valor es irrellevant per a la utilitat d'un índex tipus arbre.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 431,
    topic: "11. Parametrization and Tuning",
    question: "Un cop s'ha creat un índex tipus bitmap, es poden continuar fent insercions a la taula, però no de valors nous de l'atribut indexat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 432,
    topic: "11. Parametrization and Tuning",
    question: "Fer una inserció a una taula que té un índex tipus bitmap no incrementa la grandària de l'índex, tret que el valor de l'atribut corresponent no existís abans a la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 433,
    topic: "11. Parametrization and Tuning",
    question: "Fer una modificació (UPDATE) a una taula que té un índex tipus bitmap no incrementa la grandària de l'índex, tret que el nou valor assignat a l'atribut corresponent no existís abans a la taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 434,
    topic: "11. Parametrization and Tuning",
    question: "En el cas de l'índex bitmap, el factor de selecció indica el percentatge de blocs de la taula que caldrà accedir.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 435,
    topic: "11. Parametrization and Tuning",
    question: "L'índex tipus bitmap és especialment útil en atributs UNIQUE.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 436,
    topic: "11. Parametrization and Tuning",
    question: "¿Quin tipus d'índex és millor en cas de consultes que involucrin múltiples valors d'un atribut?",
    options: { A: "Hash", B: "Bitmap", C: "Arbre", D: "Cluster" },
    correctAnswer: "B"
  },
  {
    id: 437,
    topic: "11. Parametrization and Tuning",
    question: "¿Quin tipus d'índex es millor en cas que l'atribut indexat tingui moltes repeticions?",
    options: { A: "Bitmap", B: "Cluster", C: "Hash", D: "Arbre" },
    correctAnswer: "A"
  },
  {
    id: 438,
    topic: "11. Parametrization and Tuning",
    question: "L'índex tipus bitmap millora el temps de resposta d'una consulta quan el factor de selecció és inferior al 50%.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 439,
    topic: "11. Parametrization and Tuning",
    question: "L'índex tipus bitmap incrementa el grau de concurrència del sistema.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 440,
    topic: "11. Parametrization and Tuning",
    question: "L'índex tipus bitmap no es pot utilitzar si l'atribut indexat conté valors null.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 441,
    topic: "11. Parametrization and Tuning",
    question: "L'índex tipus bitmap facilita la comprovació d'unicitat en l'atribut corresponent.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 442,
    topic: "11. Parametrization and Tuning",
    question: "¿Quin tipus d'usuari s'encarrega del tuning de la base de dades?",
    options: { A: "Dissenyador", B: "Programador d'aplicacions", C: "Administrador", D: "Tots els anteriors" },
    correctAnswer: "D"
  },
  {
    id: 443,
    topic: "11. Parametrization and Tuning",
    question: "¿Què NO forma part de l'entrada del procés de millora del rendiment del sistema?",
    options: { A: "Llista d'operacions de modificació, juntament amb les seves freqüències", B: "Espai de disc disponible", C: "Llista d'operacions de consulta, juntament amb les seves freqüències", D: "Llista de restriccions d'integritat, juntament amb les probabilitats de ser violades", E: "Objectiu de rendiment a assolir" },
    correctAnswer: "D"
  },
  {
    id: 444,
    topic: "11. Parametrization and Tuning",
    question: "¿Què NO forma part de la sortida del procés de millora del rendiment del sistema?",
    options: { A: "Rescriptura de cada consulta (segons els criteris de l'optimització semàntica)", B: "Normalització/Desnormalització de les taules", C: "Conjunt de vistes materialitzades", D: "Conjunt d'índexs", E: "Particionament de les taules" },
    correctAnswer: "A"
  },
  {
    id: 445,
    topic: "11. Parametrization and Tuning",
    question: "¿Quina dada de les que no trobem al pla d'accés NO es rellevant per a fer tuning de l'execució de les consultes?",
    options: { A: "Nombre d'abraçades mortals (deadlocks)", B: "Temps en les cues de bloquejos", C: "Grandària del dietari (log)", D: "Nombre de bloquejos", E: "Hits a la cache" },
    correctAnswer: "C"
  },
  {
    id: 446,
    topic: "11. Parametrization and Tuning",
    question: "El nombre d'índexs que podem crear a una base de dades es lineal respecte al nombre de taules i atributs existents.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 447,
    topic: "11. Parametrization and Tuning",
    question: "L'única limitació que tenim per a crear índexs és l'espai de disc disponible.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 448,
    topic: "11. Parametrization and Tuning",
    question: "Un índex que no sigui de tipus cluster mai empitjorarà l'estimació del temps d'execució d'una consulta.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 449,
    topic: "11. Parametrization and Tuning",
    question: "És millor no posar índexos a les taules petites.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 450,
    topic: "11. Parametrization and Tuning",
    question: "Pot ser que un índex no millori el rendiment de cap operació DML concreta, però tot i així sigui bo crear-ho des del punt de vista del rendiment del sistema.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 451,
    topic: "11. Parametrization and Tuning",
    question: "El predicat de les consultes es irrellevant per a triar el tipus d'índex d'una taula.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 452,
    topic: "11. Parametrization and Tuning",
    question: "L'ordre dels atributs d'un índex multiatribut afecta a la seva utilitat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 453,
    topic: "11. Parametrization and Tuning",
    question: "Una taula pot tenir com a màxim un índex tipus cluster.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 454,
    topic: "11. Parametrization and Tuning",
    question: "Com més repeticions tingui un atribut, millor serà posar un índex tipus hash en comptes d'un arbre.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 455,
    topic: "11. Parametrization and Tuning",
    question: "Com més repeticions tingui un atribut, millor serà posar un índex tipus bitmap en comptes d'un arbre.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 456,
    topic: "11. Parametrization and Tuning",
    question: "L'algorisme greedy de selecció d'índexs és bàsicament el mateix que el de selecció de vistes materialitzades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 457,
    topic: "11. Parametrization and Tuning",
    question: "Quan utilitzem l'algorisme greedy, cal calcular el temps d'execució considerant també les estructures que no hi càpiguen, perquè podem guanyar l'espai necessari per elles eliminant una altra estructura que haguem triat amb anterioritat.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },

  // --- TEMA 12: Transactions (Preguntas 458-501) ---
  {
    id: 458,
    topic: "12. Transactions",
    question: "Pel que fa a l'aïllament, volem tenir només històries serials.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 459,
    topic: "12. Transactions",
    question: "El nivell d'aïllament read uncommitted només bloqueja escriptures.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 460,
    topic: "12. Transactions",
    question: "El nivell d'aïllament read committed manté tots els bloquejos fins al final de la transacció.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 461,
    topic: "12. Transactions",
    question: "El nivell d'aïllament repeatable read genera dos bloquejos per cada lectura.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 462,
    topic: "12. Transactions",
    question: "El nivell d'aïllament serializable sempre bloqueja tota la taula fins al final de la transacció.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 463,
    topic: "12. Transactions",
    question: "Com més garanties d'aïllament tinguem, millor serà el rendiment del sistema.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 464,
    topic: "12. Transactions",
    question: "¿Quin dels següents conceptes NO afecta al temps d'execució de la transacció?",
    options: { A: "Tipus de bloquejos", B: "Moment d'assignació del timestamp", C: "Nombre de bloquejos", D: "Moment d'alliberament dels bloquejos" },
    correctAnswer: "B"
  },
  {
    id: 465,
    topic: "12. Transactions",
    question: "¿Quina de les següents accions NO serveix per millorar el rendiment de les transaccions?",
    options: { A: "Trossejar les transaccions", B: "Assignar el timestamp el més tard possible", C: "Relaxar el nivell d'aïllament", D: "Eliminar bloquejos innecessaris", E: "Configurar l'interval de detecció de deadlock adequat", F: "Evitar (o endarrerir) l'accés a grànuls molt demandats", G: "Utilitzar les sentencies de DDL quan hi hagi pocs usuaris" },
    correctAnswer: "B"
  },
  {
    id: 466,
    topic: "12. Transactions",
    question: "El control de concurrència multi-versió fa que dues transaccions que s'executin concurrentment puguin llegir dades diferents.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 467,
    topic: "12. Transactions",
    question: "Amb control de concurrència multi-versió, cada operació d'escriptura genera una nova versió del grànul.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 468,
    topic: "12. Transactions",
    question: "Amb control de concurrència multi-versió, l'usuari ha de decidir quina versió del grànul llegeix.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 469,
    topic: "12. Transactions",
    question: "Amb control de concurrència multi-versió, les operacions de lectura no bloquegen mai res.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 470,
    topic: "12. Transactions",
    question: "Amb control de concurrència multi-versió, només hi ha bloquejos entre escriptures.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 471,
    topic: "12. Transactions",
    question: "Amb control de concurrència multi-versió, fer rollback d'una transacció és equivalent a eliminar les versions generades per la transacció.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 472,
    topic: "12. Transactions",
    question: "Amb control de concurrència multi-versió, tenim implícit una base de dades temporal amb temps de transacció.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 473,
    topic: "12. Transactions",
    question: "El principal problema del control de concurrència multi-versió, és que hem d'esborrar les versions obsoletes dels grànuls per a mantenir la grandaria de la base de dades dins d'uns límits.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 474,
    topic: "12. Transactions",
    question: "Fent vacuum, eliminem les versions obsoletes de les dades en el control de concurrència multi-versió.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 475,
    topic: "12. Transactions",
    question: "Amb un control de concurrència multi-versió basat en bloquejos, s'aplica un control de concurrència diferent depenent de si la transacció és read-only o read-write.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 476,
    topic: "12. Transactions",
    question: "Amb un control de concurrència multi-versió basat en bloquejos, les transaccions read-only assignen un timestamp ...",
    options: { A: "En acabar la transacció", B: "A l'inici de la transacció", C: "No n'assignen mai cap", D: "En intentar accedir un grànul bloquejat" },
    correctAnswer: "B"
  },
  {
    id: 477,
    topic: "12. Transactions",
    question: "Amb un control de concurrència multi-versió basat en bloquejos, les transaccions read-write assignen un timestamp ...",
    options: { A: "En intentar accedir un grànul bloquejat", B: "En acabar la transacció", C: "A l'inici de la transacció", D: "No n'assignen mai cap", E: "Al fer la primera operació d'escriptura" },
    correctAnswer: "B"
  },
  {
    id: 478,
    topic: "12. Transactions",
    question: "¿Quina NO és una raó per a necessitar una reconstrucció?",
    options: { A: "Incendi", B: "Fallada del disc", C: "Fallada elèctrica", D: "Totes les anteriors ho són" },
    correctAnswer: "C"
  },
  {
    id: 479,
    topic: "12. Transactions",
    question: "¿Quina de les quatre propietats ACID està relacionada principalment amb la restauració?",
    options: { A: "Atomicitat", B: "Consistència", C: "Aïllament", D: "Durabilitat" },
    correctAnswer: "A"
  },
  {
    id: 480,
    topic: "12. Transactions",
    question: "¿Quina de les quatre propietats ACID està relacionada principalment amb la reconstrucció?",
    options: { A: "Atomicitat", B: "Consistència", C: "Aïllament", D: "Durabilitat" },
    correctAnswer: "D"
  },
  {
    id: 481,
    topic: "12. Transactions",
    question: "¿Qué fa el gestor de la cache quan rep una petició de Fetch?",
    options: { A: "Llegeix de la memòria i escriu al disc", B: "Llegeix del disc i la memòria", C: "Llegeix del disc i escriu a la memòria", D: "Escriu tant al disc com a la memòria" },
    correctAnswer: "C"
  },
  {
    id: 482,
    topic: "12. Transactions",
    question: "¿Què fa el gestor de la cache quan rep una petició de Flush?",
    options: { A: "Escriu tant al disc com a la memòria", B: "Llegeix del disc i la memòria", C: "Llegeix de la memòria i escriu al disc", D: "Llegeix del disc i escriu a la memòria" },
    correctAnswer: "C"
  },
  {
    id: 483,
    topic: "12. Transactions",
    question: "¿Què NO es guarda al dietari?",
    options: { A: "Tipus d'operació", B: "Pla d'accés de la consulta", C: "Punter a l'operació anterior de la transacció", D: "Valor vell del grànul modificat", E: "Identificador de l'objecte", F: "Punter a l'operació següent de la transacció", G: "Valor nou del grànul modificat" },
    correctAnswer: "B"
  },
  {
    id: 484,
    topic: "12. Transactions",
    question: "¿Quan NO es fa un flush dels buffers del SGBD?",
    options: { A: "Durant un backup", B: "Quan el nombre de pàgines de memòria modificades supera un cert llindar", C: "Quan el dietari s'omple", D: "A intervals regulars", E: "Durant una operació de DDL" },
    correctAnswer: "E"
  },
  {
    id: 485,
    topic: "12. Transactions",
    question: "El Write Ahead Log Protocol estableix que abans de confirmar qualsevol operació de DML, aquesta s'ha d'escrivre al dietari (log).",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 486,
    topic: "12. Transactions",
    question: "¿Com evita el SGBD que s'ompli el dietari (log)?",
    options: { A: "Dedicant-li un disc de forma exclusiva", B: "Limitant el nombre d'escriptures al mínim indispensable", C: "Esborrant-ho i creant-ho de nou a intervals regulars", D: "Gestionant el fitxer com si fos cíclic" },
    correctAnswer: "D"
  },
  {
    id: 487,
    topic: "12. Transactions",
    question: "Si fem backups de forma regular, no ens cal el dietari (log) per a reconstruir la base de dades.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 488,
    topic: "12. Transactions",
    question: "Just quan acabem de fer un backup, podem esborrant el dietari (log).",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 489,
    topic: "12. Transactions",
    question: "Si configurem de forma adequada el dietari (log), no ens cal fer backups.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 490,
    topic: "12. Transactions",
    question: "Mentre s'executa un backup, el rendiment del sistema empitjora.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 491,
    topic: "12. Transactions",
    question: "És important posar el dietari (log) en un disc dedicat exclusivament per a ell, perquè així evitem moviments innecessaris del capçal i afavorim la seva escriptura seqüencial.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 492,
    topic: "12. Transactions",
    question: "Endarrerir els flush tan com sigui possible millora el rendiment del sistema.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 493,
    topic: "12. Transactions",
    question: "¿Quin NO és un problema provocat per que les transaccions read-write siguin innecessàriament llargues?",
    options: { A: "És més probable que el sistema falli durant la seva execució", B: "La pròpia transacció és probable que es bloquegi", C: "Altres transaccions han d'esperar massa", D: "En cas de fallida, la transacció trigarà molt a recuperar-se", E: "Totes les anteriors ho són" },
    correctAnswer: "E"
  },
  {
    id: 494,
    topic: "12. Transactions",
    question: "Trossejar les transaccions read-write millora el rendiment del sistema.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 495,
    topic: "12. Transactions",
    question: "El fet que trossejar una transacció afecti o no al seu aïllament depèn només d'ella mateixa i no de cap altra transacció que es pugui executar de forma concurrent.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 496,
    topic: "12. Transactions",
    question: "Les transaccions llargues són un problema tant pel control de concurrència, com per a la recuperació.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 497,
    topic: "12. Transactions",
    question: "Si concatenem (chain) dues transaccions, no s'alliberen els bloquejos de la primera fins que acaba la segona.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 498,
    topic: "12. Transactions",
    question: "Si concatenem (chain) dues transaccions, no s'alliberen els recursos (p.e., memoria) de la primera i aquests es reutilitzen en la segona, que manté la mateixa configuració (p.e., nivell d'aïllament).",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 499,
    topic: "12. Transactions",
    question: "Si totes les transaccions són prou curtes, no cal paral·lelitzar les escriptures i podem substituir el control de concurrència per un sistema de cues.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  },
  {
    id: 500,
    topic: "12. Transactions",
    question: "Si tenim prou memòria com per a contenir tota la base de dades, podem fer directament allà totes les operacions i no cal escriure mai al disc.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "B"
  },
  {
    id: 501,
    topic: "12. Transactions",
    question: "Si tenim un sistema que només fa lectures, podem prescindir tant dels mecanismes de control de concurrència com dels de recuperació.",
    options: { A: "Cert", B: "Fals" },
    correctAnswer: "A"
  }
 ];

// ------------------------------------------------------------------
  // 2. GENERACIÓN AUTOMÁTICA DE DATOS
  // ------------------------------------------------------------------
  const { questionsData, answers, topics } = useMemo(() => {
    const data = {};
    const ans = {};
    const top = {};

    allQuestionsArray.forEach(q => {
      data[q.id] = q;
      ans[q.id] = q.correctAnswer;
      
      if (!top[q.topic]) {
        top[q.topic] = { count: 0 };
      }
      top[q.topic].count += 1;
    });

    return { questionsData: data, answers: ans, topics: top };
  }, [allQuestionsArray]);

  // ------------------------------------------------------------------
  // 3. LÓGICA DEL QUIZ 
  // ------------------------------------------------------------------
  
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getQuestionsForMode = () => {
    let questions = [];
    
    if (markedMode && markedQuestions.length > 0) {
      questions = [...markedQuestions];
    } else if (reviewMode && incorrectQuestions.length > 0) {
      questions = [...incorrectQuestions];
    } else if (selectedTopics.length > 0) {
      allQuestionsArray.forEach(q => {
        if (selectedTopics.includes(q.topic)) {
          questions.push(q.id);
        }
      });
    } else {
      questions = Object.keys(answers).map(Number);
    }
    
    return shuffleArray(questions);
  };

  const currentQuestions = useMemo(() => getQuestionsForMode(), [mode, selectedTopics, reviewMode, markedMode, topics]);
  const currentQuestion = currentQuestions[currentQuestionIndex];
  
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answers[currentQuestion] === answer;
    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      if (!incorrectQuestions.includes(currentQuestion)) {
        setIncorrectQuestions(prev => [...prev, currentQuestion]);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setMode('results');
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, incorrect: 0 });
    setMode('menu');
    setSelectedTopics([]);
    setReviewMode(false);
    setMarkedMode(false);
  };

  const startQuiz = (isReview = false, isMarked = false) => {
    setReviewMode(isReview);
    setMarkedMode(isMarked);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, incorrect: 0 });
    setMode('quiz');
  };
  
  const toggleMarkQuestion = () => {
    if (markedQuestions.includes(currentQuestion)) {
      setMarkedQuestions(prev => prev.filter(q => q !== currentQuestion));
    } else {
      setMarkedQuestions(prev => [...prev, currentQuestion]);
    }
  };

  const handleTopicToggle = (topic) => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) {
        return prev.filter(t => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };

  const totalQuestions = Object.keys(questionsData).length;

  // ------------------------------------------------------------------
  // MENU MODE (Diseño Visual Mejorado)
  // ------------------------------------------------------------------
  if (mode === 'menu') {
    const allTopics = Object.keys(topics);
    const questionsInSelectedTopics = allQuestionsArray.filter(q => selectedTopics.includes(q.topic)).length;

    const toggleSelectAll = () => {
      if (selectedTopics.length === allTopics.length) {
        setSelectedTopics([]);
      } else {
        setSelectedTopics(allTopics);
      }
    };
    
    return (
      <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
        {/* Aumento el ancho máximo a max-w-5xl para desktop */}
        <div className="max-w-5xl mx-auto"> 
          {/* Cabecera Centrada */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-indigo-600 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
              <LayoutGrid size={32} className="text-indigo-600" />
              DBD Quiz - Práctica
            </h1>
            <p className="text-gray-500 mt-1">Disseny de Bases de Dades - Selecciona tu modo de estudio.</p>
          </div>

          {/* Modos Rápidos (Falladas y Marcadas) */}
          <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Zap size={20} className="text-amber-500" />
            Modos de Repaso Rápido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {incorrectQuestions.length > 0 ? (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 shadow-sm">
                <AlertCircle className="text-amber-600 mb-2" size={24} />
                <h3 className="font-bold text-amber-900">Falladas ({incorrectQuestions.length})</h3>
                <p className="text-sm text-gray-700 mb-4">Repasa las preguntas que has respondido incorrectamente.</p>
                <button
                  onClick={() => startQuiz(true, false)}
                  className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition text-sm"
                >
                  <RotateCcw size={16} className="inline mr-2" />
                  Iniciar Repaso
                </button>
              </div>
            ) : (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 shadow-sm opacity-60">
                <AlertCircle className="text-amber-600 mb-2" size={24} />
                <h3 className="font-bold text-amber-900">Falladas (0)</h3>
                <p className="text-sm text-gray-500 mb-4">¡Aún no tienes preguntas falladas!</p>
              </div>
            )}

            {markedQuestions.length > 0 ? (
              <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-5 shadow-sm">
                <BookmarkCheck className="text-purple-600 mb-2" size={24} />
                <h3 className="font-bold text-purple-900">Marcadas ({markedQuestions.length})</h3>
                <p className="text-sm text-gray-700 mb-4">Revisa el contenido que te interesa estudiar de nuevo.</p>
                <button
                  onClick={() => startQuiz(false, true)}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition text-sm"
                >
                  <BookmarkCheck size={16} className="inline mr-2" />
                  Iniciar Revisión
                </button>
              </div>
            ) : (
              <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-5 shadow-sm opacity-60">
                <BookmarkCheck className="text-purple-600 mb-2" size={24} />
                <h3 className="font-bold text-purple-900">Marcadas (0)</h3>
                <p className="text-sm text-gray-500 mb-4">Aún no has marcado ninguna pregunta.</p>
              </div>
            )}
          </div>

          {/* Selección de Temas para Test */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-600">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-green-600" />
              Seleccionar Temas
            </h2>

            {/* Botón Seleccionar Todos */}
            <button
              onClick={toggleSelectAll}
              className={`w-full p-3 rounded-lg font-semibold transition text-sm mb-4 border-2 ${
                selectedTopics.length === allTopics.length
                  ? 'bg-red-100 text-red-700 border-red-400 hover:bg-red-200'
                  : 'bg-indigo-100 text-indigo-700 border-indigo-400 hover:bg-indigo-200'
              }`}
            >
              {selectedTopics.length === allTopics.length ? 
                'Deseleccionar Todos' : `Seleccionar Todos (${totalQuestions} preguntas)`}
            </button>

            {/* Lista de Checkboxes por Tema */}
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 max-h-96 overflow-y-auto pr-2"> {/* Usamos 2 columnas en sm: y en desktop para mejor aprovechamiento */}
              {allTopics.map((topic) => (
                <div
                  key={topic}
                  onClick={() => handleTopicToggle(topic)}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${
                    selectedTopics.includes(topic)
                      ? 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <div className="font-medium text-gray-800">{topic}</div>
                    <div className="text-xs text-gray-500">{topics[topic].count} preguntas</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic)}
                    readOnly
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
                {/* Botón de Inicio del Test */}
                <button
                onClick={() => startQuiz()}
                disabled={selectedTopics.length === 0}
                className={`w-full px-6 py-4 rounded-lg font-bold transition text-lg flex items-center justify-center gap-2 ${
                    selectedTopics.length > 0
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-300'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
                >
                <TrendingUp size={24} />
                Empezar Test ({questionsInSelectedTopics} preguntas)
                </button>
                {selectedTopics.length === 0 && (
                <p className="text-red-500 text-center mt-2 text-sm">Selecciona al menos un tema para empezar.</p>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // RESULTS MODE
  // ------------------------------------------------------------------
  if (mode === 'results') {
    const total = score.correct + score.incorrect;
    const percentage = ((score.correct / total) * 100).toFixed(1);
    
    return (
      <div className="min-h-screen bg-gray-50 p-10 flex items-start justify-center">
        {/* Aumento el ancho máximo a max-w-5xl */}
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-5xl mx-auto w-full border-t-4 border-indigo-600 text-center"> 
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">🎉 Resultados del Test 🎉</h2>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center border-b-4 border-blue-200">
              <div className="text-4xl font-bold text-blue-600">{total}</div>
              <div className="text-gray-600 mt-2 font-medium">Preguntas Totales</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center border-b-4 border-green-200">
              <div className="text-4xl font-bold text-green-600">{score.correct}</div>
              <div className="text-gray-600 mt-2 font-medium">Aciertos</div>
            </div>
            <div className="bg-red-50 p-6 rounded-xl text-center border-b-4 border-red-200">
              <div className="text-4xl font-bold text-red-600">{score.incorrect}</div>
              <div className="text-gray-600 mt-2 font-medium">Fallos</div>
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-xl text-center mb-8 shadow-xl">
            <div className="text-6xl font-extrabold text-white mb-2">{percentage}%</div>
            <div className="text-indigo-200 text-xl font-medium">Rendimiento Total</div>
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-indigo-700 transition text-lg shadow-md shadow-indigo-300"
          >
            Volver al Menú Principal
          </button>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // QUIZ MODE
  // ------------------------------------------------------------------
  const questionContent = questionsData[currentQuestion];
  if (!questionContent) {
    return (
      <div className="min-h-screen bg-red-50 p-10 flex flex-col items-center justify-center">
        <AlertCircle className="text-red-600" size={48} />
        <h3 className="text-xl font-semibold text-red-800 mt-4">Error: Pregunta no encontrada</h3>
        <p className="text-red-700">El ID de la pregunta actual ({currentQuestion}) no existe en el array de datos.</p>
        <button onClick={resetQuiz} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Volver al Menú</button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      {/* Aumento el ancho máximo a max-w-5xl */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8 border-t-4 border-indigo-600">
          
          {/* Barra Superior e Indicadores */}
          <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-100">
            <button
              onClick={resetQuiz}
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition flex items-center"
            >
              ← Terminar Test
            </button>
            <div className="flex items-center gap-6">
              <div className="flex gap-3 text-base font-semibold">
                <span className="text-green-600">✓ {score.correct}</span>
                <span className="text-red-600">✗ {score.incorrect}</span>
              </div>
              <div className="text-lg font-bold text-gray-700">
                {currentQuestionIndex + 1} / {currentQuestions.length}
              </div>
            </div>
          </div>

          {/* Barra de Progreso */}
          <div className="bg-gray-200 rounded-full h-2.5 mb-8">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>

          {/* Área de la Pregunta */}
          <div className="mb-8">
            <div className="text-sm text-indigo-500 font-semibold mb-2 flex justify-between items-center">
                <span>Tema: {questionContent.topic}</span>
                <button
                    onClick={toggleMarkQuestion}
                    className={`flex items-center gap-1 text-sm transition ${
                      markedQuestions.includes(currentQuestion)
                        ? 'text-purple-600 font-bold'
                        : 'text-gray-500 hover:text-purple-600'
                    }`}
                    title={markedQuestions.includes(currentQuestion) ? 'Desmarcar pregunta' : 'Marcar para revisar'}
                >
                    {markedQuestions.includes(currentQuestion) ?
                    (<BookmarkCheck size={18} />) : (<Bookmark size={18} />)}
                    {markedQuestions.includes(currentQuestion) ? 'Marcada' : 'Marcar'}
                </button>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 leading-relaxed text-left">
              {questionContent.question}
            </h3>
          </div>

          {/* Opciones de Respuesta */}
          <div className="space-y-4">
            {questionContent.options && Object.entries(questionContent.options).map(([optionKey, optionText]) => {
              const isSelected = selectedAnswer === optionKey;
              const isCorrect = answers[currentQuestion] === optionKey;
              const showCorrect = showResult && isCorrect;
              const highlightIncorrect = showResult && !isCorrect; 
              
              return (
                <button
                  key={optionKey}
                  onClick={() => !showResult && handleAnswer(optionKey)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg border-2 text-left shadow-sm transition duration-200 ${
                    showCorrect
                      ? 'bg-green-50 border-green-600 font-bold' 
                      : isSelected && !isCorrect
                      ? 'bg-red-100 border-red-600 font-bold'
                      : highlightIncorrect
                      ? 'bg-red-50/70 border-red-200' // Rojo muy claro
                      : isSelected
                      ? 'border-indigo-600 bg-indigo-50 font-semibold text-indigo-800'
                      : 'border-gray-200 bg-white hover:border-indigo-300'
                  } ${showResult ? 'cursor-not-allowed' : 'hover:shadow-md'}`}
                >
                  <div className="flex items-center justify-between text-base">
                    <span className="font-semibold mr-3 text-gray-700">{optionKey}:</span>
                    <span className="flex-1 text-gray-800 text-left">{optionText}</span> 
                    {showCorrect && <CheckCircle className="text-green-600 ml-3" size={24} />}
                    {showResult && !isCorrect && isSelected && <XCircle className="text-red-600 ml-3" size={24} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback y Botón Siguiente */}
          {showResult && (
            <div className="mt-8 pt-4 border-t border-gray-100">
              <div className={`p-4 rounded-lg ${
                selectedAnswer === answers[currentQuestion]
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-red-50 border-2 border-red-500'
              }`}>
                <p className="font-bold text-lg mb-1">
                  {selectedAnswer === answers[currentQuestion] ? '¡Respuesta Correcta! ✅' : 'Respuesta Incorrecta ❌'}
                </p>
                <p className="text-sm text-gray-700">
                  La respuesta correcta era: <strong>{answers[currentQuestion]}</strong>.
                </p>
              </div>

              <button
                onClick={nextQuestion}
                className="w-full mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition text-lg shadow-md shadow-indigo-300"
              >
                {currentQuestionIndex < currentQuestions.length - 1 ? 'Siguiente Pregunta →' : 'Finalizar y Ver Resultados'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DBDQuizApp;
