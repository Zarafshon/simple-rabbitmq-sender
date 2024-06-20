import { ApiProperty } from '@nestjs/swagger'

export class CarrierLoginDto {
	@ApiProperty()
	factoryNumber: string
}
