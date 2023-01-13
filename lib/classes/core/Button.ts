import { BetterClient } from "../extensions/BetterClient";
import { BaseInteraction } from "./BaseInteraction";
import { InteractionOptions } from "../../../types";
import { APIEmbed, ButtonInteraction } from "discord.js";

export class Button extends BaseInteraction {
  constructor(name: string, client: BetterClient, options: InteractionOptions) {
    super(name, client, options);
    
  }
  
  public override run(interaction: ButtonInteraction) {
    return super.run(interaction);
  }
}