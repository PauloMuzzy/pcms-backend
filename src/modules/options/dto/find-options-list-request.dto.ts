import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

type OptionName = 'gender' | 'profession' | 'emergencyContactRelationship';
const OPTION_NAMES: OptionName[] = [
  'gender',
  'profession',
  'emergencyContactRelationship',
];

export class FindOptionsListRequestDto {
  @ApiProperty()
  @IsIn(OPTION_NAMES, {
    message: `O nome da opção deve ser um dos valores entre : ${OPTION_NAMES}`,
  })
  @IsString()
  optionName: OptionName;
}
