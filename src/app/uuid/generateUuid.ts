export interface UuidInputs {
  generatedNumber: number;
  uppercase: boolean;
  hyphen: boolean;
  braces: boolean;
}

export function generateUuid(inputs: UuidInputs): string {
  let uuid = crypto.randomUUID();
  if (!inputs.hyphen) uuid = uuid.replaceAll('-', '');
  if (inputs.uppercase) uuid = uuid.toUpperCase();
  if (inputs.braces) uuid = `{${uuid}}`;
  return uuid;
}

export function generateUuids(inputs: UuidInputs): string[] {
  return Array.from({ length: inputs.generatedNumber }, () =>
    generateUuid(inputs),
  );
}
