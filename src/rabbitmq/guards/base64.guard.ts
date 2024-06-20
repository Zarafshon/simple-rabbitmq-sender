import {
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	Injectable
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { CarrierDto } from 'src/carrier/dto/carrier.dto'

export interface ReqCarrier extends Request {
	carrier: Pick<
		CarrierDto,
		'id' | 'factoryNumber' | 'carrierGroupId'
	>
}

@Injectable()
export class Base64Guard implements CanActivate {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const req: ReqCarrier = context.switchToHttp().getRequest()

		try {
			const token: string = req.headers['authorization']
			if (!token) {
				throw new UnauthorizedException({
					message: 'Client is not logged in'
				})
			}
			const carrier = token.split(' ')[1]

			req.carrier = JSON.parse(
				Buffer.from(carrier, 'base64').toString('utf-8')
			)

			return true
		} catch (e) {
			throw new UnauthorizedException({
				message: 'Client is not logged in'
			})
		}
	}
}
