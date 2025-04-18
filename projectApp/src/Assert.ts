import { sendError } from "./logger-frontend";

/**
 * Asserts that a given condition is true.
 *
 * @param {boolean} condition - A boolean value that is expected to be true.
 * @param {string} msg - A string message that describes the failure context if the assertion fails.
 * @throws {Error} Throws a generic Error with the message "assert failed" if the condition is false.
 *
 * @precondition
 * - The `condition` parameter must be a boolean that represents the success of a check.
 * - The `msg` parameter must be a non-empty string describing the context of the assertion.
 *
 * @postcondition
 * - If the condition is true, the function completes normally and TypeScript understands that the condition holds.
 * - If the condition is false, an error is logged via sendError with the provided message, and a generic Error is thrown.
 *
 */

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
