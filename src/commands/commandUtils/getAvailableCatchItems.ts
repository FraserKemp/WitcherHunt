import { UserData } from "../../types/UserTypes/UserTypes";
import { defaultUserData } from "../../data/UserData";
import { captureItems } from "../../Enums/Items";
import { NumberValue } from "@aws-sdk/util-dynamodb/dist-types/NumberValue";

export const getAvailableCatchItems = (userData: UserData) => {
	const itemOrder = [
		"snare_trap",
		"moon_dust",
		"yrden_trap",
		"dimeritium_trap",
	];
	const userItems = userData.inventory.items.captureItems;

	return Object.entries(userItems)
		.filter(([itemId, count]) => {
			return count > 0 && itemOrder.includes(itemId);
		})
		.map(([itemId]) => captureItems[itemId])
		.sort((a, b) => itemOrder.indexOf(a.id) - itemOrder.indexOf(b.id));
};
