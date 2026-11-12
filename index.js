
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
const PANEL_URL = process.env.https://substance-only-sees-robert.trycloudflare.com/;

if (!TOKEN || !CLIENT_ID) {
  throw new Error(
    "Missing DISCORD_TOKEN or CLIENT_ID environment variables."
  );
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
    .setDescription("View the Miracle Nodes hosting panel")
].map(command => command.toJSON());

async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(TOKEN);

  await rest.put(
    Routes.applicationCommands(CLIENT_ID),
    { body: commands }
  );

  console.log("✅ Slash commands registered.");
}

client.once(Events.ClientReady, async bot => {
  console.log(`✅ ${bot.user.tag} is online!`);

  try {
    await registerCommands();
  } catch (error) {
    console.error("Command registration failed:", error.message);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === "miraclenodes") {
      const embed = new EmbedBuilder()
        .setColor(0x7C3AED)
        .setTitle("✨ Welcome to Miracle Nodes")
        .setDescription(
          "Your hosting journey starts here!\n\n" +
          "🚀 Hosting solutions for your projects.\n" +
          "🎮 Minecraft server hosting.\n" +
          "🤖 Discord bot hosting.\n\n" +
          "This bot is proudly created by **Miracle Nodes**."
        )
        .setFooter({
          text: "Miracle Nodes • Hosting Made Simple"
        })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === "panel") {
      const embed = new EmbedBuilder()
        .setColor(0x7C3AED)
        .setTitle("🖥️ Miracle Nodes Panel")
        .setDescription(
          PANEL_URL
            ? `Manage your hosting services below.\n\n[Open Hosting Panel](${PANEL_URL})`
            : "The hosting panel link has not been configured yet."
        )
        .setFooter({
          text: "Miracle Nodes • Control Panel"
        })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.error("Interaction error:", error);

    const message = {
      content: "❌ Something went wrong. Please try again.",
      ephemeral: true
    };

    if (interaction.deferred || interaction.replied) {
      await interaction.followUp(message).catch(() => {});
    } else {
      await interaction.reply(message).catch(() => {});
    }
  }
});

client.on(Events.Error, error => {
  console.error("Discord client error:", error);
});

client.login(TOKEN).catch(error => {
  console.error("Discord login failed:", error.message);
  process.exitCode = 1;
});
