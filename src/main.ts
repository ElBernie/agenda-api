import * as serviceAccount from '../serviceAccountKey.json';
import * as firebase from 'firebase-admin';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServiceAccount } from 'firebase-admin';

const firebaseAccount = serviceAccount as ServiceAccount;
firebase.initializeApp({
  credential: firebase.credential.cert(firebaseAccount),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
