import { EventHandler } from '@lib';

export default class Ready extends EventHandler {
    override async run() {
      this.client.logger.info(`Current slash commands: ${this.client.slashCommands.size}`)
      this.client.logger.info(`Current buttons: ${this.client.buttons.size}`)
    }
}