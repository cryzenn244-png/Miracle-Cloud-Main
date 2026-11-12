
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
  Events
} = require("discord.js");

const TOKEN = process.env.MTU3MDM3NjI2NDQ5MTk5NTE0Nw.GSbUuz.Oz5Y0bZw9WbCBNCDRTTfxZ9LxePMnKz_SZaoQk;
const CLIENT_ID = process.env.1570376264491995147;

if (!TOKEN || !CLIENT_ID) {
  throw new Error("Missing DISCORD_TOKEN or CLIENT_ID environment variables.");
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("miraclenodes")
    .setDescription("Learn about Miracle Nodes"),

  new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Get the Miracle Nodes hosting panel information")
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.once(Events.ClientReady, async (bot) => {
  console.log(`✅ ${bot.user.tag} is online!`);

  try {
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash commands registered successfully.");
  } catch (error) {
    console.error("❌ Command registration failed:", error);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "miraclenodes") {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("✨ Miracle Nodes")
      .setDescription(
        "Welcome to **Miracle Nodes**!\n\n" +
        "🚀 Your hosting journey starts here.\n" +
        "💻 Built for Minecraft servers, Discord bots, and more.\n\n" +
        "🤖 This Discord bot is proudly created by **Miracle Nodes**."
      )
      .setFooter({ text: "Miracle Nodes • Hosting Made Simple" })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  }

  if (interaction.commandName === "panel") {
    const panelUrl = process.env.https://substance-only-sees-robert.trycloudflare.com;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("🖥️ Miracle Nodes Panel")
      .setDescription(
        panelUrl
          ? `Manage your hosting services through the panel below.\n\n🔗 [Open Hosting Panel](${panelUrl})`
          : "Manage your hosting services through the official Miracle Nodes panel."
      )
      .setFooter({ text: "Miracle Nodes • Control Panel" })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  }
});

client.login(TOKEN).catch(error => {
  console.error("❌ Discord login failed:", error);
  process.exitCode = 1;
});
