import { UserData } from "../../../../types/UserTypes/UserTypes";


export const generateFooterText = (userData: UserData) => {
  const invItems = userData.inventory.items;
  const footerText = `=========Items left=========
Rusty dagger: ${invItems.rusty_dagger} | Runed Steel Blades ${invItems.runed_steel_blades}
Silver sword: ${invItems.silver_sword} | Binding Stone: ${invItems.binding_stone}`;
  return footerText
};