import { killItems } from "../../Enums/Items";
import { UserData } from "../../types/UserTypes/UserTypes";

// TODO: create an item name enum so we can use that everywhere. This means we only have to
export const getAvailableKillItems = (userData: UserData) => {
  const itemOrder = [
    "rusty_dagger",
    "runed_steel_blades",
    "silver_sword",
    "binding_stone",
  ];
  return Object.entries(userData.inventory.items)
    .filter(([itemId, count]) => count > 0 && itemOrder.includes(itemId)) // keep only valid items in desired order
    .map(([itemId]) => killItems[itemId])
    .sort((a, b) => itemOrder.indexOf(a.id) - itemOrder.indexOf(b.id));
};
