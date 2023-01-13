import { EmbedData, ActionRowBuilder, EmbedBuilder, APIEmbed, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, InteractionReplyOptions } from "discord.js";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { GeneratedMessage } from "../../types";
import { BetterClient } from "../classes/extensions/BetterClient";



export class Functions {
  
  private client: BetterClient;

  constructor(client: BetterClient) {
      this.client = client;
  }

  public getFiles(directory: string, fileExtension: string, createDirIfNotFound = false): string[] {
    if (createDirIfNotFound && !existsSync(directory)) mkdirSync(directory)
    return readdirSync(directory).filter((file) => file.endsWith(fileExtension))
  }

  public generatePrimaryMessage(embedInfo: APIEmbed, components: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [], ephemeral = false): InteractionReplyOptions {
      return {
          embeds: [new EmbedBuilder(embedInfo).setColor(this.client.config.colors.primary).data],
          components,
          ephemeral,
      }
  }

  /**
   * Generate a full success message with a simple helper function.
   * @param embedInfo - The information to build our embed with.
   * @param components - The components for our message.
   * @param ephemeral - Whether our message should be ephemeral or not.
   * @returns The generated success message.
   */
  public generateSuccessMessage(embedInfo: APIEmbed, components: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [], ephemeral = false): InteractionReplyOptions {
      return {
          embeds: [new EmbedBuilder(embedInfo).setColor(this.client.config.colors.success).data],
          components,
          ephemeral,
      }
  }

  /**
   * Generate a full warning message with a simple helper function.
   * @param embedInfo - The information to build our embed with.
   * @param components - The components for our message.
   * @param ephemeral - Whether our message should be ephemeral or not.
   * @returns The generated warning message.
   */
  public generateWarningMessage(embedInfo: APIEmbed, components: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [], ephemeral = false): InteractionReplyOptions {
      return {
          embeds: [new EmbedBuilder(embedInfo).setColor(this.client.config.colors.warning).data],
          components,
          ephemeral,
      }
  }

  /**
   * Generate a full error message with a simple helper function.
   * @param embedInfo - The information to build our embed with.
   * @param supportServer - Whether or not to add the support server link as a component.
   * @param components - The components for our message.
   * @param ephemeral - Whether our message should be ephemeral or not.
   * @returns The generated error message.
   */
  public generateErrorMessage(
      embedInfo: APIEmbed,
      supportServer = false,
      components: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [],
      ephemeral = true
  ): InteractionReplyOptions {
      if (supportServer) {
          components.concat([
              new ActionRowBuilder<ButtonBuilder>().addComponents(
                  new ButtonBuilder({
                      label: "Support Server",
                      url: this.client.config.supportServer,
                      style: ButtonStyle.Link,
                  })
              ),
          ])
      }
      return {
          embeds: [new EmbedBuilder(embedInfo).setColor(this.client.config.colors.error).data],
          components,
          ephemeral,
      }
  }
}
