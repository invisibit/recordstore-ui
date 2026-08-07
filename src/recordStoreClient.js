import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { RecordStoreService } from "./gen/recordstore/v1/recordstore_pb.ts";

const serverUrl = process.env.REACT_APP_API_URL || process.env.REACT_APP_SERVER_URL || "https://127.0.0.1";
const serverPort = process.env.REACT_APP_API_PORT || process.env.REACT_APP_SERVER_PORT;
const baseUrl = serverPort ? `${serverUrl}:${serverPort}` : serverUrl;

const transport = createConnectTransport({
  baseUrl,
  fetch: (url, init) => fetch(url, Object.assign({ credentials: "include" }, init)),
});

export const recordStoreClient = createClient(RecordStoreService, transport);
