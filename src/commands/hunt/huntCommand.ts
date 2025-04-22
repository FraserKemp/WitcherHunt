import {
    SlashCommandBuilder,
    CommandInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    ButtonInteraction
} from 'discord.js';
import {rollRarity} from "../../utils/rollRarity";
import {Monster, monsters} from "../../data/monsters";
import {withUser} from "../commandUserWrapper";

type AttackResult = {
    success: boolean;
    roll: number;
    threshold: number;
    message: string;
};

export const resolveAttack = (monster: Monster): AttackResult => {
    const roll = Math.floor(Math.random() * 100);
    console.log('Attack roll: ', roll)
    const thresholdMap: Record<string, number> = {
        Common: 70,
        Uncommon: 60,
        Rare: 37,
        'Super Rare': 20,
        Legendary: 5,
        Shiny: 4,
        Deranged: 3,
    };
    const threshold = thresholdMap[monster.rarity] ?? 50;

    const success = roll >= threshold;
    const message = success
        ? `💥 You killed the ${monster.name} monster! (Roll: ${roll} / Needed: ${threshold})`
        : `❌ The ${monster.name} monster dodged your attack! (Roll: ${roll} / Needed: ${threshold})`;

    return { success, roll, threshold, message };
}


export const huntCommand = new SlashCommandBuilder()
    .setName('hunt')
    .setDescription('Go on a monster hunt!');

const executeHunt = async (interaction: CommandInteraction)=> {
    const rarity = rollRarity();
    console.log(rarity, 'RARITY HERE')

    // Get a monster of that rarity
    const possibleMonsters = monsters.filter(m => m.rarity === rarity);
    if (possibleMonsters.length === 0) {
        await interaction.reply(`No monsters found for rarity: ${rarity}`);
        return;
    }

    const monster = possibleMonsters[Math.floor(Math.random() * possibleMonsters.length)];

    // TODO make this more similar to PokeMeow -> show how many items you have and other bits of information like the rarity.
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId('attack')
            .setLabel('⚔️ Attack')
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId('capture')
            .setLabel('🪢 Capture')
            .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
        content: `👹 A wild **${monster.name}** appeared! (Rarity: ${monster.rarity})\nChoose your action:`,
        components: [row],
        ephemeral: false
    });

    // Create a message component collector for this interaction
    const message = await interaction.fetchReply();

    const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 15000, // 15s window to choose
        max: 1,
    });

    collector.on('collect', async (btnInteraction: ButtonInteraction) => {
        if (btnInteraction.user.id !== interaction.user.id) {
            await btnInteraction.reply({ content: 'This isn’t your hunt!', ephemeral: true });
            return;
        }

        if (btnInteraction.customId === 'attack') {
            const result = resolveAttack(monster);

            await btnInteraction.update({
                content: result.message,
                components: []
            });
        }

        if (btnInteraction.customId === 'capture') {
            await btnInteraction.update({
                content: `🪢 You tried to capture **${monster.name}** (${monster.rarity}) — capture logic coming soon!`,
                components: []
            });
        }
    });

    collector.on('end', async collected => {
        if (collected.size === 0) {
            await interaction.editReply({
                content: `⏳ You missed your chance to act! The **${monster.name}** escaped.`,
                components: []
            });
        }
    });
}

export const wrappedHuntCommand = withUser(executeHunt);