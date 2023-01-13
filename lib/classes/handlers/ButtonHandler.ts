import { ButtonInteraction } from "discord.js";
import { InteractionType } from "../../../types";
import { Button } from "../core";
import { BetterClient } from "../extensions";
import { BaseHandler } from "./BaseHandler";


export class ButtonHandler extends BaseHandler {
  constructor(client: BetterClient) {
    super(client);
  }

  public override load() {
    return super.load("buttons"); 
  }

  private fetchbutton(customId: string): Button | undefined {
    return this.client.buttons.find((button) => customId.startsWith(button.name));
  }


  handle(interaction: ButtonInteraction) {
    const button = this.fetchbutton(interaction.customId);
    if (!button) return;

    if (interaction.message.interaction?.user.id !== interaction.user.id) {
      return interaction.reply({
        content: "You cannot use this button!",
        ephemeral: true,
      })
    }
    const missingPermissions = button.validate(InteractionType.BUTTON, interaction);
    if (missingPermissions) return interaction.reply(this.client.functions.generateErrorMessage(missingPermissions))

    return this.runButton(button, interaction)
  }

  async runButton(button: Button, interaction: ButtonInteraction) {
    await button.run(interaction).catch(async (error): Promise<any> => {
      this.client.logger.error(error)
      const toSend = this.client.functions.generateErrorMessage(
          {
              title: "An Error Has Occurred",
              description: `An unexpected error was encountered while running this button, my developers have already been notified! Feel free to join my support server in the mean time!`,
          },
          true
      )
      if (interaction.replied) return interaction.followUp(toSend)
      if (interaction.deferred) return interaction.editReply(toSend)
      return interaction.reply({
          ...toSend,
      })
  })
  }
} 