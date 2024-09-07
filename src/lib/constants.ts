import { CHAIN_NAMESPACES } from "@web3auth/base";

export const ADMIN_ADDRESS = "0x8bEBb95f8B9808198eAaA79eA92e35E854B60F87";
// export const CLIENT_ADDRESS = "0x3F233a18310c563270C3f8C6E9759b5f32FF4E08";
export const CLIENT_ADDRESS = "0x01b62237c2b66c7332600Bf92ad98e3310290426";

export const MODE: "local" | "hedera" = "local";
// export const MODE: "local" | "hedera" = "hedera";

export const contracts = {
  local: {
    USDC: "0x9A2CE31DF0f8c21b35EFDfBb9D783A146fe11Ba3",
    Vroombuddy: "0x71DBC289F9840B9b83Be8E268652dc1C406C9971",
    config: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x7a69",
      rpcTarget: "http://127.0.0.1:8545/",
      displayName: "Hedera Testnet",
      explorer: "https://hashscan.io/testnet/",
    },
  },
  hedera: {
    USDC: "",
    Vroombuddy: "",
    config: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x128",
      rpcTarget: "https://testnet.hashio.io/api",
      displayName: "Hedera Testnet",
      explorer: "https://hashscan.io/testnet/",
    },
  },
}[MODE];
