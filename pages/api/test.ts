import { NextApiRequest } from "next";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const test = async (req: NextApiRequest, res) => {
  res.status(200).json({
    publicRuntimeConfig,
  });
};

export default test;
