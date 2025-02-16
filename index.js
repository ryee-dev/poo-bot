const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let watoCount = 0;
let emCount = 0;

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  
  switch (interaction.customId) {
    case 'wato-increment':
      watoCount++;
      break;
    case 'wato-decrement':
      watoCount = Math.max(watoCount - 1, 0); // Prevent negative count
      break;
    case 'wato-reset':
      watoCount = 0;
      break;
    case 'em-increment':
      emCount++;
      break;
    case 'em-decrement':
      emCount = Math.max(emCount - 1, 0); // Prevent negative count
      break;
    case 'em-reset':
      emCount = 0;
      break;
    default:
      return;
  }
  
  const updatedContent = `Wato's Poop Count: **${watoCount}**\n Em's Poop Count: **${emCount}**`;
  
  const row1 = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
    .setCustomId('wato-increment')
    .setLabel('Wato +1 💩')
    .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
    .setCustomId('wato-decrement')
    .setLabel('Wato -1 💩')
    .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
    .setCustomId('wato-reset')
    .setLabel('Wato Reset')
    .setStyle(ButtonStyle.Danger),
  );
  
  const row2 = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
    .setCustomId('em-increment')
    .setLabel('Em +1 💩')
    .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
    .setCustomId('em-decrement')
    .setLabel('Em -1 💩')
    .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
    .setCustomId('em-reset')
    .setLabel('Em Reset')
    .setStyle(ButtonStyle.Danger),
  );
  
  try {
    await interaction.update({ content: updatedContent, components: [row1, row2] });
  } catch (error) {
    console.error('Error updating message:', error);
  }
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  
  if (message.content === '!pmp') {
    const content = `Wato's Poop Count: **${watoCount}**\n Em's Poop Count: **${emCount}**`;
    
    const row1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('wato-increment')
      .setLabel('Wato +1 💩')
      .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
      .setCustomId('wato-decrement')
      .setLabel('Wato -1 💩')
      .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
      .setCustomId('wato-reset')
      .setLabel('Wato Reset')
      .setStyle(ButtonStyle.Danger),
    );
    
    const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('em-increment')
      .setLabel('Em +1 💩')
      .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
      .setCustomId('em-decrement')
      .setLabel('Em -1 💩')
      .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
      .setCustomId('em-reset')
      .setLabel('Em Reset')
      .setStyle(ButtonStyle.Danger),
    );
    
    try {
      await message.channel.send({ content, components: [row1, row2] });
    } catch (error) {
      console.error('Error sending buttons:', error);
    }
  }
});

client.login(process.env.TOKEN);