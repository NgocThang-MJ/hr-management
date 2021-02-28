import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { id } = req.body;
    await db.collection("staff_info").deleteOne({ _id: ObjectId(id) });
    res.json({ msg: "Deleted Staff" });
  } catch (e) {
    console.log("error when delete staff", e);
  }
};
