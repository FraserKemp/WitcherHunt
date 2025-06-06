import {
  ButtonInteraction,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { UserData } from "../../../../types/UserTypes/UserTypes";
import { Monster } from "../../../../types/MonsterTypes/MonsterTypes";

export const huntCapture = (
  embed: EmbedBuilder,
  btnInteraction: ButtonInteraction,
  interaction: CommandInteraction,
  userData: UserData,
  monster: Monster,
) => {};
