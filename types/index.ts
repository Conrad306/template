import { ActionRow, ActionRowComponent, APIActionRowComponentTypes, APIEmbed, ApplicationCommandOptionData, AutocompleteInteraction, ButtonComponent, ButtonInteraction, CommandInteraction, ComponentType, MessageActionRowComponent, SelectMenuInteraction, TextInputComponent } from "discord.js";
import { Autocomplete, Button, SlashCommand, SelectMenu } from "../lib";

export interface InteractionOptions {
  description?: string;
  /** Whether it can only be run in a guild */
  guildOnly?: boolean; 
  /** Whether it can only be run by the owner of the bot */
  devOnly?: boolean;
  /** Whether it can only be run by the owner of the guild the command is ran in */
  ownerOnly?: boolean;

  applicationData?: ApplicationCommandOptionData[]
} 


export type InteractionChoice =
    Autocomplete
  | Button
  | SelectMenu
  | SlashCommand

export type Interactions = 
    SelectMenuInteraction
  | CommandInteraction
  | ButtonInteraction
  | AutocompleteInteraction

export enum InteractionType {
  AUTOCOMPLETE,
  SELECTMENU,
  SLASHCOMMAND,
  BUTTON,
  MODALSUBMIT
}

export interface GeneratedMessage {
  embeds?: APIEmbed[]
  components?: ActionRow<MessageActionRowComponent | TextInputComponent | ButtonComponent>[]
  ephemeral?: boolean
  content?: string
}
export const BaseInteractionType: Map<InteractionType, string> = new Map<InteractionType, string>(
  [
    [InteractionType.BUTTON, "Button"],
    [InteractionType.MODALSUBMIT, "Modal Submit"],
    [InteractionType.SLASHCOMMAND, "Slash Command"],
    [InteractionType.SELECTMENU, "Select Menu"],
    [InteractionType.AUTOCOMPLETE, "Auto-complete"]
  ]
);