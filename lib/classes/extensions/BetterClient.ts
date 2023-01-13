import { Client, ClientOptions, Collection } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { botConfig } from "../../../config/bot.config.js";
import { SlashCommand, Button, Autocomplete, SelectMenu, Logger } from "../core";
import { Functions } from "../../util";
import { resolve } from "path";
import { AutocompleteHandler, ButtonHandler, EventHandler, SelectMenuHandler, SlashCommandHandler } from "../handlers";



export class BetterClient extends Client {
  public readonly config;
  
  public readonly __dirname: string;


  public functions: Functions

  
  public autoCompletes: Collection<string, Autocomplete>
  public autoCompleteHandler: AutocompleteHandler;

  public buttons: Collection<string, Button>
  public buttonHandler: ButtonHandler;

  public logger: Logger;

  public events: Map<string, EventHandler>;

  public selectMenus: Collection<string, SelectMenu>
  public selectMenuHandler: SelectMenuHandler;

  public slashCommands: Collection<string, SlashCommand>
  public slashCommandHandler: SlashCommandHandler;

  public readonly prisma: PrismaClient
  constructor(options: ClientOptions) {
    super(options);
    this.config = botConfig;
      
    this.functions = new Functions(this);
    
    this.__dirname = resolve();
    
    this.events = new Map();

    this.logger = new Logger();

    this.autoCompletes = new Collection();
    this.autoCompleteHandler = new AutocompleteHandler(this);

    this.buttons = new Collection();
    this.buttonHandler = new ButtonHandler(this);

    this.selectMenus = new Collection();
    this.selectMenuHandler = new SelectMenuHandler(this);

    this.slashCommands = new Collection();
    this.slashCommandHandler = new SlashCommandHandler(this);

    this.prisma = new PrismaClient()


    this.autoCompleteHandler.load();
    this.buttonHandler.load();
    this.selectMenuHandler.load();
    this.slashCommandHandler.load();
    this.loadEvents();
  }
  override async login() {
    return super.login();
  }
  

  private loadEvents() {
    return this.functions.getFiles(`${this.__dirname}/dist/src/bot/events`, ".js", true).forEach(async (eventFileName) => {
        const eventFile = await import(`${this.__dirname}/dist/src/bot/events/${eventFileName}`)
        // eslint-disable-next-line new-cap
        const event: EventHandler = new eventFile.default(this, eventFileName.split(".js")[0])
        event.listen()
        return this.events.set(event.name, event)
    })
}

  public reloadEvents() {
    this.events.forEach(event => event.removeListener());
    this.loadEvents();
  }


}