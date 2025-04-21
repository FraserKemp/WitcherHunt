import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
    console.log(`🔥 Witcher Bot is online as ${client.user?.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
