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
  publicKey,
} from '@metaplex-foundation/umi-core';
import {
  findMasterEditionPda,
  findMetadataPda,
  findTokenRecordPda,
} from '../accounts';
import { MigrateArgs, getMigrateArgsSerializer } from '../types';

// Accounts.
export type MigrateInstructionAccounts = {
  /** Metadata account */
  metadata?: PublicKey;
  /** Edition account */
  edition?: PublicKey;
  /** Token account */
  token: PublicKey;
  /** Token account owner */
  tokenOwner: PublicKey;
  /** Mint account */
  mint: PublicKey;
  /** Update authority */
  payer?: Signer;
  /** Update authority */
  authority?: Signer;
  /** Collection metadata account */
  collectionMetadata: PublicKey;
  /** Delegate record account */
  delegateRecord: PublicKey;
  /** Token record account */
  tokenRecord?: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
  /** Instruction sysvar account */
  sysvarInstructions?: PublicKey;
  /** Token Program */
  splTokenProgram?: PublicKey;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey;
};

// Arguments.
export type MigrateInstructionData = {
  discriminator: number;
  migrateArgs: MigrateArgs;
};

export type MigrateInstructionArgs = { migrateArgs: MigrateArgs };

export function getMigrateInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<MigrateInstructionArgs, MigrateInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    MigrateInstructionArgs,
    MigrateInstructionData,
    MigrateInstructionData
  >(
    s.struct<MigrateInstructionData>(
      [
        ['discriminator', s.u8],
        ['migrateArgs', getMigrateArgsSerializer(context)],
      ],
      'MigrateInstructionArgs'
    ),
    (value) => ({ ...value, discriminator: 48 } as MigrateInstructionData)
  ) as Serializer<MigrateInstructionArgs, MigrateInstructionData>;
}

// Instruction.
export function migrate(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: MigrateInstructionAccounts & MigrateInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;

  // Resolved accounts.
  const mintAccount = input.mint;
  const metadataAccount =
    input.metadata ??
    findMetadataPda(context, { mint: publicKey(mintAccount) });
  const editionAccount =
    input.edition ??
    findMasterEditionPda(context, { mint: publicKey(mintAccount) });
  const tokenAccount = input.token;
  const tokenOwnerAccount = input.tokenOwner;
  const payerAccount = input.payer ?? context.payer;
  const authorityAccount = input.authority ?? context.identity;
  const collectionMetadataAccount = input.collectionMetadata;
  const delegateRecordAccount = input.delegateRecord;
  const tokenRecordAccount =
    input.tokenRecord ??
    findTokenRecordPda(context, {
      mint: publicKey(mintAccount),
      token: publicKey(tokenAccount),
    });
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };
  const sysvarInstructionsAccount =
    input.sysvarInstructions ??
    publicKey('Sysvar1nstructions1111111111111111111111111');
  const splTokenProgramAccount = input.splTokenProgram ?? {
    ...context.programs.get('splToken').publicKey,
    isWritable: false,
  };
  const authorizationRulesProgramAccount = input.authorizationRulesProgram ?? {
    ...programId,
    isWritable: false,
  };
  const authorizationRulesAccount = input.authorizationRules ?? {
    ...programId,
    isWritable: false,
  };

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, true),
  });

  // Edition.
  keys.push({
    pubkey: editionAccount,
    isSigner: false,
    isWritable: isWritable(editionAccount, true),
  });

  // Token.
  keys.push({
    pubkey: tokenAccount,
    isSigner: false,
    isWritable: isWritable(tokenAccount, true),
  });

  // Token Owner.
  keys.push({
    pubkey: tokenOwnerAccount,
    isSigner: false,
    isWritable: isWritable(tokenOwnerAccount, false),
  });

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, false),
  });

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // Authority.
  signers.push(authorityAccount);
  keys.push({
    pubkey: authorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(authorityAccount, false),
  });

  // Collection Metadata.
  keys.push({
    pubkey: collectionMetadataAccount,
    isSigner: false,
    isWritable: isWritable(collectionMetadataAccount, false),
  });

  // Delegate Record.
  keys.push({
    pubkey: delegateRecordAccount,
    isSigner: false,
    isWritable: isWritable(delegateRecordAccount, false),
  });

  // Token Record.
  keys.push({
    pubkey: tokenRecordAccount,
    isSigner: false,
    isWritable: isWritable(tokenRecordAccount, false),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Sysvar Instructions.
  keys.push({
    pubkey: sysvarInstructionsAccount,
    isSigner: false,
    isWritable: isWritable(sysvarInstructionsAccount, false),
  });

  // Spl Token Program.
  keys.push({
    pubkey: splTokenProgramAccount,
    isSigner: false,
    isWritable: isWritable(splTokenProgramAccount, false),
  });

  // Authorization Rules Program.
  keys.push({
    pubkey: authorizationRulesProgramAccount,
    isSigner: false,
    isWritable: isWritable(authorizationRulesProgramAccount, false),
  });

  // Authorization Rules.
  keys.push({
    pubkey: authorizationRulesAccount,
    isSigner: false,
    isWritable: isWritable(authorizationRulesAccount, false),
  });

  // Data.
  const data = getMigrateInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
