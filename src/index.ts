import { Client, GatewayIntentBits, REST, Routes, Interaction } from 'discord.js';
import * as dotenv from 'dotenv';
import {huntCommand, wrappedHuntCommand} from './commands/hunt/huntCommand';
import {executeProfile, profileCommand} from "./commands/profile/profileCommand";

// TODO update ReadMe with instructions on how to run this

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
    console.log(`🔥 Logged in as ${client.user?.tag}`);

    // Register commands
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
    await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), // your bot's client ID
        { body: [huntCommand.toJSON(),  profileCommand.toJSON()] }
    );
});

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    console.log(interaction.commandName, 'Command has been ran')
    if(interaction.commandName === 'profile') {
        await executeProfile(interaction);
    } else if (interaction.commandName === 'hunt') {
        await wrappedHuntCommand(interaction);
    }
});

client.login(process.env.DISCORD_TOKEN);
