import { killItems } from "../../Enums/Items";
import { UserData } from "../../types/UserTypes/UserTypes";

export const getAvailableItems = (userData: UserData) => {
  const itemOrder = [
    "rusty_dagger",
    "steel_sword",
    "silver_sword",
    "binding_stone",
  ];
  return Object.entries(userData.inventory.items)
    .filter(([itemId, count]) => count > 0 && itemOrder.includes(itemId)) // keep only valid items in desired order
    .map(([itemId]) => killItems[itemId])
    .sort((a, b) => itemOrder.indexOf(a.id) - itemOrder.indexOf(b.id));
};
