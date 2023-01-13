import {BaseInteraction} from "./BaseInteraction";
import {BetterClient} from "../extensions/BetterClient";
import {InteractionOptions} from "../../../types";

export class SelectMenu extends BaseInteraction {
    constructor(name: string, client: BetterClient, options: InteractionOptions) {
        super(name, client, options);
    }
}