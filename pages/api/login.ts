import { Client } from "@valapi/web-client";
import { Client as ValoAPI } from "@valapi/valorant-api.com";
import { NextApiRequest } from "next";

const login = async (req: NextApiRequest, res) => {
  const { username, password } = req.body;

  const AuthClient = new Client();
  await AuthClient.login(username, password);

  const ValoApiClient = new ValoAPI();

  const userInfo = await AuthClient.Player.GetUserInfo();
  const puuid = userInfo.data.sub;
  console.log(userInfo.data);

  const name = userInfo.data.acct.game_name;
  const tag = userInfo.data.acct.tag_line;

  const storeFront = await AuthClient.Store.GetStorefront(puuid);

  if (storeFront.data.errorCode === "SCHEDULED_DOWNTIME") {
    res.status(500).json({
      error: "SCHEDULED_DOWNTIME",
    });
    return;
  }

  const { SingleItemOffers }: { SingleItemOffers: string[] } =
    storeFront.data.SkinsPanelLayout;

  const offers = [];
  for (const offerId of SingleItemOffers) {
    const val = await ValoApiClient.Weapons.getSkinLevelByUuid(offerId);
    offers.push(val.data.data);
  }

  res.status(200).json({ name, tag, puuid, offers });
};

export default login;
