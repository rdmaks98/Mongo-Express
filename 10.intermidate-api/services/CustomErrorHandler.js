class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  static alreadyExists(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(
    message = "please enter valid username and password"
  ) {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorize(message = "user unauthorize") {
    return new CustomErrorHandler(401, message);
  }
  static notFound(message = "user not found") {
    return new CustomErrorHandler(404, message);
  }
}

export default CustomErrorHandler;
