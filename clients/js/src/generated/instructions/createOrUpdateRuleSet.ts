/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
} from '@metaplex-foundation/umi-core';
import {
  CreateOrUpdateRuleSetArgs,
  getCreateOrUpdateRuleSetArgsSerializer,
} from '../types';

// Accounts.
export type CreateOrUpdateRuleSetInstructionAccounts = {
  /** Payer and creator of the RuleSet */
  payer?: Signer;
  /** The PDA account where the RuleSet is stored */
  ruleSetPda: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
  /** The buffer to copy a complete ruleset from */
  bufferPda?: PublicKey;
};

// Arguments.
export type CreateOrUpdateRuleSetInstructionData = {
  discriminator: number;
  createOrUpdateArgs: CreateOrUpdateRuleSetArgs;
};

export type CreateOrUpdateRuleSetInstructionArgs = {
  createOrUpdateArgs: CreateOrUpdateRuleSetArgs;
};

export function getCreateOrUpdateRuleSetInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  CreateOrUpdateRuleSetInstructionArgs,
  CreateOrUpdateRuleSetInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    CreateOrUpdateRuleSetInstructionArgs,
    CreateOrUpdateRuleSetInstructionData,
    CreateOrUpdateRuleSetInstructionData
  >(
    s.struct<CreateOrUpdateRuleSetInstructionData>(
      [
        ['discriminator', s.u8],
        ['createOrUpdateArgs', getCreateOrUpdateRuleSetArgsSerializer(context)],
      ],
      'CreateOrUpdateRuleSetInstructionArgs'
    ),
    (value) =>
      ({ ...value, discriminator: 0 } as CreateOrUpdateRuleSetInstructionData)
  ) as Serializer<
    CreateOrUpdateRuleSetInstructionArgs,
    CreateOrUpdateRuleSetInstructionData
  >;
}

// Instruction.
export function createOrUpdateRuleSet(
  context: Pick<Context, 'serializer' | 'programs' | 'payer'>,
  input: CreateOrUpdateRuleSetInstructionAccounts &
    CreateOrUpdateRuleSetInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenAuthRules').publicKey;

  // Resolved accounts.
  const payerAccount = input.payer ?? context.payer;
  const ruleSetPdaAccount = input.ruleSetPda;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };
  const bufferPdaAccount = input.bufferPda ?? {
    ...programId,
    isWritable: false,
  };

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // Rule Set Pda.
  keys.push({
    pubkey: ruleSetPdaAccount,
    isSigner: false,
    isWritable: isWritable(ruleSetPdaAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Buffer Pda.
  keys.push({
    pubkey: bufferPdaAccount,
    isSigner: false,
    isWritable: isWritable(bufferPdaAccount, false),
  });

  // Data.
  const data =
    getCreateOrUpdateRuleSetInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
