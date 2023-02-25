import { ChatInputCommandInteraction, CommandInteraction, ContextMenuCommandInteraction, Interaction, InteractionType } from "discord.js";
import { EventHandler } from "@lib"
export default class InteractionCreate extends EventHandler {
    override async run(interaction: Interaction) {
        this.client.logger.info(
            `${interaction.type} interaction created by ${interaction.user.id}${
                interaction.type === InteractionType.ApplicationCommand ? `: ${interaction.toString()}` : ""
            }`
        );
      if(interaction.isCommand()) {
        this.client.slashCommandHandler.handle(interaction);
      } else if(interaction.isButton()) {
        this.client.buttonHandler.handle(interaction);
      }
  }
}
