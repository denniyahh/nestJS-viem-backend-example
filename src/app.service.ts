import { Injectable } from '@nestjs/common';
import { createPublicClient, formatEther, http, keccak256, toHex } from 'viem';
import { sepolia } from 'viem/chains';
import * as tokenJSON from './assets/token.json';
import { ConfigService } from '@nestjs/config';
import { privateKeyToAccount } from 'viem/accounts';
import { createWalletClient } from 'viem';
import { parseEther } from 'viem';
import { MintTokenDto } from './dtos/mintToken.dto';

@Injectable()
export class AppService {
  publicClient;
  walletClient;
  account;
  MINTER_ROLE;

  constructor(private configService: ConfigService) {
    this.publicClient = createPublicClient({
      chain: sepolia,
      transport: http(this.configService.get<string>('RPC_ENDPOINT')),
    });
    this.account = privateKeyToAccount(
      this.configService.get<string>('PRIVATE_KEY') as `0x${string}`,
    );
    this.walletClient = createWalletClient({
      account: this.account,
      chain: sepolia,
      transport: http(this.configService.get<string>('RPC_ENDPOINT')),
    });
    this.MINTER_ROLE = keccak256(toHex('MINTER_ROLE'));
  }

  async waitForTransactionSuccess(txHash: any) {
    const receipt = await this.publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    if (!receipt || receipt.status !== 'success') {
      throw new Error(`Transaction failed. Hash: ${txHash}`);
    }

    return receipt;
  }

  getHello(): string {
    return 'Hello test!';
  }

  getContractAddress(): string {
    return this.configService.get<string>('TOKEN_ADDRESS');
  }

  async getTokenName(): Promise<string> {
    const name = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJSON.abi,
      functionName: 'name',
    });
    return name as string;
  }

  async getTotalSupply(): Promise<string> {
    console.log(this.configService.get<string>('PRIVATE_KEY'));
    const totalSupplyBN = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJSON.abi,
      functionName: 'totalSupply',
    });
    const totalSupply = formatEther(totalSupplyBN as bigint);
    return totalSupply;
  }

  async getTokenBalance(address: string): Promise<string> {
    const balanceBN = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJSON.abi,
      functionName: 'balanceOf',
      args: [address],
    });
    const balance = formatEther(balanceBN as bigint);
    return balance;
  }

  async getTransactionReceipt(hash: string) {
    const txReceipt = await this.publicClient.getTransactionReceipt({
      hash: hash as `0x${string}`,
    });
    // AI: BigInt is not serializable, so we need to convert it to string
    const serializedReceipt = JSON.parse(
      JSON.stringify(txReceipt, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );
    return serializedReceipt;
  }

  getServerWalletAddress(): string {
    return this.account.address;
  }

  async checkMinterRole(address: string): Promise<boolean> {
    const hasMinterRole = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJSON.abi,
      functionName: 'hasRole',
      args: [this.MINTER_ROLE, address],
    });

    return hasMinterRole as boolean;
  }

  async mintTokens(body: MintTokenDto) {
    const address = body.address;
    const amount = body.amount;
    try {
      const mintTx = await this.walletClient.writeContract({
        address: this.getContractAddress(),
        abi: tokenJSON.abi,
        functionName: 'mint',
        args: [address, parseEther(amount.toString())],
      });

      if (await this.waitForTransactionSuccess(mintTx)) {
        console.log(`Minted ${amount} tokens to ${address}`);
        return {
          result: true,
          message: `Minted  ${amount} tokens to ${address}`,
          transactionHash: mintTx,
        };
      } else {
        return {
          result: false,
          message: `Failed to mint tokens to ${address}`,
          transactionHash: mintTx,
        };
      }
    } catch (error) {
      console.error('Error in mintTokens:', error);
      return {
        result: false,
        message: `Error minting tokens: ${error.message}`,
      };
    }
  }
}
