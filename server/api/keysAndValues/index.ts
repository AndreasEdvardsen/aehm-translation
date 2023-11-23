
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pocketbase.aehm.cloud');
export default defineEventHandler(async (event) => {
  const resultList = await pb.collection('keys_and_values').getFullList();
    return resultList;
});

