import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { message } from 'telegraf/filters';
import axios from 'axios';


dotenv.config();

@Injectable()
export class TelegramService {
  private bot: Telegraf;

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error('⚠️ Error: No se encontró el token');
    }
    this.bot = new Telegraf(token);
    this.setupBot();
  }

  private setupBot() {
    this.bot.on(message('text'), async (ctx) => {
      const userMessage = ctx.message.text;
      const rasaResponse = await this.sendToRasa(userMessage, ctx.chat.id);
      ctx.reply(rasaResponse);
    });

    this.bot.launch();
  }

  private async sendToRasa(message: string, senderId : number): Promise<string> {
    try {
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook',{
        sender: senderId.toString(),
        message: message,
      });

      if (response.data.length > 0) {
        return response.data[0].text || 'Lo siento, no entendí.';
      }
      return 'Lo siento, no tengo una respuesta para eso';
    }catch(err) {
      console.error('Error al conectar con Rasa: ',err)
      return 'Hubo un problema al conectar con el servidor';
    }
  }
}
