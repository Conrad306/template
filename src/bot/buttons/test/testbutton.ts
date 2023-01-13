import { ButtonInteraction } from "discord.js";
import { BetterClient, Button } from "@lib";


export default class TestButton extends Button {
  
  constructor(client: BetterClient) {
    super("testbutton", client, {})
  }

  public async run(interaction: ButtonInteraction) {
    return interaction.reply("you clicked the button");
  }
}