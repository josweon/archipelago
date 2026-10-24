import { Client } from "xrpl";
import { DEFAULT_NETWORK, type Network } from "./networks.ts";

/** Create a disconnected client. Callers own its connection and cleanup. */
export function createXrplClient(network: Network = DEFAULT_NETWORK): Client {
  return new Client(network.wss, {
    connectionTimeout: 10_000,
    timeout: 10_000,
  });
}
