import { methodRes } from './utilities/methodRes';
import mongoose from 'mongoose';
require('../database/model/users');
const db = mongoose.connection;
const Users = mongoose.model('Users');
import bcrypt from 'bcryptjs';



const auth = async (socket, ABI, req) => {
    console.log(req, ABI);
    
    methodRes.success(socket, {
        type: 'success',
        method: req.method,
        id: req.id,
        message: 'Đăng nhập thành công',
        result: ABI.output,
    })
}

const cmc_crypto_info = async (socket, ABI, req) => {
    


    methodRes.success(socket, {
        method: req.method,
        id: req.id,
        message: 'Tra cứu thành công',
        result: {
            "_id": {
                "$oid": "62ea79912c50c879e4b1fb6b"
            },
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "category": "coin",
            "description": "Bitcoin (BTC) is a cryptocurrency . Users are able to generate BTC through the process of mining. Bitcoin has a current supply of 19,111,256. The last known price of Bitcoin is 23,283.96802988 USD and is up 2.08 over the last 24 hours. It is currently trading on 9659 active market(s) with $29,296,873,614.22 traded over the last 24 hours. More information can be found at https://bitcoin.org/.",
            "slug": "bitcoin",
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
            "subreddit": "bitcoin",
            "notice": "",
            "tags": [
                "mineable",
                "pow",
                "sha-256",
                "store-of-value",
                "state-channel",
                "coinbase-ventures-portfolio",
                "three-arrows-capital-portfolio",
                "polychain-capital-portfolio",
                "binance-labs-portfolio",
                "blockchain-capital-portfolio",
                "boostvc-portfolio",
                "cms-holdings-portfolio",
                "dcg-portfolio",
                "dragonfly-capital-portfolio",
                "electric-capital-portfolio",
                "fabric-ventures-portfolio",
                "framework-ventures-portfolio",
                "galaxy-digital-portfolio",
                "huobi-capital-portfolio",
                "alameda-research-portfolio",
                "a16z-portfolio",
                "1confirmation-portfolio",
                "winklevoss-capital-portfolio",
                "usv-portfolio",
                "placeholder-ventures-portfolio",
                "pantera-capital-portfolio",
                "multicoin-capital-portfolio",
                "paradigm-portfolio"
            ],
            "tag-names": [
                "Mineable",
                "PoW",
                "SHA-256",
                "Store Of Value",
                "State Channel",
                "Coinbase Ventures Portfolio",
                "Three Arrows Capital Portfolio",
                "Polychain Capital Portfolio",
                "Binance Labs Portfolio",
                "Blockchain Capital Portfolio",
                "BoostVC Portfolio",
                "CMS Holdings Portfolio",
                "DCG Portfolio",
                "DragonFly Capital Portfolio",
                "Electric Capital Portfolio",
                "Fabric Ventures Portfolio",
                "Framework Ventures Portfolio",
                "Galaxy Digital Portfolio",
                "Huobi Capital Portfolio",
                "Alameda Research Portfolio",
                "a16z Portfolio",
                "1Confirmation Portfolio",
                "Winklevoss Capital Portfolio",
                "USV Portfolio",
                "Placeholder Ventures Portfolio",
                "Pantera Capital Portfolio",
                "Multicoin Capital Portfolio",
                "Paradigm Portfolio"
            ],
            "tag-groups": [
                "OTHERS",
                "ALGORITHM",
                "ALGORITHM",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY",
                "CATEGORY"
            ],
            "urls": {
                "website": [
                    "https://bitcoin.org/"
                ],
                "twitter": [],
                "message_board": [
                    "https://bitcointalk.org"
                ],
                "chat": [],
                "facebook": [],
                "explorer": [
                    "https://blockchain.coinmarketcap.com/chain/bitcoin",
                    "https://blockchain.info/",
                    "https://live.blockcypher.com/btc/",
                    "https://blockchair.com/bitcoin",
                    "https://explorer.viabtc.com/btc"
                ],
                "reddit": [
                    "https://reddit.com/r/bitcoin"
                ],
                "technical_doc": [
                    "https://bitcoin.org/bitcoin.pdf"
                ],
                "source_code": [
                    "https://github.com/bitcoin/bitcoin"
                ],
                "announcement": []
            },
            "platform": null,
            "date_added": "2013-04-28T00:00:00.000Z",
            "twitter_username": "",
            "is_hidden": 0,
            "date_launched": null,
            "contract_address": [],
            "self_reported_circulating_supply": null,
            "self_reported_tags": null,
            "self_reported_market_cap": null
        },
    })
}
const cmc_crypto_category = async (socket, ABI, req) => {
    methodRes.success(socket, {
        method: req.method,
        id: req.id,
        message: 'Tra cứu thành công',
        result: {
            "_id": {
                "$oid": "62ea7c4e2c50c879e4b1fb84"
            },
            "id": "605e2ce9d41eae1066535f7c",
            "name": "a16z Portfolio",
            "title": "a16z Portfolio",
            "description": "a16z Portfolio",
            "num_tokens": 16,
            "last_updated": "2021-11-10T17:23:01.089Z",
            "avg_price_change": 3.695955504375,
            "market_cap": 679827956138.9897,
            "market_cap_change": 3.788949999999999,
            "volume": 53238315268.113686,
            "volume_change": -0.6059375000000005,
            "coins": [
                {
                    "id": 1,
                    "name": "Bitcoin",
                    "symbol": "BTC",
                    "slug": "bitcoin",
                    "num_market_pairs": 9659,
                    "date_added": "2013-04-28T00:00:00.000Z",
                    "tags": [
                        "mineable",
                        "pow",
                        "sha-256",
                        "store-of-value",
                        "state-channel",
                        "coinbase-ventures-portfolio",
                        "three-arrows-capital-portfolio",
                        "polychain-capital-portfolio",
                        "binance-labs-portfolio",
                        "blockchain-capital-portfolio",
                        "boostvc-portfolio",
                        "cms-holdings-portfolio",
                        "dcg-portfolio",
                        "dragonfly-capital-portfolio",
                        "electric-capital-portfolio",
                        "fabric-ventures-portfolio",
                        "framework-ventures-portfolio",
                        "galaxy-digital-portfolio",
                        "huobi-capital-portfolio",
                        "alameda-research-portfolio",
                        "a16z-portfolio",
                        "1confirmation-portfolio",
                        "winklevoss-capital-portfolio",
                        "usv-portfolio",
                        "placeholder-ventures-portfolio",
                        "pantera-capital-portfolio",
                        "multicoin-capital-portfolio",
                        "paradigm-portfolio"
                    ],
                    "max_supply": 21000000,
                    "circulating_supply": 19111256,
                    "total_supply": 19111256,
                    "is_active": 1,
                    "platform": null,
                    "cmc_rank": 1,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 23354.090387128836,
                            "volume_24h": 29253112515.1615,
                            "volume_change_24h": 6.926,
                            "percent_change_1h": -0.13097384,
                            "percent_change_24h": 2.18894855,
                            "percent_change_7d": 9.20642891,
                            "percent_change_30d": 19.18783644,
                            "percent_change_60d": -21.10729007,
                            "percent_change_90d": -40.61391237,
                            "market_cap": 446326000035.5583,
                            "market_cap_dominance": 41.2461,
                            "fully_diluted_market_cap": 490435898129.71,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 1027,
                    "name": "Ethereum",
                    "symbol": "ETH",
                    "slug": "ethereum",
                    "num_market_pairs": 5901,
                    "date_added": "2015-08-07T00:00:00.000Z",
                    "tags": [
                        "mineable",
                        "pow",
                        "smart-contracts",
                        "ethereum-ecosystem",
                        "coinbase-ventures-portfolio",
                        "three-arrows-capital-portfolio",
                        "polychain-capital-portfolio",
                        "binance-labs-portfolio",
                        "blockchain-capital-portfolio",
                        "boostvc-portfolio",
                        "cms-holdings-portfolio",
                        "dcg-portfolio",
                        "dragonfly-capital-portfolio",
                        "electric-capital-portfolio",
                        "fabric-ventures-portfolio",
                        "framework-ventures-portfolio",
                        "hashkey-capital-portfolio",
                        "kenetic-capital-portfolio",
                        "huobi-capital-portfolio",
                        "alameda-research-portfolio",
                        "a16z-portfolio",
                        "1confirmation-portfolio",
                        "winklevoss-capital-portfolio",
                        "usv-portfolio",
                        "placeholder-ventures-portfolio",
                        "pantera-capital-portfolio",
                        "multicoin-capital-portfolio",
                        "paradigm-portfolio",
                        "injective-ecosystem",
                        "bnb-chain"
                    ],
                    "max_supply": null,
                    "circulating_supply": 121812599.3115,
                    "total_supply": 121812599.3115,
                    "is_active": 1,
                    "platform": null,
                    "cmc_rank": 2,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 1662.8163277651972,
                            "volume_24h": 20744051954.96391,
                            "volume_change_24h": 12.9709,
                            "percent_change_1h": 0.07937103,
                            "percent_change_24h": 5.18820499,
                            "percent_change_7d": 12.54370396,
                            "percent_change_30d": 51.4714603,
                            "percent_change_60d": -5.75328284,
                            "percent_change_90d": -43.00122181,
                            "market_cap": 202551979062.68182,
                            "market_cap_dominance": 18.6916,
                            "fully_diluted_market_cap": 202551979062.68,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 52,
                    "name": "XRP",
                    "symbol": "XRP",
                    "slug": "xrp",
                    "num_market_pairs": 785,
                    "date_added": "2013-08-04T00:00:00.000Z",
                    "tags": [
                        "medium-of-exchange",
                        "enterprise-solutions",
                        "binance-chain",
                        "arrington-xrp-capital-portfolio",
                        "galaxy-digital-portfolio",
                        "a16z-portfolio",
                        "pantera-capital-portfolio"
                    ],
                    "max_supply": {
                        "$numberLong": "100000000000"
                    },
                    "circulating_supply": {
                        "$numberLong": "48343101197"
                    },
                    "total_supply": {
                        "$numberLong": "99989535142"
                    },
                    "is_active": 1,
                    "platform": null,
                    "cmc_rank": 6,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 0.3741977960409973,
                            "volume_24h": 1196477583.509372,
                            "volume_change_24h": 3.5147,
                            "percent_change_1h": 0.13188731,
                            "percent_change_24h": 1.10959649,
                            "percent_change_7d": 11.00825989,
                            "percent_change_30d": 16.72012416,
                            "percent_change_60d": -3.93447851,
                            "percent_change_90d": -40.84175039,
                            "market_cap": 18089881921.704296,
                            "market_cap_dominance": 1.6721,
                            "fully_diluted_market_cap": 37419779604.1,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 7083,
                    "name": "Uniswap",
                    "symbol": "UNI",
                    "slug": "uniswap",
                    "num_market_pairs": 395,
                    "date_added": "2020-09-17T00:00:00.000Z",
                    "tags": [
                        "decentralized-exchange",
                        "defi",
                        "dao",
                        "yield-farming",
                        "amm",
                        "coinbase-ventures-portfolio",
                        "three-arrows-capital-portfolio",
                        "governance",
                        "blockchain-capital-portfolio",
                        "defiance-capital-portfolio",
                        "alameda-research-portfolio",
                        "a16z-portfolio",
                        "pantera-capital-portfolio",
                        "parafi-capital",
                        "paradigm-portfolio",
                        "arbitrum-ecosytem",
                        "injective-ecosystem",
                        "bnb-chain"
                    ],
                    "max_supply": 1000000000,
                    "circulating_supply": 745305550.4995831,
                    "total_supply": 1000000000,
                    "platform": {
                        "id": 1027,
                        "name": "Ethereum",
                        "symbol": "ETH",
                        "slug": "ethereum",
                        "token_address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
                    },
                    "is_active": 1,
                    "cmc_rank": 15,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": 1.09892775,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 9.120239868082626,
                            "volume_24h": 333691729.05804884,
                            "volume_change_24h": 16.5174,
                            "percent_change_1h": -1.29364947,
                            "percent_change_24h": 13.12448308,
                            "percent_change_7d": 34.94134764,
                            "percent_change_30d": 81.44341914,
                            "percent_change_60d": 81.96075672,
                            "percent_change_90d": 16.06370083,
                            "market_cap": 6797365395.569567,
                            "market_cap_dominance": 0.6283,
                            "fully_diluted_market_cap": 9120239868.08,
                            "tvl": 6185452471.93118,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 2280,
                    "name": "Filecoin",
                    "symbol": "FIL",
                    "slug": "filecoin",
                    "num_market_pairs": 227,
                    "date_added": "2017-12-13T00:00:00.000Z",
                    "tags": [
                        "mineable",
                        "distributed-computing",
                        "filesharing",
                        "storage",
                        "polychain-capital-portfolio",
                        "blockchain-capital-portfolio",
                        "boostvc-portfolio",
                        "dcg-portfolio",
                        "hashkey-capital-portfolio",
                        "a16z-portfolio",
                        "winklevoss-capital-portfolio",
                        "pantera-capital-portfolio",
                        "web3",
                        "bnb-chain"
                    ],
                    "max_supply": null,
                    "circulating_supply": 252149457,
                    "total_supply": 252149457,
                    "is_active": 1,
                    "platform": null,
                    "cmc_rank": 33,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 8.442000571496832,
                            "volume_24h": 996682157.9517155,
                            "volume_change_24h": -9.4398,
                            "percent_change_1h": 0.05396287,
                            "percent_change_24h": 4.00655341,
                            "percent_change_7d": 58.9710061,
                            "percent_change_30d": 55.58105023,
                            "percent_change_60d": 14.72565799,
                            "percent_change_90d": -44.26988127,
                            "market_cap": 2128645860.096616,
                            "market_cap_dominance": 0.1966,
                            "fully_diluted_market_cap": 2128645860.1,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 4558,
                    "name": "Flow",
                    "symbol": "FLOW",
                    "slug": "flow",
                    "num_market_pairs": 83,
                    "date_added": "2021-01-27T00:00:00.000Z",
                    "tags": [
                        "collectibles-nfts",
                        "coinbase-ventures-portfolio",
                        "coinfund-portfolio",
                        "dcg-portfolio",
                        "ledgerprime-portfolio",
                        "a16z-portfolio",
                        "animoca-brands-portfolio"
                    ],
                    "max_supply": null,
                    "circulating_supply": 1036200000,
                    "total_supply": 1390757889,
                    "is_active": 1,
                    "platform": null,
                    "cmc_rank": 35,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 1.9202669470428027,
                            "volume_24h": 58126365.36057018,
                            "volume_change_24h": -40.1228,
                            "percent_change_1h": -0.09631551,
                            "percent_change_24h": 2.16556422,
                            "percent_change_7d": 13.50057916,
                            "percent_change_30d": 23.60028547,
                            "percent_change_60d": -21.67733055,
                            "percent_change_90d": -61.45241733,
                            "market_cap": 1989780610.525752,
                            "market_cap_dominance": 0.1839,
                            "fully_diluted_market_cap": 2670626405.59,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 1518,
                    "name": "Maker",
                    "symbol": "MKR",
                    "slug": "maker",
                    "num_market_pairs": 263,
                    "date_added": "2017-01-29T00:00:00.000Z",
                    "tags": [
                        "store-of-value",
                        "defi",
                        "dao",
                        "polychain-capital-portfolio",
                        "governance",
                        "lending-borowing",
                        "dragonfly-capital-portfolio",
                        "electric-capital-portfolio",
                        "a16z-portfolio",
                        "1confirmation-portfolio",
                        "placeholder-ventures-portfolio",
                        "pantera-capital-portfolio",
                        "paradigm-portfolio",
                        "near-protocol-ecosystem",
                        "spartan-group",
                        "bnb-chain"
                    ],
                    "max_supply": 1005577,
                    "circulating_supply": 977631.03695089,
                    "total_supply": 977631.03695089,
                    "platform": {
                        "id": 1027,
                        "name": "Ethereum",
                        "symbol": "ETH",
                        "slug": "ethereum",
                        "token_address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
                    },
                    "is_active": 1,
                    "cmc_rank": 50,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": 0.12462697,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 1074.0150498450396,
                            "volume_24h": 221534318.5042198,
                            "volume_change_24h": 19.8225,
                            "percent_change_1h": -0.49634386,
                            "percent_change_24h": 4.05615649,
                            "percent_change_7d": 16.30284913,
                            "percent_change_30d": 16.79980295,
                            "percent_change_60d": -7.24554547,
                            "percent_change_90d": -28.14383402,
                            "market_cap": 1049990446.8808678,
                            "market_cap_dominance": 0.097,
                            "fully_diluted_market_cap": 1080004831.78,
                            "tvl": 8425065955.45452,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 5632,
                    "name": "Arweave",
                    "symbol": "AR",
                    "slug": "arweave",
                    "num_market_pairs": 65,
                    "date_added": "2020-05-27T00:00:00.000Z",
                    "tags": [
                        "distributed-computing",
                        "filesharing",
                        "storage",
                        "coinbase-ventures-portfolio",
                        "solana-ecosystem",
                        "arrington-xrp-capital-portfolio",
                        "blockchain-capital-portfolio",
                        "a16z-portfolio",
                        "multicoin-capital-portfolio",
                        "web3"
                    ],
                    "max_supply": 66000000,
                    "circulating_supply": 33394701,
                    "total_supply": 63190435,
                    "is_active": 1,
                    "platform": null,
                    "cmc_rank": 81,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 14.674237597894523,
                            "volume_24h": 71375639.4334574,
                            "volume_change_24h": 41.9181,
                            "percent_change_1h": -0.02641256,
                            "percent_change_24h": 7.25119278,
                            "percent_change_7d": 19.07668606,
                            "percent_change_30d": 28.13702189,
                            "percent_change_60d": 16.30896201,
                            "percent_change_90d": -42.03224216,
                            "market_cap": 490041776.98464584,
                            "market_cap_dominance": 0.0452,
                            "fully_diluted_market_cap": 968499681.46,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 5567,
                    "name": "Celo",
                    "symbol": "CELO",
                    "slug": "celo",
                    "num_market_pairs": 116,
                    "date_added": "2020-05-22T00:00:00.000Z",
                    "tags": [
                        "pos",
                        "zero-knowledge-proofs",
                        "mobile",
                        "payments",
                        "smart-contracts",
                        "coinbase-ventures-portfolio",
                        "polychain-capital-portfolio",
                        "dragonfly-capital-portfolio",
                        "electric-capital-portfolio",
                        "a16z-portfolio",
                        "celo-ecosystem"
                    ],
                    "max_supply": 1000000000,
                    "circulating_supply": 456611349,
                    "total_supply": 1000000000,
                    "is_active": 1,
                    "platform": null,
                    "cmc_rank": 83,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 1.0273327708903128,
                            "volume_24h": 22441744.30508769,
                            "volume_change_24h": -43.2632,
                            "percent_change_1h": 0.08284128,
                            "percent_change_24h": 2.74406805,
                            "percent_change_7d": 20.34558813,
                            "percent_change_30d": 17.66947978,
                            "percent_change_60d": -18.47511823,
                            "percent_change_90d": -60.18953084,
                            "market_cap": 469091802.38813365,
                            "market_cap_dominance": 0.0434,
                            "fully_diluted_market_cap": 1027332770.89,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 7653,
                    "name": "Oasis Network",
                    "symbol": "ROSE",
                    "slug": "oasis-network",
                    "num_market_pairs": 61,
                    "date_added": "2020-11-12T00:00:00.000Z",
                    "tags": [
                        "cosmos-ecosystem",
                        "collectibles-nfts",
                        "defi",
                        "privacy",
                        "scaling",
                        "smart-contracts",
                        "polychain-capital-portfolio",
                        "binance-labs-portfolio",
                        "arrington-xrp-capital-portfolio",
                        "blockchain-capital-portfolio",
                        "dragonfly-capital-portfolio",
                        "electric-capital-portfolio",
                        "kenetic-capital-portfolio",
                        "huobi-capital-portfolio",
                        "a16z-portfolio",
                        "winklevoss-capital-portfolio",
                        "pantera-capital-portfolio"
                    ],
                    "max_supply": {
                        "$numberLong": "10000000000"
                    },
                    "circulating_supply": {
                        "$numberLong": "5027383223"
                    },
                    "total_supply": {
                        "$numberLong": "10000000000"
                    },
                    "platform": {
                        "id": 1027,
                        "name": "Ethereum",
                        "symbol": "ETH",
                        "slug": "ethereum",
                        "token_address": "0x26B80FBfC01b71495f477d5237071242e0d959d7"
                    },
                    "is_active": 1,
                    "cmc_rank": 92,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 0.0843888517381408,
                            "volume_24h": 108381920.08327135,
                            "volume_change_24h": 19.3636,
                            "percent_change_1h": -0.80785198,
                            "percent_change_24h": 2.60719007,
                            "percent_change_7d": 73.16326137,
                            "percent_change_30d": 70.34645625,
                            "percent_change_60d": 25.5079512,
                            "percent_change_90d": -53.25971799,
                            "market_cap": 424255097.43656343,
                            "market_cap_dominance": 0.0392,
                            "fully_diluted_market_cap": 843888517.38,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 5692,
                    "name": "Compound",
                    "symbol": "COMP",
                    "slug": "compound",
                    "num_market_pairs": 278,
                    "date_added": "2020-06-16T00:00:00.000Z",
                    "tags": [
                        "defi",
                        "dao",
                        "yield-farming",
                        "polkadot-ecosystem",
                        "coinbase-ventures-portfolio",
                        "three-arrows-capital-portfolio",
                        "polychain-capital-portfolio",
                        "lending-borowing",
                        "dragonfly-capital-portfolio",
                        "alameda-research-portfolio",
                        "a16z-portfolio",
                        "pantera-capital-portfolio",
                        "paradigm-portfolio",
                        "bnb-chain"
                    ],
                    "max_supply": 10000000,
                    "circulating_supply": 7194025.3714948,
                    "total_supply": 10000000,
                    "platform": {
                        "id": 1027,
                        "name": "Ethereum",
                        "symbol": "ETH",
                        "slug": "ethereum",
                        "token_address": "0xc00e94cb662c3520282e6f5717214004a7f26888"
                    },
                    "is_active": 1,
                    "cmc_rank": 94,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": 0.14499703,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 58.22312684242648,
                            "volume_24h": 130108834.10948953,
                            "volume_change_24h": 0.7596,
                            "percent_change_1h": -0.15155466,
                            "percent_change_24h": 4.29151018,
                            "percent_change_7d": 18.53418433,
                            "percent_change_30d": 20.21230973,
                            "percent_change_60d": 3.53812775,
                            "percent_change_90d": -48.94296899,
                            "market_cap": 418858651.712176,
                            "market_cap_dominance": 0.0387,
                            "fully_diluted_market_cap": 582231268.42,
                            "tvl": 2888739454.75645,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 5566,
                    "name": "Keep Network",
                    "symbol": "KEEP",
                    "slug": "keep-network",
                    "num_market_pairs": 63,
                    "date_added": "2020-05-13T00:00:00.000Z",
                    "tags": [
                        "defi",
                        "privacy",
                        "coinbase-ventures-portfolio",
                        "polychain-capital-portfolio",
                        "boostvc-portfolio",
                        "fabric-ventures-portfolio",
                        "a16z-portfolio",
                        "multicoin-capital-portfolio",
                        "parafi-capital",
                        "paradigm-portfolio"
                    ],
                    "max_supply": 1000000000,
                    "circulating_supply": 842857756.720734,
                    "total_supply": 999848780.8,
                    "platform": {
                        "id": 1027,
                        "name": "Ethereum",
                        "symbol": "ETH",
                        "slug": "ethereum",
                        "token_address": "0x85eee30c52b0b379b046fb0f85f4f3dc3009afec"
                    },
                    "is_active": 1,
                    "cmc_rank": 159,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": 5.07143802,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 0.18373522902710646,
                            "volume_24h": 517952.76063931,
                            "volume_change_24h": -70.6201,
                            "percent_change_1h": 0.00532047,
                            "percent_change_24h": 3.06670213,
                            "percent_change_7d": 8.52357794,
                            "percent_change_30d": -3.67610886,
                            "percent_change_60d": -21.30126807,
                            "percent_change_90d": -56.45969763,
                            "market_cap": 154862662.96835724,
                            "market_cap_dominance": 0.0143,
                            "fully_diluted_market_cap": 183735229.03,
                            "tvl": 30536242.83312,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 8075,
                    "name": "Rally",
                    "symbol": "RLY",
                    "slug": "rally",
                    "num_market_pairs": 58,
                    "date_added": "2020-12-22T00:00:00.000Z",
                    "tags": [
                        "yield-farming",
                        "social-token",
                        "social-money",
                        "coinbase-ventures-portfolio",
                        "kenetic-capital-portfolio",
                        "ledgerprime-portfolio",
                        "a16z-portfolio"
                    ],
                    "max_supply": {
                        "$numberLong": "15000000000"
                    },
                    "circulating_supply": 3118665497.843471,
                    "total_supply": {
                        "$numberLong": "15000000000"
                    },
                    "platform": {
                        "id": 1027,
                        "name": "Ethereum",
                        "symbol": "ETH",
                        "slug": "ethereum",
                        "token_address": "0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b"
                    },
                    "is_active": 1,
                    "cmc_rank": 168,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 0.04366704271414131,
                            "volume_24h": 2169908.91912082,
                            "volume_change_24h": 29.5436,
                            "percent_change_1h": 0.04342153,
                            "percent_change_24h": 0.62832394,
                            "percent_change_7d": -2.36008518,
                            "percent_change_30d": 17.83489549,
                            "percent_change_60d": -27.59102306,
                            "percent_change_90d": -68.66767675,
                            "market_cap": 136182899.50544962,
                            "market_cap_dominance": 0.0126,
                            "fully_diluted_market_cap": 655005640.71,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 10688,
                    "name": "Yield Guild Games",
                    "symbol": "YGG",
                    "slug": "yield-guild-games",
                    "num_market_pairs": 96,
                    "date_added": "2021-06-28T00:00:00.000Z",
                    "tags": [
                        "collectibles-nfts",
                        "gaming",
                        "entertainment",
                        "dao",
                        "metaverse",
                        "a16z-portfolio",
                        "play-to-earn",
                        "animoca-brands-portfolio",
                        "gaming-guild",
                        "okex-blockdream-ventures-portfolio"
                    ],
                    "max_supply": 1000000000,
                    "circulating_supply": 116331159.1611021,
                    "total_supply": 1000000000,
                    "platform": {
                        "id": 1027,
                        "name": "Ethereum",
                        "symbol": "ETH",
                        "slug": "ethereum",
                        "token_address": "0x25f8087ead173b73d6e8b84329989a8eea16cf73"
                    },
                    "is_active": 1,
                    "cmc_rank": 276,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": 87906250,
                    "self_reported_market_cap": 71040293.09105508,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 0.8081369992583585,
                            "volume_24h": 16449391.63782762,
                            "volume_change_24h": -9.6452,
                            "percent_change_1h": 0.31625414,
                            "percent_change_24h": 0.14891026,
                            "percent_change_7d": 7.76232936,
                            "percent_change_30d": 28.07097864,
                            "percent_change_60d": 35.34170864,
                            "percent_change_90d": -44.26208402,
                            "market_cap": 94011513.88469955,
                            "market_cap_dominance": 0.0087,
                            "fully_diluted_market_cap": 808136999.26,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 5026,
                    "name": "Orchid",
                    "symbol": "OXT",
                    "slug": "orchid",
                    "num_market_pairs": 75,
                    "date_added": "2019-12-16T00:00:00.000Z",
                    "tags": [
                        "polychain-capital-portfolio",
                        "blockchain-capital-portfolio",
                        "fabric-ventures-portfolio",
                        "kenetic-capital-portfolio",
                        "a16z-portfolio",
                        "web3"
                    ],
                    "max_supply": null,
                    "circulating_supply": 690690083.7746798,
                    "total_supply": 1000000000,
                    "platform": {
                        "id": 1027,
                        "name": "Ethereum",
                        "symbol": "ETH",
                        "slug": "ethereum",
                        "token_address": "0x4575f41308EC1483f3d399aa9a2826d74Da13Deb"
                    },
                    "is_active": 1,
                    "cmc_rank": 303,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 0.11870323667367234,
                            "volume_24h": 7801839.4416309,
                            "volume_change_24h": -21.6691,
                            "percent_change_1h": -0.43905889,
                            "percent_change_24h": 2.16713851,
                            "percent_change_7d": 7.41337406,
                            "percent_change_30d": 12.50554515,
                            "percent_change_60d": -8.84105235,
                            "percent_change_90d": -42.4493501,
                            "market_cap": 81987148.48246439,
                            "market_cap_dominance": 0.0076,
                            "fully_diluted_market_cap": 118703236.67,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                },
                {
                    "id": 5221,
                    "name": "Handshake",
                    "symbol": "HNS",
                    "slug": "handshake",
                    "num_market_pairs": 13,
                    "date_added": "2020-02-22T00:00:00.000Z",
                    "tags": [
                        "distributed-computing",
                        "collectibles-nfts",
                        "storage",
                        "boostvc-portfolio",
                        "dcg-portfolio",
                        "kenetic-capital-portfolio",
                        "a16z-portfolio",
                        "pantera-capital-portfolio",
                        "web3"
                    ],
                    "max_supply": 2040000000,
                    "circulating_supply": 513261236.896583,
                    "total_supply": 498388271.433299,
                    "is_active": 1,
                    "platform": null,
                    "cmc_rank": 524,
                    "is_fiat": 0,
                    "self_reported_circulating_supply": null,
                    "self_reported_market_cap": null,
                    "tvl_ratio": null,
                    "last_updated": "2022-08-03T13:43:00.000Z",
                    "quote": {
                        "USD": {
                            "price": 0.05930970568992628,
                            "volume_24h": 75254.90539932,
                            "volume_change_24h": 29.6168,
                            "percent_change_1h": 0.3460218,
                            "percent_change_24h": 3.58454244,
                            "percent_change_7d": -13.55547164,
                            "percent_change_30d": -16.96616056,
                            "percent_change_60d": -10.35495175,
                            "percent_change_90d": -50.47359643,
                            "market_cap": 30441372.90238387,
                            "market_cap_dominance": 0.0028,
                            "fully_diluted_market_cap": 120991799.61,
                            "tvl": null,
                            "last_updated": "2022-08-03T13:43:00.000Z"
                        }
                    }
                }
            ]
        },
    })
}

