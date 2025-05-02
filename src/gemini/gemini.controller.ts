import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeminiService } from './gemini.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate-content')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  async generateContent(
    @UploadedFile() file: Express.Multer.File,
    @Body('prompt') prompt: string, 
  ): Promise<{ content: string }> {
    if (!file) {
      throw new Error('File is required');
    }
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const content = await this.geminiService.generateContentFromXLSX(
      file.buffer,
      prompt,
    );
    return { content };
  }
}