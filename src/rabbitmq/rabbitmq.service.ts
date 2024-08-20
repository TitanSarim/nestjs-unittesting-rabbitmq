import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
    
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:15672'], 
            queue: 'user_queue', 
            queueOptions: {
              durable: true,
            },
          },
        });
    }

    async sendMessage(pattern: string, data: any) {
        return this.client.send(pattern, data).toPromise();
    }

}
