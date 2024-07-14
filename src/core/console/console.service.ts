import { Injectable } from '@nestjs/common';
import * as readline from 'readline';

@Injectable()
export class ConsoleService {
  private rl;
  private text: any;
  private btext: any;
  private bg: any;
  private bbg: any;
  private reset: any;
  private bold: any;
  private underline: any;
  constructor() {
    this.reset = '\u001b[0m';
    this.bold = '\u001b[1m';
    this.underline = '\u001b[4m';

    this.text = {
      Black: '\u001b[30m',
      Red: '\u001b[31m',
      Green: '\u001b[32m',
      Yellow: '\u001b[33m',
      Blue: '\u001b[34m',
      Magenta: '\u001b[35m',
      Cyan: '\u001b[36m',
      White: '\u001b[37m',
    };

    this.btext = {
      Black: '\u001b[90m',
      Red: '\u001b[91m',
      Green: '\u001b[92m',
      Yellow: '\u001b[93m',
      Blue: '\u001b[94m',
      Magenta: '\u001b[95m',
      Cyan: '\u001b[96m',
      White: '\u001b[97m',
    };

    this.bg = {
      Black: '\u001b[40m',
      Red: '\u001b[41m',
      Green: '\u001b[42m',
      Yellow: '\u001b[43m',
      Blue: '\u001b[44m',
      Magenta: '\u001b[45m',
      Cyan: '\u001b[46m',
      White: '\u001b[47m',
    };

    this.bbg = {
      Black: '\u001b[100m',
      Red: '\u001b[101m',
      Green: '\u001b[102m',
      Yellow: '\u001b[103m',
      Blue: '\u001b[104m',
      Magenta: '\u001b[105m',
      Cyan: '\u001b[106m',
      White: '\u001b[107m',
    };
  }

  private consoleUpdate(template) {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(template);
  }

  public colorMatriz() {
    const bg = Object.entries(this.bg);
    Object.entries(this.bbg).map((entry: [string, string], index: number) => {
      const row = this.setTextRow(this.text, this.btext);
      console.log(`${bg[index][1] + bg[index][0]}\t${row + this.reset}`);
      console.log(`${entry[1] + entry[0]}\t${row + this.reset}`);
    });
  }
  private setTextRow(palette, bpalette): string {
    const text = Object.entries(palette);
    return Object.entries(bpalette)
      .map((entry: [string, string], index: number) => {
        return `${text[index][1] + text[index][0]} ${entry[1] + entry[0]} `;
      })
      .reduce((previouscol, currentcol) => {
        return previouscol + currentcol;
      }, '');
  }

  private getRow(palette, bpalette = '') {
    const initialcolumn = '';
    return Object.entries(palette)
      .map((entry) => {
        return `${bpalette + entry[1]} ${entry[0]}`;
      })
      .reduce((previouscol, currentcol) => {
        return previouscol + currentcol;
      }, initialcolumn);
  }

  public title(message) {
    console.log(
      `${
        this.bg.Blue + this.btext.Cyan + this.underline
      }              ${message}                ${this.reset}`,
    );
  }

  public message(message) {
    console.log(`${this.bg.Magenta + this.text.White + message + this.reset}`);
  }

  public valueMesssage(message: string) {
    const msg = `${this.btext.Magenta + message + this.reset}`;
    process.stdout.write(`${msg} : ${this.reset}`);
    return (value: string) => {
      const template = `${msg} : ${this.btext.Cyan + value} ${this.reset}\n`;
      return this.consoleUpdate(template);
    };
  }

  public statusMessage(message: string) {
    const msg = `${this.btext.Magenta + message + this.reset}`;
    process.stdout.write(`${msg} : ${this.reset}`);
    return (status: boolean) => {
      const statusFlag = status
        ? `${this.btext.Green + this.bg.Green} PASO`
        : `${this.text.White + this.bg.Red} FALLO`;
      const template = `${msg} : ${statusFlag} ${this.reset}\n`;
      return this.consoleUpdate(template);
    };
  }

  booleanMessage(message: string) {
    const msg = `${this.btext.Magenta + message + this.reset}`;
    process.stdout.write(`${msg} : ${this.reset}`);
    return (status: boolean, message?: string) => {
      const statusFlag = status
        ? `${this.btext.Green + this.bg.Green} ${message ? message : 'SI'}`
        : `${this.text.White + this.bg.Red} ${message ? message : 'NO'}`;
      const template = `${msg} : ${statusFlag} ${this.reset}\n`;
      return this.consoleUpdate(template);
    };
  }

  requestStatus(method, url, statusCode, time) {
    let status = '';
    if (statusCode >= 200 && statusCode < 300)
      status = this.btext.Green + statusCode + this.reset;
    if (statusCode >= 400 && statusCode < 500)
      status = this.btext.Red + statusCode + this.reset;
    console.log(
      `${this.btext.Magenta + method + this.reset} ${url} ${status} ${
        this.btext.Cyan + time + this.reset
      } ms`,
    );
  }
  /*
  message(message) {
    console.log(this.BgCloud.bold(`${message}`));
  }*/
}
