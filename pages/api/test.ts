import { NextApiRequest } from "next";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

const test = async (req: NextApiRequest, res) => {
  res.status(200).json({
    serverRuntimeConfig,
  });
};

export default test;
