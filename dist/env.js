"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().url(),
    PORT: zod_1.z.coerce.number().optional().default(8000),
    JWT_PRIVATE_KEY: zod_1.z.string(),
    JWT_PUBLIC_KEY: zod_1.z.string(),
});
//# sourceMappingURL=env.js.map