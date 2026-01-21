import { H3Event } from 'h3';

export function hasBody(event: H3Event) {
  const method = event.method.toUpperCase();
  return ['PUT', 'POST', 'PATCH', 'DELETE'].includes(method);
}

export async function getBodyBuffer(
  event: H3Event,
): Promise<BodyInit | undefined> {
  if (!hasBody(event)) return;
  const body = await readRawBody(event, false);
  return body as BodyInit | undefined;
}
