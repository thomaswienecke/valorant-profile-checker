import { NextApiRequest } from "next";

const test = async (req: NextApiRequest, res) => {
  res.status(200).json({ boooooy: "boy" });
};

export default test;
