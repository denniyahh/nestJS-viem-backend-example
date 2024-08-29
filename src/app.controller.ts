import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokenDto } from './dtos/mintToken.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /*
  ❯ curl http://localhost:3000/contract-address
  {"result":"0x77ec5e6688e9e212feedfe08ea67ecd911bae5d9"}%  
  */
  @Get('contract-address')
  getContractAddress() {
    return { result: this.appService.getContractAddress() };
  }

  /*
  ❯ curl http://localhost:3000/token-name
  {"result":"MyToken"}%   
  */
  @Get('token-name')
  async getTokenName() {
    return { result: await this.appService.getTokenName() };
  }

  /*
  ❯ curl http://localhost:3000/total-supply
  {"result":"480"}%    
  */
  @Get('total-supply')
  async getTotalSupply() {
    const totalSupply = await this.appService.getTotalSupply();
    return { result: totalSupply.toString() };
  }

  /*
  curl "http://localhost:3000/token-balance/0x777410F6AE513F55c714c6843D66929dc7933280"
  {"result":"290"}% 
  */
  @Get('token-balance/:address')
  async getTokenBalance(@Param('address') address: string) {
    const balance = await this.appService.getTokenBalance(address);
    return { result: balance.toString() };
  }

  /*
  ❯ curl "http://localhost:3000/transaction-receipt?hash=0xff32b7d374c9e879cd8f0220db70158ea64d4bced7b50c1c6a991f07a4ba14f9"
  {"result":{"blockHash":"0x73c67bbc9c79b5589a4734e33660e41ee09222541d151e4dacdf0d7ad1ce3876", ...
  */
  @Get('transaction-receipt')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return { result: await this.appService.getTransactionReceipt(hash) };
  }

  /*
  ❯ curl http://localhost:3000/server-wallet-address
  {"result":"0x777410F6AE513F55c714c6843D66929dc7933280"}% 
  */
  @Get('server-wallet-address')
  getServerWalletAddress() {
    return { result: this.appService.getServerWalletAddress() };
  }

  /*
  curl "http://localhost:3000/check-minter-role?address=0x777410F6AE513F55c714c6843D66929dc7933280"
  {"result":true}% 
  */
  @Get('check-minter-role')
  async checkMinterRole(@Query('address') address: string) {
    return { result: await this.appService.checkMinterRole(address) };
  }

  /*
  ❯ curl -X POST -H "Content-Type: application/json" -d '{"address":"0x777410F6AE513F55c714c6843D66929dc7933280"}' http://localhost:3000/mint-tokens
  {"success":true,"message":"Minted 100 tokens to 0x777410F6AE513F55c714c6843D66929dc7933280","transactionHash":"0xff32b7d374c9e879cd8f0220db70158ea64d4bced7b50c1c6a991f07a4ba14f9"}%
  */
  @Post('mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    try {
      console.log('Minting tokens:', body);
      const result = await this.appService.mintTokens(body);
      return result;
    } catch (error) {
      console.error('Error in mintTokens:', error);
      return {
        result: false,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }
}
