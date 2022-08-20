import { getRedisClient } from "../../lib/redis";

const fetchSharedData = async (req, res) => {
  const sharedUserKey = req.query.sharedUserKey as string;

  if (!sharedUserKey) {
    return res.status(500).json({
      error: "No key provided",
    });
  }

  const cachedUser = await (await getRedisClient()).get(sharedUserKey);

  if (!cachedUser) {
    return res.status(500).json({
      error: "No cached user found",
    });
  }

  const deserializedCachedUser = JSON.parse(cachedUser);

  return res.status(200).json(deserializedCachedUser);
};

export default fetchSharedData;
