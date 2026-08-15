import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat config. `next lint` was removed in Next 16, so ESLint runs directly
 * via `npm run lint`. eslint-config-next v16 already exports flat arrays.
 */
export default [
    { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "eslint.config.mjs"] },
    ...nextCoreWebVitals,
    ...nextTypescript,
];
