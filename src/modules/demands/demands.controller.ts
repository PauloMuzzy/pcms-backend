import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRoute } from 'src/common/decorators/swagger-route.decorator';
import { CustomRequestValidatorPipe } from 'src/common/pipes/custom-request-validator.pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { DemandsService } from 'src/modules/demands/demands.service';
import {
  CREATE_DEMAND_SWAGGER_DOC,
  EDIT_DEMAND_SWAGGER_DOC,
  FIND_DEMANDS_SWAGGER_DOC,
  REMOVE_DEMAND_SWAGGER_DOC,
} from 'src/modules/demands/documentation/swagger-decorators';
import { CreateDemandRequestDto } from 'src/modules/demands/dto/create-demand-request.dto';
import { EditDemandRequestDto } from 'src/modules/demands/dto/edit-demand-request.dto';
import { FindDemandsRequestDto } from 'src/modules/demands/dto/find-demands-request.dto';
import { RemovePatientRequestDto } from 'src/modules/demands/dto/remove-demand-request.dto';

@ApiTags('Demands')
@Controller('demands')
export class DemandsController {
  constructor(private readonly demandsService: DemandsService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(CreateDemandRequestDto))
  @SwaggerRoute(CREATE_DEMAND_SWAGGER_DOC)
  @Post()
  async create(@Body() body: CreateDemandRequestDto) {
    await this.demandsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(FindDemandsRequestDto))
  @SwaggerRoute(FIND_DEMANDS_SWAGGER_DOC)
  @Get()
  async find(@Query() query: FindDemandsRequestDto) {
    return this.demandsService.find(query);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(EditDemandRequestDto))
  @SwaggerRoute(EDIT_DEMAND_SWAGGER_DOC)
  @Patch()
  async edit(@Body() body: EditDemandRequestDto) {
    await this.demandsService.edit(body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomRequestValidatorPipe(RemovePatientRequestDto))
  @SwaggerRoute(REMOVE_DEMAND_SWAGGER_DOC)
  @Delete(':uuid')
  async remove(@Param('uuid') param: RemovePatientRequestDto) {
    await this.demandsService.remove(param);
  }
}
