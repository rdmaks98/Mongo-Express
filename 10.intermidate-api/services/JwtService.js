import { JWT_SECURE } from "../config";
import Jwt from "jsonwebtoken";
class JwtService {
  static sign(payload, expiry = "240s", secret = JWT_SECURE) {
    return Jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = JWT_SECURE) {
    return Jwt.verify(token, secret);
  }
}
export default JwtService;
