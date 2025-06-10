import { UserData } from "../../../types/UserTypes/UserTypes";

export const generateFooterText = (userData: UserData) => {
  const invItems = userData.inventory.items;
  const footerText = `=========Items left=========
Rusty dagger: ${invItems.killItems.rusty_dagger} | Runed Steel Blades ${invItems.killItems.runed_steel_blades}
Silver sword: ${invItems.killItems.silver_sword} | Binding Stone: ${invItems.killItems.binding_stone}`;
  return footerText;
};
