/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  GetDataEnumKind,
  GetDataEnumKindContent,
  Serializer,
} from '@metaplex-foundation/umi-core';

export type PrintSupply =
  | { __kind: 'Zero' }
  | { __kind: 'Limited'; fields: [bigint] }
  | { __kind: 'Unlimited' };

export type PrintSupplyArgs =
  | { __kind: 'Zero' }
  | { __kind: 'Limited'; fields: [number | bigint] }
  | { __kind: 'Unlimited' };

export function getPrintSupplySerializer(
  context: Pick<Context, 'serializer'>
): Serializer<PrintSupplyArgs, PrintSupply> {
  const s = context.serializer;
  return s.dataEnum<PrintSupply>(
    [
      ['Zero', s.unit],
      [
        'Limited',
        s.struct<GetDataEnumKindContent<PrintSupply, 'Limited'>>(
          [['fields', s.tuple([s.u64])]],
          'Limited'
        ),
      ],
      ['Unlimited', s.unit],
    ],
    undefined,
    'PrintSupply'
  ) as Serializer<PrintSupplyArgs, PrintSupply>;
}

// Data Enum Helpers.
export function printSupply(
  kind: 'Zero'
): GetDataEnumKind<PrintSupplyArgs, 'Zero'>;
export function printSupply(
  kind: 'Limited',
  data: GetDataEnumKindContent<PrintSupplyArgs, 'Limited'>['fields']
): GetDataEnumKind<PrintSupplyArgs, 'Limited'>;
export function printSupply(
  kind: 'Unlimited'
): GetDataEnumKind<PrintSupplyArgs, 'Unlimited'>;
export function printSupply<K extends PrintSupplyArgs['__kind']>(
  kind: K,
  data?: any
): Extract<PrintSupplyArgs, { __kind: K }> {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}
export function isPrintSupply<K extends PrintSupply['__kind']>(
  kind: K,
  value: PrintSupply
): value is PrintSupply & { __kind: K } {
  return value.__kind === kind;
}
