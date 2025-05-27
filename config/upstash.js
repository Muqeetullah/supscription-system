import { Client as WorkflowClient } from "@upstash/workflow";
import { QSTASH_URL, QSTASH_TOKEN } from "./env.js";

const workflowclient = new WorkflowClient({
  url: QSTASH_URL,
  token: QSTASH_TOKEN,
});

export default workflowclient;
