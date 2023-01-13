import { BetterClient } from "../extensions";
import { BaseHandler } from "./BaseHandler";


export class SelectMenuHandler extends BaseHandler {
  
  constructor(client: BetterClient) {
    super(client);
  }

  public override load() {
    return super.load("selectMenus"); 
  }
} 