import readline from 'readline';
import {Monster} from "../src/data/monsters";
import {resolveAttack} from "../src/commands/hunt/huntCommand";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mockInteraction = {
    user: { id: '123456', username: 'GeraltOfRivia' },
    reply: (msg: any) => console.log('🤖 Bot Reply:', msg),
    update: (msg: any) => console.log('🔁 Message Updated:', msg),
    deferReply: () => console.log('⏳ Deferring reply...'),
    editReply: (msg: any) => console.log('✏️ Edited reply:', msg),
} as any;

const mockMonster: Monster = {
    name: 'Fiend',
    rarity: 'Rare',
};

const showMenu = () => {
    console.log('\n💬 Choose an action:');
    console.log('1 - Hunt');
    console.log('2 - Attack');
    console.log('3 - Capture');
    console.log('4 - Exit');
    rl.question('> ', handleChoice);
}

const handleChoice = (choice: string) => {
    switch (choice) {
        case '1':
            console.log(`\n👹 A wild ${mockMonster.name} appeared! (Rarity: ${mockMonster.rarity})`);
            break;
        case '2':
            const attackResult = resolveAttack(mockMonster);
            mockInteraction.update({ content: attackResult.message, components: [] });
            break;
        case '3':
            // Capture isn't implemented yet
            // const userAttempt = Math.floor(Math.random() * 100) + 1;
            // const captureResult = resolveCapture(mockMonster, userAttempt);
            // mockInteraction.update({ content: captureResult.message, components: [] });
            break;
        case '4':
            rl.close();
            return;
        default:
            console.log('❌ Invalid option.');
    }

    showMenu();
}

// Start the menu loop
showMenu();
