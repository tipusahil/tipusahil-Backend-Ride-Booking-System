class AppError extends Error {
  public statusCode1: number;

  constructor(statusCode1: number, message: string, stack = "") {
    super(message);
    this.statusCode1 = statusCode1;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
