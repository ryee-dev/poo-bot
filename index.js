const {Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

let button1Value = 0;
let button2Value = 0;

client.once('ready', () => {
    console.log('Bot is online!');
});

//
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'wato-poop') {
        button1Value++;
    } else if (interaction.customId === 'em-poop') {
        button2Value++;
    }

    const updatedContent = `Total Wato Poops: ${button1Value} \nTotal Em Poops: ${button2Value}`;
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('wato-poop')
                .setLabel('wato')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('💩'),

            new ButtonBuilder()
                .setCustomId('em-poop')
                .setLabel('em')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('💩'),
        );

    try {
        await interaction.update({content: updatedContent, components: [row]});
    } catch (error) {
        console.error('Error updating message:', error);
    }
});

client.on('messageCreate', async message => {
    console.log(`Received message: ${message.content}`);

    if (message.author.bot) return;

    if (message.content === '!pmp') {
        console.log('!pmp command received');
        const content = `Total Wato Poops: **${button1Value}**\nTotal Em Poops: **${button2Value}**`;
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('wato-poop')
                    .setLabel('wato 💩')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('em-poop')
                    .setLabel('em 💩')
                    .setStyle(ButtonStyle.Primary),
            );

        try {
            const sentMessage = await message.channel.send({content, components: [row]});
            console.log('Buttons sent');
        } catch (error) {
            console.error('Error sending buttons:', error);
        }
    }
});

client.login(process.env.TOKEN);
