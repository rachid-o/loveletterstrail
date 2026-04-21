// ============================================================
//  CONFIGURATIE — pas hier alles aan voor jullie tocht
// ============================================================

export const PIN = "2005"; // PIN-code om de app te openen

export const WELCOME = {
  title: "20 Jaar Samen! 🗺️",
  message:
    "Lieve avonturiers,\n\nVandaag gaan jullie op pad langs plekken die er toe doen. Los de raadsels op, volg het kompas en geniet van elke stap samen.\n\nVeel plezier en succes!",
  photo: null, // Zet hier het pad naar een foto, bijv. "/photo.jpg"
};

export const STOPS = [
  {
    id: 1,
    name: "Stop 1",
    lat: 52.3702,
    lng: 4.8952,
    arrivalRadius: 20,
    puzzle: {
      type: "riddle",
      question:
        "Ik sta stil maar loop altijd door,\nIk heb wijzers maar geen handen.\nIk tick, ik tok, elk uur opnieuw —\nwat ben ik?",
      answer: "klok",
      hint: "Je vindt me in bijna elke kamer thuis.",
    },
    completeMessage: "Geweldig! Jullie eerste stop zit erop! 🎉",
  },
  {
    id: 2,
    name: "Stop 2",
    lat: 52.3720,
    lng: 4.8970,
    arrivalRadius: 20,
    puzzle: {
      type: "code",
      question:
        "De code is verborgen in het volgende:\n\nJullie trouwdatum: dag × maand\n\nVoer het getal in als antwoord.",
      answer: "vul_hier_antwoord_in",
      hint: "Denk aan de datum die voor jullie altijd speciaal is.",
    },
    completeMessage: "Slim opgelost! Door naar de volgende aanwijzing! 🔑",
  },
  {
    id: 3,
    name: "Stop 3",
    lat: 52.3740,
    lng: 4.8990,
    arrivalRadius: 20,
    puzzle: {
      type: "memory",
      question:
        "Jullie eerste echte vakantie samen — welke stad was dat? Voer de naam van de stad in.",
      answer: "amsterdam",
      hint: "Het was ergens in Nederland.",
    },
    completeMessage:
      "Wat een mooie herinnering! Jullie zijn er bijna... ✨",
  },
];

export const FINAL = {
  lat: 52.3760,
  lng: 4.9010,
  arrivalRadius: 30,
  title: "Jullie zijn er! 🥂",
  message:
    "20 jaar geleden begon het mooiste avontuur van jullie leven. Bedankt dat jullie samen zo'n inspirerend stel zijn.\n\nGefeliciteerd met jullie jubileum!",
};
