import { createNewProfile } from "./createNewProfile";
import { assertIsError } from "../../utils/assertIsError";
import { UserData } from "../../types/UserTypes/UserTypes";
import { getUserProfile } from "./getUserProfile";
import { ApiResponse } from "../../types/CommonTypes";

export const getOrCreateUserData = async (
  userId: string,
  username: string,
): Promise<ApiResponse<UserData>> => {
  try {
    console.log(`Searching for User ${userId} record in DB`);
    // Check if the user already exists in the database
    const result = await getUserProfile(userId);
    if (result.success) {
      const item = result.data;
      return { success: true, status: "success", data: item };
    } else {
      // If not found, create new user with default data
      console.log(`User, id:${userId}, not found. Creating new user.`);
      // Store new user data and return it
      const response = await createNewProfile(userId, username);
      if (response.status == "error") {
        console.error(`Call ran and didnt succeed, code:${response.status}`);
        throw new Error(response.errorMessage);
      }
      return { success: true, status: "success", data: response.data };
    }
  } catch (error) {
    assertIsError(error);
    console.error("Error retrieving or creating user data:", error);
    return { success: false, status: "error", errorMessage: error.message };
  }
};
