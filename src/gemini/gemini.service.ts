import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import * as XLSX from 'xlsx';

@Injectable()
export class GeminiService {
  private readonly ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateContentFromXLSX(xlsxBuffer: Buffer, prompt: string): Promise<string> {
    const workbook = XLSX.read(xlsxBuffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;

    const csvData = sheetNames
      .map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_csv(worksheet);
      })
      .join('\n\n'); 

    const base64Data = Buffer.from(csvData).toString('base64');

    const contents = [
      {
        parts: [
          {
            inline_data: {
              mime_type: 'text/csv',
              data: base64Data,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ];

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: JSON.stringify(contents),
    });

    return response.text ?? '';
  }
}