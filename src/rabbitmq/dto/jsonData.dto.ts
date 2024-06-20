import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsDateString,
	IsIn,
	IsInt,
	IsString,
	IsBoolean,
	IsNotEmpty,
	IsOptional
} from 'class-validator'

export class CreateSensorDatumDto {
	sensorId: number

	@ApiProperty({
		description: 'Sensor code',
		example: 'temperature'
	})
	@IsNotEmpty()
	code: string

	@ApiProperty({
		description: 'Sensor value',
		example: '123'
	})
	@IsNotEmpty()
	value: string

	carrierId: number

	@ApiPropertyOptional({
		description: 'Sensor color',
		example: 'red'
	})
	@IsOptional()
	color: string

	@ApiProperty({
		description: 'Sensor happenedAt',
		example: new Date()
	})
	@IsDateString()
	happenedAt: Date
}

export class CreateDeltaDatumDto {
	@ApiProperty()
	readonly data: number[]

	@ApiProperty()
	readonly deltaId: number

	@ApiProperty()
	readonly happenedAt: Date

	readonly carrierId: number
}

export class CreateCanvasDatumDto {
	@ApiProperty()
	@IsInt()
	canvasId: number

	@ApiProperty()
	@IsInt({ each: true })
	value: number[]

	@ApiProperty()
	@IsInt()
	carrierId: number

	@ApiProperty()
	@IsDateString()
	happenedAt: Date
}

export class CreateLoggingDto {
	@ApiProperty()
	@IsNotEmpty()
	text: string

	@ApiProperty()
	@IsNotEmpty()
	type: string

	@ApiProperty()
	@IsNotEmpty()
	source: string

	@ApiProperty({
		example: '2021-01-01T00:00:00.000Z'
	})
	@IsNotEmpty()
	@IsDateString()
	happenedAt: Date

	@ApiPropertyOptional()
	@IsBoolean()
	@IsOptional()
	isError: boolean

	@ApiPropertyOptional()
	@IsBoolean()
	@IsOptional()
	notify: boolean

	carrierId: number
}

export class CreateNotificationDto {
	@ApiProperty({
		description: 'Title of the notification',
		example: 'New Notification'
	})
	@IsNotEmpty()
	@IsString()
	title: string

	@ApiProperty({
		description: 'Description of the notification',
		example: 'This is a new notification'
	})
	@IsNotEmpty()
	@IsString()
	description: string

	@ApiProperty({
		description: 'Type of the notification',
		example: 'info'
	})
	@IsIn(['info', 'warning', 'error', 'success'])
	type: 'info' | 'warning' | 'error' | 'success'

	@ApiProperty({
		description: 'Link of the notification',
		example: 'https://www.google.com'
	})
	@IsNotEmpty()
	@IsString()
	link: string

	@ApiProperty({
		description: 'User ID of the notification',
		example: 1
	})
	@IsNotEmpty()
	userId: number
}
