import { sendError } from "./logger-frontend";

export default function assert(
  condition: boolean,
  msg: string,
): asserts condition {
  if (!condition) {
    const error = new Error("assert failed");
    sendError(error, msg);
    throw error;
  }
}
