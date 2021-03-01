import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { staffData } = req.body;
    await db.collection("staff_info").insertOne(staffData);
    res.status(200).json({ msg: "Staff created" });
  } catch (e) {
    res.status(400).json({ msg: "Can't create staff" });
  }
};
