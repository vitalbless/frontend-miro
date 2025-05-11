import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers/auth";
import { boardsHandlers } from "./handlers/boards";

export const worker = setupWorker(...boardsHandlers, ...authHandlers);
