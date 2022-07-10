import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x28e375815Bd75b5B7922e9298D8B7DC009fdCF55"
);

export default instance;
