import readline from "readline";
import { resolveAttack } from "../src/commands/hunt/huntCommand";
import { Monster } from "../src/types/MonsterTypes/MonsterTypes";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const mockInteraction = {
  user: { id: "123456", username: "GeraltOfRivia" },
  reply: (msg: any) => console.log("🤖 Bot Reply:", msg),
  update: (msg: any) => console.log("🔁 Message Updated:", msg),
  deferReply: () => console.log("⏳ Deferring reply..."),
  editReply: (msg: any) => console.log("✏️ Edited reply:", msg),
} as any;

const mockMonster: Monster = {
  id: "001",
  name: "Fiend",
  rarity: "Rare",
  price: 700,
  countInGame: 11,
  baseStats: {
    attack: 0,
    defense: 0,
    hp: 0,
    speed: 0,
  },
  type: ["Cursed"],
  region: "Skellige",
  loot: {},
};

const showInitialMenu = () => {
  console.log("\n💬 Choose an action:");
  console.log("1 - Hunt");
  console.log("2 - Attack");
  console.log("3 - Capture");
  console.log("4 - Exit");
  rl.question("> ", handleChoice);
};

const handleChoice = (choice: string) => {
  switch (choice) {
    case "1":
      console.log(
        `\n👹 A wild ${mockMonster.name} appeared! (Rarity: ${mockMonster.rarity})`,
      );
      break;
    case "2":
      const attackResult = resolveAttack(mockMonster);
      mockInteraction.update({ content: attackResult.message, components: [] });
      break;
    case "3":
      // Capture isn't implemented yet
      // const userAttempt = Math.floor(Math.random() * 100) + 1;
      // const captureResult = resolveCapture(mockMonster, userAttempt);
      // mockInteraction.update({ content: captureResult.message, components: [] });
      break;
    case "4":
      rl.close();
      return;
    default:
      console.log("❌ Invalid option.");
  }

  showInitialMenu();
};

// Start the menu loop
showInitialMenu();
