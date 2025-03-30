import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { message } from 'telegraf/filters';
import { Markup } from 'telegraf/markup';

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
    //Mensaje Inicial
    this.bot.start((ctx) => {
      ctx.reply(
        '¡Hola! Soy PialpaBot 🤖. ¿En qué puedo ayudarte?',
        {
          reply_markup: {
            keyboard: [['ℹ️ Información', '📞 Contacto']],
            resize_keyboard: true,
          },
        }
      );
    });

    this.bot.command('help', (ctx) => {
      ctx.reply(
        '📌 Puedes usar estos comandos:\n/start - Iniciar bot\n/help - Ver ayuda\n/info - Información sobre el bot',
      );
    });

    //Comandos
    this.bot.hears('ℹ️ Información', (ctx) => {
      ctx.reply(
        '🤖 Soy un bot creado como tarea del profesor Motta 😁.',
      );
    });
    this.bot.hears('📞 Contacto', (ctx) => {
      ctx.reply(
        'Puedes comunicarte con el profesor Motta en linkedin.com/marcelocoronadoch 😊',
      );
    });

    //Rececpción de Texto, Stickers
    this.bot.on(message('text'), (ctx) =>
      ctx.reply(`Dijiste: ${ctx.message.text}`),
    );
    this.bot.on(message('sticker'), (ctx) => ctx.reply('¡Bonito Sticker!'));

    // Desplegar bot
    this.bot.launch();
    console.log('Pialpa Bot iniciado correctamente 🤖');
  }
}
