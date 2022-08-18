import { NextApiRequest } from "next";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const userDataCache = serverRuntimeConfig?.cache;

const fetchSharedData = async (req: NextApiRequest, res) => {
  const sharedUserKey = req.query.sharedUserKey as string;

  if (!sharedUserKey) {
    return res.status(500).json({
      error: "No key provided",
    });
  }

  const cachedUser = await userDataCache.get(sharedUserKey);

  if (!cachedUser) {
    return res.status(500).json({
      error: "No cached user found",
    });
  }

  return res.status(200).json(cachedUser);
};

export default fetchSharedData;
