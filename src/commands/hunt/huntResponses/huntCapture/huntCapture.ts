import {
  ButtonInteraction,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { UserData } from "../../../../types/UserTypes/UserTypes";
import { Monster } from "../../../../types/MonsterTypes/MonsterTypes";
import { getAvailableCatchItems } from "../../../commandUtils/getAvailableCatchItems";

export const huntCapture = async (
  embed: EmbedBuilder,
  btnInteraction: ButtonInteraction,
  interaction: CommandInteraction,
  userData: UserData,
  monster: Monster,
) => {
  const captureItems = getAvailableCatchItems(userData);
};
