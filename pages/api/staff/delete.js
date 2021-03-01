import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { id } = req.body;
    await db.collection("staff_info").deleteOne({ _id: ObjectId(id) });
    res.status(200).json({ msg: "Deleted Staff" });
  } catch (e) {
    res.status(400).json({ msg: "Error when delete staff, please try later" });
  }
};
