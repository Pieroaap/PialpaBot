import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { message } from 'telegraf/filters';

dotenv.config();

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error('⚠️ Error: No se encontró el token');
    }
    this.bot = new Telegraf(token);
  }

  onModuleInit(): any {
    this.bot.start((ctx) =>
      ctx.reply('Hola! Soy el Bot de Pialpa, creado en Nest.js 😁'),
    );
    this.bot.help((ctx) =>
      ctx.reply('Dime, ¿En qué te puedo ayudar Humano? 🤨'),
    );
    this.bot.on('text', (ctx) =>
      ctx.reply(`Dijiste: ${ctx.message.text}`)
    );
    this.bot.on(message('sticker'), (ctx) =>
      ctx.reply('¡Bonito Sticker!')
    );
    this.bot.launch();
    console.log('Pialpa Bot iniciado correctamente 🤖');
  }
}
