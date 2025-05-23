import { Monster } from "../types/MonsterTypes/MonsterTypes";

export const commonMonsters: Monster[] = [
  {
    id: "001",
    name: "Drowner",
    rarity: "Common",
    price: 50,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "Velen",
  },
  {
    id: "002",
    name: "Ghoul",
    rarity: "Common",
    price: 55,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "White Orchard",
  },
  {
    id: "003",
    name: "Wolf",
    rarity: "Common",
    price: 45,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Beast"],
    region: "Skellige",
  },
  {
    id: "004",
    name: "Wild Dog",
    rarity: "Common",
    price: 40,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Beast"],
    region: "Novigrad",
  },
  {
    id: "005",
    name: "Nekker",
    rarity: "Common",
    price: 60,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Ogroid"],
    region: "Velen",
  },
  {
    id: "006",
    name: "Endrega Worker",
    rarity: "Common",
    price: 65,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Insectoid"],
    region: "Velen",
  },
  {
    id: "007",
    name: "Rotfiend",
    rarity: "Common",
    price: 70,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "Novigrad",
  },
  {
    id: "008",
    name: "Water Hag",
    rarity: "Common",
    price: 75,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "Velen",
  },
  {
    id: "009",
    name: "Bear",
    rarity: "Common",
    price: 80,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Beast"],
    region: "Skellige",
  },
  {
    id: "010",
    name: "Warg",
    rarity: "Common",
    price: 85,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Beast"],
    region: "Skellige",
  },
];

const uncommonMonsters: Monster[] = [
  {
    id: "011",
    name: "Foglet",
    rarity: "Uncommon",
    price: 90,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "Velen",
  },
  {
    id: "012",
    name: "Grave Hag",
    rarity: "Uncommon",
    price: 95,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "Novigrad",
  },
  {
    id: "013",
    name: "Endrega Warrior",
    rarity: "Uncommon",
    price: 100,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Insectoid"],
    region: "Velen",
  },
  {
    id: "014",
    name: "Harpy",
    rarity: "Uncommon",
    price: 105,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Hybrid"],
    region: "Skellige",
  },
  {
    id: "015",
    name: "Siren",
    rarity: "Uncommon",
    price: 110,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Hybrid"],
    region: "Skellige",
  },
  {
    id: "016",
    name: "Cockatrice",
    rarity: "Uncommon",
    price: 115,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Draconid"],
    region: "Velen",
  },
  {
    id: "017",
    name: "Alghoul",
    rarity: "Uncommon",
    price: 120,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "White Orchard",
  },
  {
    id: "018",
    name: "Ekimmara",
    rarity: "Uncommon",
    price: 130,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Vampire"],
    region: "Velen",
  },
  {
    id: "019",
    name: "Garkain",
    rarity: "Uncommon",
    price: 135,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Vampire"],
    region: "Novigrad",
  },
  {
    id: "020",
    name: "Noonwraith",
    rarity: "Uncommon",
    price: 140,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Specter"],
    region: "Velen",
  },
];

export const monsters = [
  { name: "Drowner", rarity: "Common" },
  { name: "Ghoul", rarity: "Common" },
  { name: "Nekker", rarity: "Uncommon" },
  { name: "Foglet", rarity: "Uncommon" },
  { name: "Griffin", rarity: "Rare" },
  { name: "Cockatrice", rarity: "Rare" },
  { name: "Leshen", rarity: "Legendary" },
  { name: "Fiend", rarity: "Legendary" },
];
