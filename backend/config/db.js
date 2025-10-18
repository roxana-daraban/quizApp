import mongoose from "mongoose";

export const connectDB = async () => {

    await mongoose.connect("mongodb+srv://darabanroxana2016_db_user:albastrudemetilen@cluster0.tpy0qgr.mongodb.net/QuizApp?retryWrites=true&w=majority&appName=Cluster0"
)
    .then(() => {
    console.log("Connected to MongoDB");

  })
}