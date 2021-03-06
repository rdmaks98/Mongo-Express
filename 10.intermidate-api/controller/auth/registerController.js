import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User, RefreshToken } from "../../model";
// import bcrypt from "bcryptjs";
import { REFRESH_SECURE } from "../../config";
import JwtService from "../../services/JwtService";

const registerController = {
  async register(req, res, next) {
    // res.json({ msg: "hello user" });
    // validate request
    const registerSchema = Joi.object({
      name: Joi.string().min(4).max(20).message({
        "string.base": "name should be text",
        "string.empty": "name cannot be empty",
      }),
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{4,20}$")),
      confirmpassword: Joi.ref("password"),
    });
    console.log(req.body);
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExists("this email is already exist")
        );
      }
    } catch (err) {
      return next(err);
    }
    // const bpassword = await bcrypt.hash(req.body.password, 10);
    const { name, email, password } = req.body;
    // prepare model
    const user = new User({
      name,
      email,
      password,
    });

    let result, accessToken, refreshToken;
    try {
      result = await user.save();
      // token
      accessToken = JwtService.sign({
        _id: result.id,
        role: result.role,
      });
      refreshToken = JwtService.sign(
        {
          _id: result.id,
          role: result.role,
        },
        "1y",
        REFRESH_SECURE
      );
      await RefreshToken.create({ token: refreshToken });
    } catch (err) {
      return next(err);
    }
    res
      .status(200)
      .send({ data: result, token: accessToken, refreshToken: refreshToken });
  },
};
export default registerController;
