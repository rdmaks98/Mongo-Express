import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User, RefreshToken } from "../../model";
// import bcrypt from "bcrypt";
import { REFRESH_SECURE } from "../../config";
import JwtService from "../../services/JwtService";

const loginController = {
  async login(req, res, next) {
    const loginValidation = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{4,20}$")),
    });
    // console.log(req.body);
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return next(error);
    }
    let accessToken, refreshToken;
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      accessToken = JwtService.sign({
        _id: user.id,
        role: user.role,
      });
      refreshToken = JwtService.sign(
        {
          _id: user.id,
          role: user.role,
        },
        "1y",
        REFRESH_SECURE
      );
      await RefreshToken.create({ token: refreshToken });
    } catch (err) {
      return next(err);
    }
    res.status(200).json({
      token: accessToken,
      mesage: "login sucess",
      refreshtoken: refreshToken,
    });
  },

  async logout(req, res, next) {
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });
    const { error } = refreshSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const data = await RefreshToken.deleteOne({
        token: req.body.refresh_token,
      });
      console.log(data);
    } catch (err) {
      return next(
        new Error("something went wrong in the databse" + err.message)
      );
    }
    res.json({ message: "logout done" });
    x;
  },
};
export default loginController;