const auth_login = async (socket, ABI, req) => {
    let [username, password] = req.params;
    
    await Users.findOne({ username: username }, function (err, user) {
        if (err) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Internal Error',
            result: {}
        })
        if (!user) {
            return methodRes.error(socket, {
                method: req.method,
                id: req.id,
                message: 'Username and/or password is incorrect.',
                result: {}
            })
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return methodRes.error(socket, {
                method: req.method,
                id: req.id,
                message: 'Username and/or password is incorrect.',
                result: {}
            })
        }
        return methodRes.success(socket, {
            method: req.method,
            id: req.id,
            message: 'Đăng nhập thành công!',
            result: user,
        })
    });

}
const auth_register = async (socket, ABI, req) => {
    let [name, username, password] = req.params;

    if (!name || !username || !password) return methodRes.error(socket, {
        method: req.method,
        id: req.id,
        message: 'All fields are required!',
        result: {}
    })

    await Users.findOne({ username: username }, async function (err, user) {
        if (err) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Internal Error',
            result: {}
        })
        if (user) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Username already exist!',
            result: {}
        })

        const salt = bcrypt.genSaltSync(10);
        const newUser = new Users({
            name: name,
            username: username,
            password: bcrypt.hashSync(password, salt)
        });

        await newUser.save(function (err) {
            if (err) return console.error(err);
        });

        return methodRes.success(socket, {
            method: req.method,
            id: req.id,
            message: 'User is successfully registered!',
            result: {},
        })
    });
}


export default {
    auth,
    cmc_crypto_info,
    cmc_crypto_category,
    auth_register,
    auth_login
}