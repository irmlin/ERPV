CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    options TEXT ARRAY NOT NULL,
    correct_option TEXT ARRAY NOT NULL,
    explanation TEXT NOT NULL,
    picture_name TEXT
);

with questions_json (doc) as (
    values
        ('
[
  {
    "id": 1,
    "question": "Į kokios spalvos konteinerį reikia mesti kartoninius pieno pakelius?",
    "options": ["Geltonos (plastiko)","Žalios (stiklo)","Mėlynos (popieriaus)"],
    "correct_option": ["Geltonos (plastiko)"],
    "explanation": "Kartonines atliekas reikia mesti į plastikui skirtus geltonos spalvos konteinerius."
  },
  {
    "id": 2,
    "question": "Ar tiesa, jog popierių galima perdirbti daugiau nei vieną kartą?",
    "options": ["Taip","Ne"],
    "correct_option": ["Taip"],
    "explanation": "Priklausomai nuo pakuotės tipo, popierių galima perdirbti net iki 8 kartų."
  },
  {
    "id": 3,
    "question": "Į kurį konteinerį reikia mesti flomasterius bei spalvotus pieštukus?",
    "options": ["Į mėlyną konteinerį","Į žalią konteinerį","Į geltoną konteinerį","Į mišrių atliekų konteinerį"],
    "correct_option": ["Į mišrių atliekų konteinerį"],
    "explanation": "Flomasterius ir spalvotus pieštukus reikia mesti į mišrių atliekų konteinerį, nes jie yra sunkiai perdirbami."
  },
  {
    "id": 4,
    "question": "Kokias atliekas galima mesti į mėlynos spalvos konteinerį?",
    "options": ["Traškučių pakuotes, saldainių pakelius","Laikraščius, lankstinukus, knygas","Dovanų pakavimo popierių, vienkartinius maišelius"],
    "correct_option": ["Laikraščius, lankstinukus, knygas"],
    "explanation": "Į mėlynos spalvos konteinerius metame popierines bei kartonines atliekas, tad plastikinis dovanų pakavimo popierius ar traškučių pakelis netinkamas mėlynam konteineriui."
  },
  {
    "id": 5,
    "question": "Kiek kartų gali būti perdirbamas metalas?",
    "options": ["Vieną","Tris","Penkis","Neribotą kiekį"],
    "correct_option": ["Neribotą kiekį"],
    "explanation": "Metalas dažniausiai yra perdirbamas jį išlydant, tad šį procesą galima atlikti neribotą kiekį kartų."
  },
  {
    "id": 6,
    "question": "Ką reiškia ant pakuočių dedamas „žaliojo taško” ženklas?",
    "options": ["Pakuotė yra daugkartinė","Pakuotė tinkama perdirbimui","Gamintojas yra sumokėjęs už tinkamą pažymėtos pakuotės tvarkymą"],
    "correct_option": ["Gamintojas yra sumokėjęs už tinkamą pažymėtos pakuotės tvarkymą"],
    "explanation": "Žaliojo taško ženklas reiškia, kad pakuotės gamintojas rūpinasi aplinkos taršos mažinimu – yra sumokėjęs už tinkamą pažymėtos pakuotės tvarkymą.",
    "picture_name": "6.png"
  },
  {
    "id": 7,
    "question": "Ar Į antrinių žaliavų šiukšliadėžę galima mesti nerūšiuojamas pakuotes?",
    "options": ["Taip","Ne"],
    "correct_option": ["Ne"],
    "explanation": "Antrinių žaliavų konteineriai yra skirti tik perdirbimui tinkamoms atliekoms, pvz., popieriaus, plastiko, metalo, stiklo ar tekstilės gamybai skirtoms atliekoms."
  },
  {
    "id": 8,
    "question": "Kas gali nutikti jeigu į plastikui skirtą konteinerį išmesite stiklo atliekas?",
    "options": ["Perdirbimo mašinos gali sugesti","Atliekų perdirbimo ceche gali kilti gaisras","Perdirbimo gamyklos darbuotojai gali susižaloti","Nieko nenutiks"],
    "correct_option": ["Perdirbimo mašinos gali sugesti","Perdirbimo gamyklos darbuotojai gali susižaloti"],
    "explanation": "Netinkamas stiklo ar kitų atliekų rūšiavimas gali pakenkti rūšiavimo procesui, sugadinant cechus, brokuojant kitas atliekas bei tuo pačiu keliant grėsmę perdirbimo centro darbuotojams."
  },
  {
    "id": 9,
    "question": "Kokia yra atliekų rūšiavimo nauda?",
    "options": ["Kovojama su klimato atšilimu","Plastiko atliekos naudojamos šildymui","Mažėja sąvartynuose kaupiamų atliekų kiekis","Tausojami gamtiniai resursai"],
    "correct_option": ["Kovojama su klimato atšilimu","Mažėja sąvartynuose kaupiamų atliekų kiekis","Tausojami gamtiniai resursai"],
    "explanation": "Atliekų rūšiavimas labai svarbus prisidedant prie aplinkos saugojimo, tačiau plastiko atliekos tikrai nėra deginamos šildymo sezono metu."
  },
  {
    "id": 10,
    "question": "Kaip tinkamai išmesti elektros lemputę?",
    "options": ["Mesti į stiklo konteinerį","Mesti į plastiko konteinerį","Priduoti į specialųjį surinkimo punktą","Mesti į buitinių atliekų konteinerį"],
    "correct_option": ["Priduoti į specialųjį surinkimo punktą"],
    "explanation": "Elektronikos atliekos turi gamtai bei sveikatai kenksmingų medžiagų, tad jas reikia priduot į specialius išmetimo punktus, kuriuos galima rasti prekybos centruose bei kitose vietose (pavyzdžiui  daugelyje mokyklų)."
  },
  {
    "id": 11,
    "question": "Kur pirmiausia keliauja į rūšiavimo konteinerius išmestos atliekos?",
    "options": ["Į perdirbimo gamyklą","Į perrūšiavimo centrą","Į sąvartyną","Į atliekų plovimo cechą"],
    "correct_option": ["Į perrūšiavimo centrą"],
    "explanation": "Prieš pradedant perdirbimo procesą, atliekos yra rūšiuojamos pagal tipą bei atrenkamos netinkamos pakuotės."
  },
  {
    "id": 12,
    "question": "Ar tiesa, kad į stiklo konteinerį galima mesti porcelianinius ar keramikinius indus?",
    "options": ["Taip","Ne"],
    "correct_option": ["Ne"],
    "explanation": "Porcelianinius bei keramikinius indus reikia mesti į mišrių atliekų konteinerius, nes šie indai nėra perdirbami kaip įprastas stiklas."
  },
  {
    "id": 13,
    "question": "Į kurį konteinerį derėtų mesti metalines gaiviųjų gėrimų skardines?",
    "options": ["Į žaliąjį konteinerį","Į geltonąjį konteinerį","Į mėlynąjį konteinerį","Į bendrųjų atliekų konteinerį"],
    "correct_option": ["Į geltonąjį konteinerį"],
    "explanation": "Metalinius dangtelius ar skardines reikia mesti į geltonąjį konteinerį, kuris yra ne vien tik plastiko, bet ir pakuočių konteineris."
  },
  {
    "id": 14,
    "question": "Ką reiškia šis ant pakuotės matomas ženklas?",
    "options": ["Pakuotė pagaminta iš perdirbtų atliekų","Pakuotė daugkartinio naudojimo","Pakuotė priklauso užstato sistemai (depozitas)","Pakuotė netinkama rūšiavimui"],
    "correct_option": ["Pakuotė priklauso užstato sistemai (depozitas)"],
    "explanation": "Visos pakuotės, kurios yra paženklintos ekrane matomu ženklu, yra depozitinės. Šias pakuotes galima priduoti parduotuvėse įrengtuose taromatuose.",
    "picture_name": "14.png"
  },
  {
    "id": 15,
    "question": "Jeigu ant pakuotės yra pavaizduotas vienas iš šių ženklų, kaip reikėtų išmesti šią pakuotę?",
    "options": ["Pakuotę pateikti į specialųjį surinkimo punktą","Išmesti į stiklo konteinerį","Išmesti į  plastiko konteinerį","Išmesti į bendrųjų atliekų konteinerį"],
    "correct_option": ["Pakuotę pateikti į specialųjį surinkimo punktą"],
    "explanation": "Visos pavojingos medžiagos privalo būti priduodamos specialiuose surinkimo punktuose, kad nebūtų sukelta žala gamtai bei gyvūnams.",
    "picture_name": "15.png"
  },
  {
    "id": 16,
    "question": "Kaip tinkamai išmesti pasibaigusio galiojimo vaistus?",
    "options": ["Vaistus priduoti artimiausioje vaistinėje","Vaistus priduoti savo šeimos gydytojui","Utilizuoti atliekas, sudeginant ar nuleidžiant į kanalizaciją","Išmesti į bendrųjų atliekų konteinerį"],
    "correct_option": ["Vaistus priduoti artimiausioje vaistinėje"],
    "explanation": "Pasibaigusio galiojimo vaistus galima priduoti į vaistines, kurios pasirūpins tinkamu atliekų pašalinimu."
  },
  {
    "id": 17,
    "question": "Ką reiškia šis ženklas?",
    "options": ["Šiukšlių konteineryje nebėra laisvos vietos","Pakuotę mesti tik į rūšiavimui skirtus konteinerius","Nemesti pakuotės į bendrą šiukšlių konteinerį"],
    "correct_option": ["Nemesti pakuotės į bendrą šiukšlių konteinerį"],
    "explanation": "Šis simbolis nurodo, jog produktas turi savyje gamtai žalingų medžiagų, tad šias atliekas reikia pateikti į specialiuosius punktus, o ne mesti į bendrą konteinerį.",
    "picture_name": "17.png"
  },
  {
    "id": 18,
    "question": "Kokios atliekos daugiausiai daro žalos vandenynų gyvūnams?",
    "options": ["Plastikas","Stiklas","Popierius"],
    "correct_option": ["Plastikas"],
    "explanation": "Dėl savo smulkumo, plastikas patenka į jūros gyvūnų organizmus, taip sukeldamas jiems labai rimtų sveikatos problemų ar net mirtį, todėl svarbu mažinti plastiko vartojimą."
  },
  {
    "id": 19,
    "question": "Kurios iš šių pakuočių negalima mesti į stiklui skirtą konteinerį?",
    "options": ["Stiklinio buteliuko","Puodelio","Stiklainio su uogiene"],
    "correct_option": ["Stiklainio su uogiene"],
    "explanation": "Atliekos su riebalinėmis maisto liekanomis gali paversti kitas pakuotes neperdirbamomis, tad prieš rūšiuojant stiklainį, pirmiausia nuplaukite jį."
  },
  {
    "id": 20,
    "question": "Ar tiesa, jog plastiko pakuotės suirimas gali trukti net 200 metų?",
    "options": ["Taip","Ne"],
    "correct_option": ["Taip"],
    "explanation": "Sąvartynuose plastikinių pakuočių irimo trukmė gali trukti ir kelis šimtus metų, dėl ko svarbu rūšiuoti ir perdirbti šias pakuotes."
  },
  {
    "id": 21,
    "question": "Ar galima rūšiuoti riebalais išteptą pakuotę?",
    "options": ["Taip","Ne"],
    "correct_option": ["Ne"],
    "explanation": "Riebalais išteptos pakuotės nėra perdirbamos, o tokiai pakuotei patekus į rūšiavimo konteinerį, neperdirbamos tampa ir kitos atliekos. "
  }
]
'::json)
)
insert into questions (id, question, options, correct_option, explanation, picture_name)
select p.*
from questions_json l
    cross join lateral json_populate_recordset(null::questions, doc) as p
on conflict (id) do update
    set question = excluded.question,
        options = excluded.options,
        correct_option = excluded.correct_option,
        explanation = excluded.explanation,
        picture_name = excluded.picture_name;