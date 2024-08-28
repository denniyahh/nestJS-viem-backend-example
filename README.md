<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Add Details on .env
```
PRIVATE_KEY="0x"
RPC_ENDPOINT="https://1rpc.io/sepolia"
TOKEN_ADDRESS="0x77ec5e6688e9e212feedfe08ea67ecd911bae5d9"
```
## Routes

# Token API

This API provides endpoints to interact with an ERC20 token on the Sepolia testnet.

## Endpoints

### 1. Get Contract Address
- **URL**: `/contract-address`
- **Method**: GET
- **Example**: 
  ```
  curl http://localhost:3000/contract-address
  ```

### 2. Get Token Name
- **URL**: `/token-name`
- **Method**: GET
- **Example**:
  ```
  curl http://localhost:3000/token-name
  ```

### 3. Get Total Supply
- **URL**: `/total-supply`
- **Method**: GET
- **Example**:
  ```
  curl http://localhost:3000/total-supply
  ```

### 4. Get Token Balance
- **URL**: `/token-balance/:address`
- **Method**: GET
- **Example**:
  ```
  curl "http://localhost:3000/token-balance/0x777410F6AE513F55c714c6843D66929dc7933280"
  ```

### 5. Get Transaction Receipt
- **URL**: `/transaction-receipt`
- **Method**: GET
- **Query Params**: `hash`
- **Example**:
  ```
  curl "http://localhost:3000/transaction-receipt?hash=0xff32b7d374c9e879cd8f0220db70158ea64d4bced7b50c1c6a991f07a4ba14f9"
  ```

### 6. Get Server Wallet Address
- **URL**: `/server-wallet-address`
- **Method**: GET
- **Example**:
  ```
  curl http://localhost:3000/server-wallet-address
  ```

### 7. Check Minter Role
- **URL**: `/check-minter-role`
- **Method**: GET
- **Query Params**: `address`
- **Example**:
  ```
  curl "http://localhost:3000/check-minter-role?address=0x777410F6AE513F55c714c6843D66929dc7933280"
  ```

### 8. Mint Tokens
- **URL**: `/mint-tokens`
- **Method**: POST
- **Body**: JSON with `address` field
- **Example**:
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"address":"0x777410F6AE513F55c714c6843D66929dc7933280"}' http://localhost:3000/mint-tokens
  ```

## Note
Ensure you replace `localhost:3000` with your actual server address if different. All responses are in JSON format.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
