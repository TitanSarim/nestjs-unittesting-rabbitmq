import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  it('/auth/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({name: "testing", email: "testing123@gmail.com", password: "testing123" })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
      });
  });

  it('/auth/login (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth/login')
      .send({ email: "testing123@gmail.com", password: "testing123" })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
      });
  });

});
