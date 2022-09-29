import apiFunctionHelper from '../helper/apiFunctionHelper';
import { Body, Get } from '../../pages/api/user';
import { ObjectId } from 'mongodb';

/**
 * Checks if user exists in DB.
 * @param userId 
 * @returns string; Client or server error
 * @returns null; Request successful but userId is invalid
 * @returns User: UserSchema; Request successful and userId is valid
 */
export default async function readUser(userId: string | ObjectId) {

  return await apiFunctionHelper<Get, Body>(
    {
      method: "GET",
      url: `api/user/`,
      params: { userId }
    }, "readUser"
  );
}