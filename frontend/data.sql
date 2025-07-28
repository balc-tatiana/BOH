create database boh;
show databases;
use boh;
show tables;
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activity_type VARCHAR(50),
    activity_cost VARCHAR(50),
    description TEXT,
    activity_city VARCHAR(50),
    activity_startdate TIMESTAMP,
    activity_enddate TIMESTAMP,
    activity_deletedate TIMESTAMP,  -- We'll calculate this manually later
    activity_img VARCHAR(255),
    activity_minage INT,
    activity_title VARCHAR(255),
    activity_zipcode VARCHAR(10),
    activity_coord_lat DECIMAL(10, 6),
    activity_coord_lng DECIMAL(10, 6),
    activity_organizer_ID INT,
    activity_organizer_name VARCHAR(255),
    activity_contact_phone VARCHAR(20),
    activity_contact_email VARCHAR(100),
    activity_contact_media VARCHAR(50),
    activity_link_media VARCHAR(100),
    activity_form VARCHAR(2000)
);
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_phonenumber VARCHAR(20),  -- Noua coloană pentru numărul de telefon
    user_type VARCHAR(50)          -- Noua coloană pentru tipul utilizatorului
);

INSERT INTO activities (
    activity_type,
    description,
    activity_city,
    activity_startdate,
    activity_enddate,
    activity_deletedate,
    activity_img,
    activity_minage,
    activity_title,
    activity_zipcode,
    activity_coord_lat,
    activity_coord_lng,
    activity_organizer_ID,
    activity_organizer_name,
    activity_contact_phone,
    activity_contact_email
) VALUES 
(
    'Outdoor',
    'A guided hiking trip through the national park with experienced guides.',
    '2025-05-10 09:00:00',
    '2025-05-10 16:00:00',
    NULL,
    'hiking_trip.jpg',
    12,
    'National Park Hike',
    '90210',
    34.090009,
    -118.406500,
    1,
    'Nature Explorers Club',
    '555-123-4567',
    'info@natureexplorers.com'
),
(
    'Workshop',
    'A weekend pottery class for beginners with all materials included.',
    '2025-06-01 10:00:00',
    '2025-06-02 14:00:00',
    NULL,
    'pottery_class.jpg',
    16,
    'Beginner Pottery Workshop',
    '10001',
    40.712776,
    -74.005974,
    2,
    'Art & Clay Studio',
    '555-987-6543',
    'contact@artandclay.com'
);
select * from users;
INSERT INTO users (
    name,
    email,
    password,
    user_phonenumber,
    user_type
) VALUES 
(
    'Alice Johnson',
    'alice.johnson@example.com',
    '$2y$10$abcd1234hashedpasswordexample1',  -- Example bcrypt hash
    '555-111-2222',
    'organizer'
),
(
    'Bob Martinez',
    'bob.martinez@example.com',
    '$2y$10$abcd1234hashedpasswordexample2',  -- Example bcrypt hash
    '555-333-4444',
    'participant'
);
describe users;
INSERT INTO activities (
    activity_type,
    activity_cost,
    description,
    activity_city,
    activity_startdate,
    activity_enddate,
    activity_deletedate,
    activity_img,
    activity_minage,
    activity_title,
    activity_zipcode,
    activity_coord_lat,
    activity_coord_lng,
    activity_organizer_ID,
    activity_organizer_name,
    activity_contact_phone,
    activity_contact_email,
	activity_contact_media,
    activity_link_media,
    activity_form 
) VALUES 
(
    'eveniment caritabil;cultural;artistic,contracost;fizic',
    '35 lei',
    '  🎩✨ Intri în universul enigmatic al lui Magritte? 🌙🕊️

Pathway to Magritte’s Soul – Un bal mascat dedicat imaginației și visării.
📆 12 aprilie | ⏰ 17:00 | 📍 Flavours Hub, Aleea Băișoara 2a
🎟️ Donație minimă: 35 lei.

Banii vor fi donați către Book Truck, un proiect care aduce cărți și lectură copiilor din zonele rurale cu acces limitat la tehnologie și resurse. 🚚📚 Astfel, fiecare donație va contribui la aducerea bucuriei lecturii direct în com
 comunitățile lor.
 
Vino să explorezi misterul, să porți o mască și să contribui la un viitor în care fiecare copil are acces la lectură și imaginație. ✨🎨',
	'Cluj-Napoca',
    '2025-05-12 17:00:00',
    '2025-05-12 21:00:00',
    '2025-05-30 00:00:00',
    'pozaA_1.jpeg;pozaA_2.jpeg;pozaA_3.jpeg;pozaA_4.jpeg',
     14,
    'Bal mascat Magritte',
    '010101',
    46.7718,
    23.6230,
    1,
    'Interact Transilvania',
	'074483249',
    'interact.transilvania@gmail.com',
    'interacttransilvania',
    'https://www.instagram.com/interacttransilvania/',
     'NU'
),
(
    'Cursuri;gratuit',
     'Gratuit',
    'EduMate este o echipă de pasionaţi de matematică, formată din olimpici și profesori dedicaţi, gata să ajute elevii de clasa a VIII-a să obţină o notă mare la Evaluarea Națională!
Cu experiență în predare și competiții, echipa noastră își dorește să facă matematica mai accesibilă și să oferim suportul de care este nevoie pentru succes!
EduMate - proiect marca ProTv și School of Health',
	'online',
    '2025-02-14 00:00:00',
    '2025-06-25 00:00:00',
    '2025-06-20 00:00:00',
    'pozaB_1.png',
     14,
    'EduMate',
    '010101',
    45.9432,
    24.9668,
    2,
    'Flavia Tămaș',
    '+40 747 772 474',
    'flaviatamas25@gmail.com',
    'asociatia.edumate',
    'https://www.instagram.com/asociatia.edumate?igsh=c2RkdHpwdTZyNTU4',
    'https://docs.google.com/forms/d/e/1FAIpQLSe4hCJl0A5nIUXAsHbCxT8RBWaRidt5Tr1HtV5hmjfRguV8sg/viewform?fbclid=PAQ0xDSwJ5kBNleHRuA2FlbQIxMAABpwdrD8-b9zUFqiPxplMqXzXAUnRpHY3IDcY_MMxWUOk8LN-Z31dtfQqJvGHK_aem_v51ElL4bc5NfXhfrBlUA1Q'
),
(
    'voluntariat;ecologie;gratuit;fizic',
	'Gratuit',
    ' 🌍Rețeaua Liceenilor pentru Mediu, în parteneriat cu Banca de Alimente și Luna Cleaning, te invită la Green Day - Ecologizare și Picnic, o experiență hands-on pentru amatorii de experiențe faine! 
Trebuie doar să aduci  un strop de chef de muncă și mult drag de pădure, iar noi te așteptăm cu toate cele necesare: mănuși, saci de gunoi. Apă te rugăm să-ți aduci de acasă, în recipient reutilizabil. Noi asigurăm refill-ul!

Activitatea este în două părți:
♻️ECOLOGIZARE: strângem și selectăm gunoaiele din Pădurea Făget, pe drumul care duce la Sălicea

💫 What’s in it for you?
🌿 Contribui la un viitor mai verde
🗣️Demonstrezi că „tinerii din ziua de azi” sunt responsabili și angajați
👥 Întâlnești oameni noi
🫶🏼 Trăiești o experiență unică!
Plecare: 8:45 din stația de autobuz Posada (autobuzul pleacă la ora 9:00) https://maps.app.goo.gl/93PnuouRHj6sX5wTA în față la parcarea de la Catedrala Cipariu.
    ',
    'Pădurea Făget și satul Sălicea, Cluj',
    '2025-05-01 08:45:00',
    '2025-05-01 12:00:00',
    '2025-05-26 00:00:00',
    'pozaD_1.jpeg',
	15,
    'Green Day',
    '010100',
    46.6781,
     23.5980,
    3,
    'Rețeaua Liceenilor pentru Mediu',
    '0799740299',
    'org3@email.com',
    'reteaua_liceenilor_pt_mediu',
    'https://www.instagram.com/reteaua_liceenilor_pt_mediu?igsh=MXg4dXZlcGN1bmNoOQ==',
    'https://docs.google.com/forms/d/e/1FAIpQLSf4BaEsMq2hwMwAfq1Sxp-5C7FMI4uf0IDfBaf2i5gtBl4Ixw/viewform'
),
(
    'Dezbateri;Educație;gratuit;fizic',
	'Gratuit',
    'Proiectul național Simularea Parlamentului European (SimPE),  se construiește în jurul procesului decizional de la nivelul instituției co-legislative a Uniunii Europene, simulând modul de desfășurare a negocierilor și dezbaterilor din cadrul acesteia, respectiv modul de organizare a ședințelor grupurilor politice, comisiilor și adunărilor plenare. 
     Grup țintă: tineri între 18-35 de ani din toată țara',
    'Cluj-Napoca',
    '2025-06-30 00:00:00',
    '2025-07-06 00:00:00',
    '2025-08-26 00:00:00',
    'pozaC_1.jpeg;pozaC_2.jpeg;pozaC_3.jpeg;pozaC_4.jpeg',
	18,
    'Simularea Parlamentului European',
    '010101',
    46.7681,
   23.5924,
    4,
    'Societatea Studenților Europeniști-sse Cluj',
    '0787733556',
    'presedintesse@gmail.com',
    'simpe_oficial',
    'https://www.instagram.com/simpe_oficial/',
    'NU'
),
(
    'Muzica;Dans;Psihologie;gratuit;fizic',
	'Gratuit',
    '🎶 Workshopul „Terapie prin muzică și dans” este un spațiu unde muzica și mișcarea se întâlnesc pentru a-ți elibera emoțiile și a te ghida pe drumul auto-descoperirii. 🌱
💃 Nu este vorba de coregrafii sau pași calculați. Este despre împărtășirea trăirilor tale prin fiecare mișcare, despre cum ritmul și sunetul te ajută să te conectezi cu tine însuți.',
    'HUB UTCN, Strada George Barițiu, nr. 4,Cluj-Napoca',
    '2025-05-06 18:00:00',
    '2025-05-06 20:00:00',
    '2025-08-26 00:00:00',
    'pozaE_1.png;pozaE_2.png',
	16,
    'Workshop MindPower – Terapie prin muzică și dans',
    '010101',
    46.773500,
    23.587100,
    5,
    'Cooltural Osut-Coordonator Șeulean Dragoș Oliviu',
    '0758026098',
    'dragosseuo@gmail.com',
    'cooltural.osutcj',
    'https://www.instagram.com/cooltural.osutcj?igsh=d3lhY3I2d2IzdHZm',
    'http://bit.ly/3EFcHhb'
),
(
    'Arta;Cultura;expoziție de artă;vernisaj artistic;gratuit;fizic',
	'Gratuit',
    'Data: 23-25 mai 
Ora începerii activităților: vineri (23): 14:00-15:00, sâmbătă (24) și duminică (25): aprox 12:00
Ora de închidere: aprox. 20:00 în fiecare zi 
    Descriere: Tête-à-Tête [fr. - cap la cap] 1 Conversație între patru ochi. 2 Întâlnire a două persoane. 3 Conversație intimă.
Pentru noi, Interact Transilvania, Tête-à-Tête este mai mult decât atât. Este artă, esentă, convergență, confesiune, speranță, pace, magie, complexitate, pasiune, o conexiune între oameni, dar și între om și artă. Scopul galeriei este cel de a crea un spatiu unde arta devine poveste și fiecare artist îsi dezvăluie universul interior. Aici, emoția primează, iar lucrările expuse nu sunt doar imagini, ci fragmente din sufletele creatorilor. De-a lungul anilor, Tête-à-Tête a evoluat, adunând nu doar tablouri, ci și instalați, fotografii, pertormance-uri și alte forme de expresie artistică, creând o experiență completă, intensă și personală.
',
    'urmează să fie comunicată ,Cluj-Napoca',
    '2025-05-23 14:00:00',
    '2025-05-25 20:00:00',
    '2025-08-26 00:00:00',
    'pozaG_1.png',
	16,
    'Tête-à-Tête 3',
    '010101',
    46.7713,
    23.5961,
    6,
    'Interact Transilvania',
    '0737772770',
    'tete.a.tete.interact.transilvania@gmail.com',
    'teteatete.gallery',
    'https://www.instagram.com/teteatete.gallery?igsh=MXZ2M3k2cWh4MmszbQ==',
    'NU'
),
(
    'educational;workshop;medicina;contracost;fizic',
	'70 lei',
    'Workshopul „Medlab – branule și injecții” oferă elevilor de liceu oportunitatea de a învăța și exersa tehnici medicale de bază, precum montarea branulelor și administrarea injecțiilor, într-un mediu controlat și sub supravegherea specialiștilor.',
    'Colegiul Național ,,Mihai Viteazul” Turda ',
    '2025-05-09 17:00:00',
    '2025-05-09 19:00:00',
    '2025-08-26 00:00:00',
    'pozaH_1.png;pozaH_2.png',
	12,
    'Medlab-workshop branule și injecții',
    '010101',
     46.5751,
    23.7783,
    7,
    'Interact Potaissa Turda',
    '0758024098',
    'interactpotaissaturda@gmail.com',
    'interactpotaissa',
    'https://www.instagram.com/interactpotaissa?igsh=dXczeGplYnhzdXhz',
    'NU'
),
(
    'Arta;Psihologie;gratuit;fizic',
	'Gratuit',
    'Îți alegi hainele sau hainele te aleg pe tine?🧥

Felul în care ne îmbrăcăm spune multe despre cine suntem, ce simțim și cum vrem să fim percepuți.

La următorul workshop marca MindPower vorbim despre stil ca formă de autocunoaștere: încredere, emoții și identitate – toate puse în oglindă prin hainele pe care le porți.

📅 8 mai 
🕕 18:00
📍 HUB UTCN',
    'HUB UTCN, Strada George Barițiu, nr. 4,Cluj-Napoca',
    '2025-05-08 18:00:00',
    '2025-05-08 20:00:00',
    '2025-08-26 00:00:00',
    'pozaF_1.png;pozaF_2.png',
	16,
    'Workshop MindPower - Autocunoastere',
    '010101',
    46.773640,
    23.587290,
    8,
    'Cooltural Osut-Coordonator Șeulean Dragoș Oliviu',
    '0758026098',
    'dragosseuo@gmail.com',
    'cooltural.osutcj',
    'https://www.instagram.com/cooltural.osutcj?igsh=d3lhY3I2d2IzdHZm',
    'http://bit.ly/3EFcHhb'
),
(
    'sportiv;turneu;handbal;gratuit;fizic',
    'Gratuit',
    '🏆 Turneul Semifinal 2 Valoare Juniori 3 masculin, Grupa 3 🏐 se va organiza în Cluj-Napoca, în perioada 02–04 mai 2025.',
    'Liceul Tehnologic Ana Aslan Cluj-Napoca',
    '2025-05-02 08:00:00',
    '2025-05-05 20:00:00',
    '2025-05-30 00:00:00',
    'pozaK_1.jpeg;pozaK_2.jpeg;pozaK_3.jpeg;pozaK_4.jpeg',
    0,
    'Turneu Semifinal Handbal Juniori 3',
    '010101',
    46.7812,
    23.6126,
    9,
    'AHC Cluj Napoca 2021',
    '074447440',
    'ahc@gmail.com',
    'ahcclujnapoca2021',
    'https://www.facebook.com/ahcclujnapoca2021',
    'NU'
),
(
    'sportiv;turneu;handbal;gratuit;fizic',
    'Gratuit',
    '🏆 Turneul Semifinal 2 Valoare Juniori 4 masculin, Grupa 3 🏐 se va organiza în Cluj-Napoca, în perioada 10–12 mai 2025.',
    'Liceul cu Program Sportiv, Cluj-Napoca',
    '2025-05-10 08:00:00',
    '2025-05-012 20:00:00',
    '2025-06-30 00:00:00',
    'pozaJ_1.jpeg;pozaJ_2.jpeg;pozaJ_3.jpeg;pozaJ_4.jpeg',
    0,
    'Turneu Semifinal Handbal Juniori 4',
    '010101',
    46.7715,
	23.6030,
    10,
    'AHC Cluj Napoca 2021',
    '074447440',
    '-',
    'ahcclujnapoca2021',
    'https://www.facebook.com/ahcclujnapoca2021',
    'NU'
),
(
    'educational;workshop;tehnologie;robotica;gratuit;fizic',
    'Gratuit',
    'În acest sezon, am dat startul unei serii de workshop-uri captivante intitulată Youth Craft, dedicată inteligenței artificiale, organizate în parteneriat cu Yonder și Zbor Hub. Participanții au explorat impactul AI-ului asupra societății, etica utilizării tehnologiei, inovația digitală și trasee profesionale posibile în acest domeniu.\nEvenimentele i-au avut ca invitați speciali pe Daniel Pop, Mihai Deaconu, Robert Horodan și Paul Cîrstean – Head of Innovation la Yonder – care au adus perspective valoroase și inspiraționale din industrie.\nLe mulțumim tuturor celor care au fost alături de noi și au contribuit la conturarea unui mediu de învățare autentic, deschis și orientat spre viitor.(Destinat in general elevilor de liceu',
    'Zbor Hub Cluj-Napoca',
    '2025-02-13 00:00:00',
    '2025-02-21 23:59:59',
    '2025-03-10 00:00:00',
    'pozaI_1.png;pozaI_2.jpeg;pozaI_3.jpeg',
    14,
    'Youth Craft-robotics',
    '010101',
    46.770439,
    23.591423,
    11,
    'Porumb Patricia',
    '0770892372',
    'patriciaporumb10@gmail.com',
    'phoenix.ro026',
    'https://www.instagram.com/phoenix.ro026?igsh=MTFjYmY1cjN5bmRzYQ==',
    'NU'
),
(
    'concurs;voluntariat;tehnologie,STEM;gratuit;fizic',
    'Gratuit',
    'Technovation Girls este un program global care încurajează fetele să dezvolte soluții tehnologice pentru problemele din comunitatea lor. Participantele, cu vârste între 14 și 18 ani, lucrează în echipe pentru a crea aplicații mobile și planuri de afaceri, beneficiind de mentorat și resurse educaționale. Programul se desfășoară în perioada octombrie 2024 – mai 2025 și este susținut de ADFABER în România.',
    'București',
    '2024-10-01 00:00:00',
    '2025-05-31 23:59:59',
    '2025-06-15 00:00:00',
    'pozaL_1.png;pozaL_2.jpg;pozaL_jpeg',
    8,
    'Technovation Girls',
    '011241',
    44.4605,
    26.0824,
    12,
    'ADFABER',
    '+40 763 862 398',
    'hello@adfaber.org',
    'adfaber.org',
    'https://adfaber.org/',
    'https://technovationchallenge.org/'
),
(
    'curs;tehnologie;gratuit;fizic',
    'Gratuit',
    'Programul „The Girls Code – Breaking Barriers” este o inițiativă dedicată sprijinirii și încurajării fetelor în tehnologie. Organizat de Asociația Adfaber cu sprijinul Google.org, programul reprezintă un pas important în înlăturarea prejudecăților și promovarea diversității în domeniul IT. Se adresează elevelor din învățământul liceal (14–18 ani), părinților și profesorilor.',
    'România',
    '2024-11-01 00:00:00',
    '2025-06-30 23:59:59',
    '2025-07-15 00:00:00',
    'pozaM_1.png;',
    14,
    'Breaking Barriers',
    '000000',
    45.7600,
     25.3800,
    13,
    'ADFABER',
    '+4 0745 984 391',
    'hello@adfaber.org',
    'adfaber.org',
    'https://adfaber.org/',
    'https://adfaber.org/en/breaking-barriers/'
),
(
    'expoziție;gratuit;fizic',
    'Gratuit',
    'Cea de-a V-a ediție a Lunii Sculptorilor Români reunește nume importante în cadrul celui mai amplu eveniment dedicat sculpturii din România, organizat de Ateneul Național din Iași, cu sprijinul Primăriei Municipiului Iași.',
    'Iași',
    '2025-02-19 10:00:00',
    '2025-03-19 17:00:00',
    '2025-03-20 00:00:00',
    'pozaN_1.jpeg;pozaN_2.jpeg;pozaN_3.jpeg;pozaN_4.jpeg',
    0,
    'Luna Sculptorilor Români – Ediția a V-a',
    '700259',
    47.1614,
    27.5756,
    14,
    'Ateneul Național din Iași',
    '+40 232 267 547',
    'contact@ateneuiasi.ro',
    'ateneuiasi.ro',
    'https://ateneuiasi.ro/',
    'NU'
),
(
    'atelier;gratuit;fizic',
    'Gratuit',
    'Atelierele DICE: D(istractiv)-I(nteractiv)-C(reativ)-E(ducativ) continuă la Palatul Culturii din Iași cu o temă specifică acestei perioade, menită să readucă în atenție tradiția Mărțișorului.',
    'Iași',
    '2025-02-19 10:00:00',
    '2025-03-08 17:00:00',
    '2025-03-09 00:00:00',
    'pozaO.1_jpeg;pozaO.2_jpeg;pozaO.3_jpeg',
    5,
    'Ateliere DICE dedicate Mărțișorului',
    '700259',
    47.1532,
    27.5945,
    15,
    'Complex Muzeal Național „Moldova” Iași',
    '+40 232 275 979',
    'contact@palatulculturii.ro',
    'palatulculturii.ro',
    'https://palatulculturii.ro/',
    'NU'
),
(
    'spectacol;contracost;gratuit;fizic',
    '50 lei',
    'Spectacolul „Chirița în provinție” rămâne inepuizabila capodoperă dramatică românească, prezentată la Teatrul Național „Vasile Alecsandri” din Iași.',
    'Iași',
    '2025-03-30 16:00:00',
    '2025-03-30 18:00:00',
    '2025-03-31 00:00:00',
    'pozaP_1.jpeg;pozaP_2.jpeg;pozaP_3.jpeg;pozaP_4.jpeg',
    12,
    'Chirița în provinție',
    '700033',
    47.1647,
    27.5789,
    16,
    'Teatrul Național „Vasile Alecsandri” Iași',
    '+40 232 255 999',
    'contact@teatrulnationaliasi.ro',
    'teatrulnationaliasi.ro',
    'https://teatrulnationaliasi.ro/',
    'NU'
),
(
    'festival;gratuit;fizic',
    'Gratuit',
    'Ediția a 13-a a JAZZx aduce în Timișoara inspirația și talentul artiștilor români și străini, punând în valoare muzica de calitate și conexiunile autentice.',
    'Timișoara',
    '2025-07-01 18:00:00',
    '2025-07-07 23:00:00',
    '2025-07-08 00:00:00',
    'pozaR_1.jpeg;pozaR_2.jpeg',
    0,
    'JAZZx 2025',
    '300085',
    45.7579,
    21.2292,
    17,
    'Primăria Municipiului Timișoara',
    '+40 256 408 300',
    'contact@primariatm.ro',
    'primariatm.ro',
    'https://primariatm.ro/',
    'NU'
),
(
    'festival;gratuit;fizic',
    'Gratuit',
    'Ceau, Cinema! revine cu ediția a 12-a, aducând în Timișoara cele mai captivante filme europene și românești, întâlniri cu cineaști, ateliere și evenimente speciale.',
    'Timișoara',
    '2025-07-16 10:00:00',
    '2025-07-20 22:00:00',
    '2025-07-21 00:00:00',
    'pozaS.1_jpeg;pozaS.2_jpeg;pozaS.3_jpeg',
    0,
    'Ceau, Cinema! 2025',
    '300085',
	45.7601,
    21.2350,
    18,
    'Asociația Marele Ecran',
    '+40 256 408 300',
    'contact@mareleecran.ro',
    'mareleecran.ro',
    'https://mareleecran.ro/',
    'NU'
),
(
    'atelier;tabara;gratuit;fizic',
    'Gratuit',
    'Școala de vară „Cadre și Forme în Dansul Contemporan” conectează scena locală timișoreană cu tendințele internaționale, aducând dansul mai aproape de oameni.',
    'Timișoara',
    '2025-07-07 10:00:00',
    '2025-07-16 22:00:00',
    '2025-07-17 00:00:00',
    'pozaT_1.jpeg;pozaT_2.jpeg;pozaT_3.jpeg',
    16,
    'Cadre și Forme în Dansul Contemporan',
    '300085',
    45.7489,
    21.2220,
    19,
    'Unfold Motion',
    '+40 256 408 300',
    'contact@unfoldmotion.ro',
    'unfoldmotion.ro',
    'https://unfoldmotion.ro/',
    'NU'
),
(
    'robotica;atelier;social;educational;technologie;gratuit;fizic',
    'Gratuit',
    '🚀 Pregătiți-vă să fiți uimiți! 🤖 Echipa de robotică Phoenix vă invită la Identicom Event pentru a vedea robotul nostru uimitor în acțiune! ⚙️ Vino să descoperi lumea fascinantă a tehnologiei, să înțelegi cum funcționează un robot de competiție și să interacționezi cu echipa noastră pasionată. Nu ratați ocazia de a vedea inovația în direct! ✨ Vă așteptăm cu entuziasm! 🎉',
    'Cluj Innovation Park',
    '2025-05-20 09:00:00',
    '2025-05-22 17:00:00',
    '2025-07-17 00:00:00',
    'pozaU_1.png',
    15,
    'Identicom Event',
    '300085',
    46.821083,
    23.579194,
    20,
    'Phoenix',
    '0770892372',
    'patriciaporumb10@gmail.com',
    'phoenix.ro026',
    'https://www.instagram.com/phoenix.ro026?igsh=MTFjYmY1cjN5bmRzYQ==',
    'NU'
);



select * from activities;
SHOW WARNINGS;
truncate activities;
DROP TABLE IF EXISTS activities;
SHOW CREATE TABLE activities;

ALTER TABLE activities MODIFY activity_contact_phone VARCHAR(50);
ALTER TABLE activities MODIFY activity_form VARCHAR(1000);
SELECT LENGTH('https://docs.google.com/forms/d/e/1FAIpQLScyk4DuMZS9irgejJGiI_ijYlP7GessRukZSjajaGopxMgv1g/viewform?fbclid=PAQ0xDSwJ9vQpleHRuA2FlbQIxMQABp0eCb-XECW-GzXB1JvO09fGj5PUvuV6hGYLjLRIK-D-42bWDjEkWaWKvqJaj_aem_U5HJYlxCkDj87PrBLzfKHA');
