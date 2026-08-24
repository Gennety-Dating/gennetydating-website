import { type Locale } from "./i18n";

export interface CityConfig {
  id: string;
  name: Record<Locale, string>;
  hasPlaces: boolean;
}

export const CITIES: CityConfig[] = [
  {
    id: "kyiv",
    name: {
      en: "Kyiv",
      uk: "Київ",
      ru: "Киев",
      de: "Kiew",
      pl: "Kijów",
      fr: "Kyiv",
      it: "Kyiv",
      es: "Kyiv",
    },
    hasPlaces: true,
  },
  {
    id: "warsaw",
    name: {
      en: "Warsaw",
      uk: "Варшава",
      ru: "Варшава",
      de: "Warschau",
      pl: "Warszawa",
      fr: "Varsovie",
      it: "Varsavia",
      es: "Varsovia",
    },
    hasPlaces: true,
  },
  {
    id: "berlin",
    name: {
      en: "Berlin",
      uk: "Берлін",
      ru: "Берлин",
      de: "Berlin",
      pl: "Berlin",
      fr: "Berlin",
      it: "Berlino",
      es: "Berlín",
    },
    hasPlaces: false,
  },
  {
    id: "munich",
    name: {
      en: "Munich",
      uk: "Мюнхен",
      ru: "Мюнхен",
      de: "München",
      pl: "Monachium",
      fr: "Munich",
      it: "Monaco di Baviera",
      es: "Múnich",
    },
    hasPlaces: false,
  },
  {
    id: "lviv",
    name: {
      en: "Lviv",
      uk: "Львів",
      ru: "Львов",
      de: "Lemberg",
      pl: "Lwów",
      fr: "Lviv",
      it: "Leopoli",
      es: "Leópolis",
    },
    hasPlaces: false,
  },
  {
    id: "krakow",
    name: {
      en: "Kraków",
      uk: "Краків",
      ru: "Краков",
      de: "Krakau",
      pl: "Kraków",
      fr: "Cracovie",
      it: "Cracovia",
      es: "Cracovia",
    },
    hasPlaces: false,
  },
  {
    id: "wroclaw",
    name: {
      en: "Wrocław",
      uk: "Вроцлав",
      ru: "Вроцлав",
      de: "Breslau",
      pl: "Wrocław",
      fr: "Wrocław",
      it: "Breslavia",
      es: "Breslavia",
    },
    hasPlaces: false,
  },
  {
    id: "odesa",
    name: {
      en: "Odesa",
      uk: "Одеса",
      ru: "Одесса",
      de: "Odessa",
      pl: "Odessa",
      fr: "Odessa",
      it: "Odessa",
      es: "Odesa",
    },
    hasPlaces: false,
  },
  {
    id: "dnipro",
    name: {
      en: "Dnipro",
      uk: "Дніпро",
      ru: "Днепр",
      de: "Dnipro",
      pl: "Dniepr",
      fr: "Dnipro",
      it: "Dnipro",
      es: "Dnipro",
    },
    hasPlaces: false,
  },
  {
    id: "kharkiv",
    name: {
      en: "Kharkiv",
      uk: "Харків",
      ru: "Харьков",
      de: "Charkiw",
      pl: "Charków",
      fr: "Kharkiv",
      it: "Charkiv",
      es: "Járkov",
    },
    hasPlaces: false,
  },
];
