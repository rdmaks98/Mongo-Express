import Joi from "joi";
import { User, RefreshToken } from "../../model";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { REFRESH_SECURE } from "../../config";
import JwtService from "../../services/JwtService";

const refreshToken = {
  async refresh(req, res, next) {
    const refreshValidation = Joi.object({
      refresh_token: Joi.string().required(),
    });
    // console.log(req.body);
    const { error } = refreshValidation.validate(req.body);
    if (error) {
      return next(error);
    }

    let refresh_token, user_id, accesstoken;
    try {
      refresh_token = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });
      // console.log(refresh_token);
      if (!refresh_token) {
        return next(CustomErrorHandler.unAuthorize("invalid refresh token"));
      }

      try {
        const { _id } = await JwtService.verify(
          refresh_token.token,
          REFRESH_SECURE
        );
        user_id = _id;
      } catch (err) {
        return next(CustomErrorHandler.unAuthorize("invalid refresh"));
      }
    } catch (err) {
      return next(CustomErrorHandler.unAuthorize("invalid refresh token"));
    }
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return next(CustomErrorHandler.unAuthorize("user not found"));
    }

    accesstoken = JwtService.sign({
      _id: user._id,
      role: user.role,
    });
    refresh_token = JwtService.sign(
      {
        _id: user.id,
        role: user.role,
      },
      "1y",
      REFRESH_SECURE
    );
    await RefreshToken.create({ token: refresh_token });
    res.json({ message: "login succesfully", accesstoken, refresh_token });
  },
};
export default refreshToken;
