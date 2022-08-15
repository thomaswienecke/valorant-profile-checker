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

  const name = userInfo.data.acct.game_name;
  const tag = userInfo.data.acct.tag_line;

  const storeFront = await AuthClient.Store.GetStorefront(puuid);

  if (storeFront.data.errorCode === "SCHEDULED_DOWNTIME") {
    res.status(500).json({
      error: "SCHEDULED_DOWNTIME",
    });
    return;
  }

  const singleOffers = storeFront.data.SkinsPanelLayout.SingleItemOffers;

  const offersUntil =
    storeFront.data.SkinsPanelLayout.SingleItemOffersRemainingDurationInSeconds;

  const offers = [];
  for (const offerId of singleOffers) {
    const val = await ValoApiClient.Weapons.getSkinLevelByUuid(offerId);
    offers.push(val.data.data);
  }

  const bundleOffer = storeFront.data.FeaturedBundle.Bundle;
  const bundleUntil =
    storeFront.data.FeaturedBundle.BundleRemainingDurationInSeconds;

  const bundle = [];
  for (const bundleOfferItem of bundleOffer.Items) {
    const val = await ValoApiClient.Weapons.getSkinLevelByUuid(
      bundleOfferItem.Item.ItemID
    );

    const enrichedItem = val?.data?.data;
    if (enrichedItem) {
      bundleOfferItem.enrichedItem = enrichedItem;
    }

    bundle.push(bundleOfferItem);
  }

  res
    .status(200)
    .json({ name, tag, puuid, offers, offersUntil, bundle, bundleUntil });
};

export default login;
