import { CommandInteraction, embedLength } from "discord.js";
import { BetterClient } from "../extensions";
import { BaseHandler } from "./BaseHandler";
import { SlashCommand } from "../core"
import { InteractionType } from "../../../types";

export class SlashCommandHandler extends BaseHandler {
  
  constructor(client: BetterClient) {
    super(client);
  }
  public override load() {
    super.load("slashCommands");
    setTimeout(async () => { 
      if(process.env.NODE_ENV === "development") {
        this.client.logger.info(`[DEV] Registering commands as Guild rather than global. Appending to guilds...`)
        await Promise.all(
          this.client.guilds.cache.map(async (guild) =>
            guild.commands
              .set(
                  this.client.slashCommands.map((slashCommand) => ({
                      name: slashCommand.name,
                      description: slashCommand.description,
                      options: slashCommand.options.applicationData,
                  }))
              )
              .catch((error) => {
                  if (error.code === 50001) {
                      this.client.logger.error(
                          null,
                          `I encountered DiscordAPIError: Missing Access in ${guild.name} [${guild.id}] when trying to set slash commands!`
                      )
                  } else {
                      this.client.logger.error(error)
                  }
              })
              .then(() => {
                  this.client.logger.info(`Registered guild commands in ${guild.name}`)
              })))
      } else {  

      }
    }, 5000)
  }

  public reloadSlashCommands() {
    this.client.slashCommands.clear();
    this.load();
  }

  public async handle(interaction: CommandInteraction) {
    const command = this.fetchCommand(interaction.commandName);

    if(!command) {
      return this.client.logger.error(
        `${interaction.user.tag} [${interaction.user.id}] invoked application command ${interaction.commandName} even though it doesn't exist.`
      );
    }
    const missingPermissions = command.validate(InteractionType.SLASHCOMMAND, interaction);
    if(missingPermissions) {
      return interaction.reply(this.client.functions.generateErrorMessage(missingPermissions));
    }

    this.runCommand(command, interaction);
  }

  private fetchCommand(name: string): SlashCommand | undefined {
    return this.client.slashCommands.get(name)
  }

  private runCommand(command: SlashCommand, interaction: CommandInteraction) {
    command
    .run(interaction)
    // .then(async () => {
    //     if (command.cooldown)
    //         await command.applyCooldown(interaction.user.id);
    //     this.client.usersUsingBot.delete(interaction.user.id);
    // })
    .catch(async (error): Promise<any> => {
        this.client.logger.error(error);
        const toSend = this.client.functions.generateErrorMessage({
            title: "An Error Has Occurred",
            description: `An unexpected error was encountered while running \`${interaction.commandName}\`, my developers have already been notified! Feel free to join my support server in the mean time!`,
        });
        if (interaction.replied) return interaction.followUp(toSend);
        else if (interaction.deferred)
            return interaction.editReply(toSend);
        else
            return interaction.reply({
                ...toSend
            });
    });
  }
} 