import { Interaction, CacheType, APIEmbed, CommandInteraction, EmbedData } from "discord.js";
import fs from "fs";
import { InteractionType } from "../../../types";
import { BaseInteraction, Button } from "../core";
import { BetterClient } from "../extensions";



export class BaseHandler {

  public readonly client: BetterClient;

  constructor(client: BetterClient) {
    this.client = client;
  }

  public load(path: string) {
    const folderPath = `${this.client.__dirname}/dist/src/bot/${path}`;
    this.client.functions.getFiles(
      folderPath
      , "", true
    ).forEach((parent) => { 
      if(!fs.statSync(`${folderPath}/${parent}`).isDirectory()) {
        this.client.logger.warn(`${parent} is not a directory, so it will not be loaded. Continuing...`)
      } else {
        this.client.functions.getFiles(
          `${folderPath}/${parent}/`,
          ".js"
        ).forEach(async (file) => {
          const interactionFile = await import(`${folderPath}/${parent}/${file}`);
          const interaction = new interactionFile.default(this.client) as BaseInteraction;
          this.determineClientUpdate(interaction);
        })
    }
    }
  )
  }
  

  private determineClientUpdate(interaction: BaseInteraction) {
    switch(this.getObjectExtension(interaction)) {
      case "Autocomplete": 
       return this.client.autoCompletes.set(interaction.name, interaction)
      case "Button": 
        return this.client.buttons.set(interaction.name, interaction)
      case "SelectMenu": 
        return this.client.selectMenus.set(interaction.name, interaction)
      case "SlashCommand": 
        return this.client.slashCommands.set(interaction.name, interaction)
    }
  }

  private getObjectExtension(interaction: Object): string | undefined {
    let parent = Object.getPrototypeOf(Object.getPrototypeOf(interaction));
    while (parent) {
      if (parent.constructor.name !== "Object") {
        return parent.constructor.name;
      }
      parent = Object.getPrototypeOf(parent);
    }
    return undefined;
  }
}