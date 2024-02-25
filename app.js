// app.js
import path from 'path';

// 動態導入dotenv並配置環境變量
async function configureEnvironment() {
    if (process.env.NODE_ENV !== 'production') {
        const dotenv = await import('dotenv');
        dotenv.config();
    }
}

// 動態導入其他模塊
async function importScripts() {
    await import('./exercise/updateAtlasWhitelist.js');
    await import('./exercise/server.js');
}

// 先配置環境變量，然後導入其他腳本
async function bootstrap() {
    await configureEnvironment();
    await importScripts();
}

bootstrap().catch(console.error);
