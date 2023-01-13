import { bgGreenBright, bgRedBright, bgYellowBright, blackBright, bold } from "colorette";
import { format } from "util";



export class Logger {

  private static get timestamp(): string {
    const now = new Date();
    const [year, month, day] = now.toISOString().substr(0, 10).split("-");
    return `${day}/${month}/${year} @ ${now.toISOString().substr(11, 8)}`;
  }

  public info(...args: string | any): void {
    console.log(
        bold(bgGreenBright(blackBright(`[${Logger.timestamp}]`))),
        bold(format(...args))
    );
  }

  public warn(...args: any) {
    console.log(
      bold(bgYellowBright(blackBright(`[${Logger.timestamp}]`))),
      bold(format(...args))
    )
  }

  public error(error: any | null, ...args: any): void {
      if (error)
          console.log(
              bold(bgRedBright(`[${Logger.timestamp}]`)),
              error,
              bold(format(...args))
          );
      else
          console.log(
              bold(bgRedBright(`[${Logger.timestamp}]`)),
              bold(format(...args))
          );
  }
}