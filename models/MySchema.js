import mongoose from "mongoose";
const Schema = mongoose.Schema;

const articalSchema = new Schema({
  UserName: String,
  Password: String,
  Age: Number,
});

const MyModel = mongoose.model("Artical", articalSchema);

export default MyModel;