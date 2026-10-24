import { NETWORKS } from "../lib/networks.ts";
import { createXrplClient } from "../lib/xrpl-client.ts";

const network = NETWORKS.TESTNET;
const client = createXrplClient(network);

try {
  await client.connect();
  const response = await client.request({ command: "server_info" });
  const info = response.result.info;

  if (info.network_id !== 1 || !info.validated_ledger) {
    throw new Error("Expected XRPL Testnet (network ID 1) with a validated ledger.");
  }

  console.log(
    JSON.stringify(
      {
        network: network.name,
        endpoint: network.wss,
        networkId: info.network_id,
        serverState: info.server_state,
        validatedLedger: info.validated_ledger.seq,
      },
      null,
      2
    )
  );
} catch (error) {
  console.error("XRPL Testnet connection failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  if (client.isConnected()) await client.disconnect();
}
