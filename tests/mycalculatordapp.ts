import * as anchor from '@project-serum/anchor';

const assert = require("assert");

describe("mycalculatordapp", () => {
  anchor.setProvider(anchor.Provider.env());
  const provider = anchor.getProvider();

  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Mycalculatordapp;

  it("Creates a calculator", async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [calculator],
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.greeting == "Welcome to Solana");
  });

  it("Adds two numbers", async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(5)));
  });

  // IMPLEMENT YOURSELF! Subtraction function
  it("Subtracts two numbers", async () => {
    await program.rpc.subtract(new anchor.BN(5), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(3)));
  });

  // IMPLEMENT YOURSELF! Multiplication function
  it("Multiplies two numbers", async () => {
    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(6)));
  });

  // IMPLEMENT YOURSELF! Division function
  it("Divides two numbers", async () => {
    await program.rpc.devide(new anchor.BN(6), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(3)));
  });
});
