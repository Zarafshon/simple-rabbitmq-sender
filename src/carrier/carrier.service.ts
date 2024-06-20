import { Injectable } from '@nestjs/common'
import { CarrierLoginDto } from './dto/login,dto'

@Injectable()
export class CarrierService {
	async login({ factoryNumber }: CarrierLoginDto) {}
}
