// ============================================================
//  CONFIGURATIE — pas hier alles aan voor jullie tocht
// ============================================================

export const DEBUG_MODE = true; // ← zet op false vóór je deployt

export const PIN = "2005"; // PIN-code om de app te openen

export const WELCOME = {
  title: "20 Jaar Samen! 🗺️",
  message:
    "Lieve avonturiers,\n\nVandaag gaan jullie op pad langs plekken die er toe doen. Los de raadsels op, volg het kompas en geniet van elke stap samen.\n\nVeel plezier en succes!",
  photo: null, // Zet hier het pad naar een foto, bijv. "/photo.jpg"
};

export const STOPS = [
  {
    id: 10,
    name: "Speeltuin",
    lat: 51.838921,
    lng: 5.832842,
    arrivalRadius: 10,
    puzzle: {
      type: "riddle",
      question:
        "1 + 1 = ?",
      answer: "2",
      hints: [
        "Gebruik een rekenmachine",
      ],
    },
    completeMessage: "Geweldig! Jullie eerste stop zit erop! 🎉",
  },
  {
    id: 12,
    name: "Bankje",
    lat: 51.840211,
    lng: 5.833155,
    arrivalRadius: 20,
    puzzle: {
      type: "riddle",
      question:
        "Ik sta stil maar loop altijd door,\nIk heb wijzers maar geen handen.\nIk tick, ik tok, elk uur opnieuw —\nwat ben ik?",
      answer: "klok",
      hints: [
        "Ik heb geen mond, toch spreek ik de tijd.",
        "Je vindt me in bijna elke kamer thuis — aan de muur.",
      ],
    },
    completeMessage: "Geweldig! Jullie eerste stop zit erop! 🎉",
  },
  {
    id: 20,
    name: "Midden in park",
    lat: 51.838292,
    lng: 5.830611,
    arrivalRadius: 20,
    puzzle: {
      type: "memory",
      question:
        "Jullie eerste echte vakantie samen — welke stad was dat? Voer de naam van de stad in.",
      answer: "amsterdam",
      hints: [
        "De stad staat bekend om zijn grachten en fietsen.",
        "Het was ergens in Nederland — de hoofdstad.",
      ],
    },
    completeMessage:
      "Wat een mooie herinnering! Jullie zijn er bijna... ✨",
  },
  {
    id: 30,
    name: "Zwembad",
    lat: 51.83833033970654,
    lng: 5.82807232626584,
    arrivalRadius: 20,
    puzzle: {
      type: "code",
      question:
        "De code is verborgen in het volgende:\n\nJullie trouwdatum: dag × maand\n\nVoer het getal in als antwoord.",
      answer: "1111",
      hints: [
        "De uitkomst is een getal van twee of meer cijfers.",
        "Denk aan de specifieke dag en maand van jullie trouwdatum — vermenigvuldig die twee getallen.",
      ],
    },
    completeMessage: "Slim opgelost! Door naar de volgende aanwijzing! 🔑",
  },
];

export const FINAL = {
  lat: 51.847778,
  lng: 5.870833,
  arrivalRadius: 30,
  title: "Jullie zijn er! 🥂",
  message:
    "20 jaar geleden begon het mooiste avontuur van jullie leven. Bedankt dat jullie samen zo'n inspirerend stel zijn.\n\nGefeliciteerd met jullie jubileum!",
};
