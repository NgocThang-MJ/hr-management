import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { staffData, id } = req.body;
    await db
      .collection("staff_info")
      .updateOne({ _id: ObjectId(id) }, { $set: staffData });
    res.status(200).json({ msg: "Staff updated" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Can't update staff" });
  }
};
