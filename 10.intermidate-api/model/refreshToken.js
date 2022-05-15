import mongoose from "mongoose";
const refreshTokenschema = new mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
    },
  },
  { timestamps: false }
);

export default mongoose.model("Refresh-Token", refreshTokenschema);
