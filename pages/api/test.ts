import { NextApiRequest } from "next";

const test = async (req: NextApiRequest, res) => {
  res.status(200).json({ Testkey: "TestValue" });
};

export default test;
