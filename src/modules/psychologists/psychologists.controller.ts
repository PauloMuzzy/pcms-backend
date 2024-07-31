import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreatePsychologistRequestDto } from 'src/modules/psychologists/dto/create-psychologist-request.dto';
import { EditPsychologistRequestDto } from 'src/modules/psychologists/dto/edit-psychologist-request.dto';
import { FindPsychologistsRequestDto } from 'src/modules/psychologists/dto/find-psychologists-request.dto';
import { FindPsychologistsResponseDto } from 'src/modules/psychologists/dto/find-psychologists-response.dto';
import { RemovePsychologistRequestDto } from 'src/modules/psychologists/dto/remove-psychologist-request.dto';
import { PsychologistsService } from 'src/modules/psychologists/psychologists.service';

@ApiTags('Psychologists')
@Controller('psychologists')
export class PsychologistsController {
  constructor(private psychologistsService: PsychologistsService) {}

  @UseGuards(JwtAuthGuard)
  @UseFilters(ConflictExceptionFilter)
  @UsePipes(new CustomRequestValidatorPipe(CreatePsychologistRequestDto))
  @Post()
  async create(@Body() body: CreatePsychologistRequestDto) {
    await this.psychologistsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(FindPsychologistsRequestDto))
  @Get()
  async find(
    @Query() query: FindPsychologistsRequestDto,
  ): Promise<FindPsychologistsResponseDto[]> {
    return this.psychologistsService.find(query);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(EditPsychologistRequestDto))
  @Patch()
  async edit(@Body() body: EditPsychologistRequestDto) {
    await this.psychologistsService.edit(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(RemovePsychologistRequestDto))
  @Delete(':uuid')
  async remove(@Param('uuid') param: RemovePsychologistRequestDto) {
    await this.psychologistsService.remove(param);
  }
}
