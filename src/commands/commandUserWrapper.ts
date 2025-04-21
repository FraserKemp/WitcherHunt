import { CommandInteraction } from 'discord.js';
import { UserData } from '../types/UserTypes';
import {getOrCreateUserData} from "../database/UserProfile/getOrCreateUserData";
import {checkIfUserExists} from "../database/UserProfile/checkIfUserExisits";

export type CommandHandlerWithUser = (interaction: CommandInteraction, userData: UserData) => Promise<void>;

export function withUser(handler: CommandHandlerWithUser) {
    return async (interaction: CommandInteraction) => {
        const userId = interaction.user.id;
        const username = interaction.user.username;

        const exists = await checkIfUserExists(userId);

        if (!exists) {
            await interaction.reply({
                content: "❌ You don’t have a profile yet. Use `/profile` to create one!",
                ephemeral: true,
            });
            return;
        }

        const response = await getOrCreateUserData(userId, username);
        if(response.success) {
            await handler(interaction, response.data);
        } else {
            await interaction.reply({
                content: `❌ An error occurred when trying the command: ${interaction.commandName}. Please try again`,
                ephemeral: true,
            });
            return;
        }
    };
}
