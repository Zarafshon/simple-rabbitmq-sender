import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CarrierDto {
	id: number

	@ApiProperty()
	@IsNotEmpty()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	factoryNumber: string

	// @IsNotEmpty()
	carrierGroupId: number
}
