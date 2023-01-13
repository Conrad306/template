import { ActionRowBuilder, APIEmbed, ButtonBuilder, ButtonComponent, ButtonStyle, CommandInteraction } from "discord.js";
import { BetterClient, SlashCommand } from "@lib";

export default class Test extends SlashCommand {
  constructor(client: BetterClient) {
    super("test", client, {
      description: "testy"
    });
  }

  run(interaction: CommandInteraction) {
    let emb: APIEmbed = {
      title: "Success!",
      description: "a",
    }

    let row = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(new ButtonBuilder().setCustomId("testbutton").setLabel("Click Me").setStyle(ButtonStyle.Primary))
    return interaction.reply({embeds: [emb], components: [row]})
  }
}