export class ApplicationError extends Error {
  constructor(message, status) {
    super();
    
    this.name = this.constructor.name;
    this.message = 'Something went wrong. Please try again.' || message;
    this.status =  500 || status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadReqError extends ApplicationError {
  constructor() {
    super();
    this.status = 400;
    this.message = 'Bad Request Error';
  }
}
  
export class UnauthorizedError extends ApplicationError {
  constructor() {
    super();
     this.status = 401;
     this.message = 'Unauthorized Error';
  }
}
  
export class ForbiddenError extends ApplicationError {
    constructor() {
      super();
      this.status = 403;
      this.message = 'Forbidden Error';
    }
  }

export class NotFoundError extends ApplicationError {
    constructor(entity = '') {
      super();
      this.status = 404;
      this.message = `Not found ${entity}`;
    }
  }

