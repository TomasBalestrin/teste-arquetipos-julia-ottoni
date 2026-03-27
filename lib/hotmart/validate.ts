import { timingSafeEqual } from "crypto";

/**
 * Compara hottok recebido com o secret armazenado.
 * Usa timing-safe comparison para evitar timing attacks.
 */
export function validateHottok(
  receivedToken: string,
  storedSecret: string
): boolean {
  if (!receivedToken || !storedSecret) return false;

  const a = Buffer.from(receivedToken);
  const b = Buffer.from(storedSecret);

  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}
