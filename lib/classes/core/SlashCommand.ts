import {BaseInteraction} from "./BaseInteraction";
import {BetterClient} from "../extensions/BetterClient";
import {InteractionChoice, InteractionOptions} from "../../../types";
import { CommandInteraction } from "discord.js";
export class SlashCommand extends BaseInteraction {
    
    public readonly description: string;

    constructor(name: string, client: BetterClient, options: InteractionOptions) {
        super(name, client, options);
        this.description = options.description ?? "";
        this.options.applicationData = options.applicationData || [];
    }

    public override run(interaction: CommandInteraction) {
        return super.run(interaction);
    }
}