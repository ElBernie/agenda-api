"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceAccount = require("../serviceAccountKey.json");
const firebase = require("firebase-admin");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const firebaseAccount = serviceAccount;
firebase.initializeApp({
    credential: firebase.credential.cert(firebaseAccount),
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map