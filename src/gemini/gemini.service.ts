import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ConfigService } from '@nestjs/config';


@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }else {
      throw new Error('No API key provided');
    }
  }

  async obtenerRespuesta(mensaje: string): Promise<string> {
    try {
      const modelo = this.genAI.getGenerativeModel({model: "gemini-1.5-pro"});
      const response = await modelo.generateContent(mensaje);
      return response.response.text();
    }catch(err) {
      console.log(err);
      return "Error al procesar su solicitud";
    }
  }

}