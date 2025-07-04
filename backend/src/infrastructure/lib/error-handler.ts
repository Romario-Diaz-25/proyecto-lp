import { internalServerError } from "./handler-error";
import { AppError } from "./app-error";

export function errorHandler(error: unknown, description?: string) {
  if (error instanceof AppError) {
    throw error;
  } else {
    const err = error as Error;
    throw internalServerError(
      description ? `${description}: ${err.message}` : err.message
    );
  }
}
