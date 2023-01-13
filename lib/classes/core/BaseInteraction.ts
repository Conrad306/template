import {APIEmbed, EmbedData } from "discord.js";
import {BaseInteractionType, InteractionOptions, Interactions, InteractionType} from "../../../types";
import { BetterClient } from "../extensions/BetterClient";


export class BaseInteraction {
  name: string;
  description: string;
  client: BetterClient;
  options: InteractionOptions;


  constructor(name: string, client: BetterClient, options?: InteractionOptions) {
    this.name = name;
    this.client = client;
    this.description = options?.description ?? ""
    this.options = options ?? {};
  }
  public validate(type: InteractionType, interaction: Interactions): APIEmbed | null {
    let interactionType = BaseInteractionType.get(type);
    
    let emb: APIEmbed = {
      title: "Missing Permissions"
    }
    
    if((this.options.guildOnly && !interaction.inGuild())) {
      emb.description = `${interactionType} needs to be ran in a guild!`
      return emb;
    } else if(this.options.ownerOnly && interaction.guild?.ownerId === interaction.user.id) {
      emb.description = `${interactionType} can only be ran by the owner of the guild!`
      return emb;
    }
    return null;
  }
  public async preCheck(
      _interaction: Interactions
  ): Promise<[boolean, EmbedData?]> {
    return [true];
  }

  public async run(_interaction: Interactions): Promise<any> {}
}