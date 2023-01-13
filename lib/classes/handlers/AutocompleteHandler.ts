import { BetterClient } from "../extensions/BetterClient";
import { BaseHandler } from "./BaseHandler";


export class AutocompleteHandler extends BaseHandler {
  
  constructor(client: BetterClient) {
    super(client);
  }

  public override load() {
    return super.load("autoCompletes"); 
  }
} 