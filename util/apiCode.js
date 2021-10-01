class APIError extends Error {
  constructor({ code, message }) {
    const fullMsg = `${code}: ${message}`;
    super(fullMsg);
    this.code = code;
    this.message = message;
  }
}

exports.module = APIError;
