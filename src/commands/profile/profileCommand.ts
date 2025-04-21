import {SlashCommandBuilder, CommandInteraction} from "discord.js";
import {checkIfUserExists} from "../../database/UserProfile/checkIfUserExisits";
import {createNewProfile} from "../../database/UserProfile/createNewProfile";
import {getOrCreateUserData} from "../../database/UserProfile/getOrCreateUserData";

export const profileCommand = new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Create or view your Witcher profile');


export const executeProfile = async (interaction: CommandInteraction) => {
    const userId = interaction.user.id;
    const username = interaction.user.username;

    const exists = await checkIfUserExists(userId);

    if (!exists) {
        await createNewProfile(userId, username);

        await interaction.reply({
            content: `🧙‍♂️ Welcome, **${username}**! Your Witcher profile has been created.\nStart hunting with \`/hunt\`!`,
            ephemeral: true,
        });
        return;
    }

    const response = await getOrCreateUserData(userId, username);

    if(response.status == 'error') {
        await interaction.reply({
            content: `❌ An error occurred when trying the command: ${interaction.commandName}. Please try again in a few moments`,
            ephemeral: true,
        });
    } else {
        const userData = response.data

        await interaction.reply({
            content: `🧙‍♂️ **${username}'s Witcher Profile**
- 🗡️ Kills: ${userData.stats.kills}
- 🕸️ Captures: ${userData.stats.captures}
- 🌲 Hunts Completed: ${userData.stats.huntsCompleted}
        
Use \`/hunt\` to start tracking monsters.`,
            ephemeral: true,
        });
    }

}
