import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RabbitmqModule } from './rabbitmq/rabbitmq.module'
import { ConfigModule } from '@nestjs/config'
import { CarrierModule } from './carrier/carrier.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		RabbitmqModule,
		CarrierModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
