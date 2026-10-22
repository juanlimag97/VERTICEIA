import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

/**
 * Cliente S3-compatível para o Cloudflare R2. R2 usa o mesmo protocolo da
 * AWS S3, então o SDK da AWS funciona normalmente, só apontando pro
 * endpoint da sua conta Cloudflare.
 */
export function createR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID!;

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
