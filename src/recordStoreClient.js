import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { RecordStoreService } from "./gen/recordstore/v1/recordstore_pb.ts";

// Same-origin in prod (API is routed via the LB's path rules).
// For local dev, set REACT_APP_API_URL=http://127.0.0.1:<port> in .env.
const apiUrl = process.env.REACT_APP_API_URL || "";

const transport = createConnectTransport({
  baseUrl: apiUrl,
  fetch: (url, init) => fetch(url, Object.assign({ credentials: "include" }, init)),
});

export const recordStoreClient = createClient(RecordStoreService, transport);
