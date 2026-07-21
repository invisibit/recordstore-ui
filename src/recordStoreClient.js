import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { RecordStoreService } from "./gen/recordstore/v1/recordstore_pb.ts";

const baseUrl = process.env.REACT_APP_API_URL || "https://localhost:4000";

const transport = createConnectTransport({ baseUrl });

export const recordStoreClient = createClient(RecordStoreService, transport);
