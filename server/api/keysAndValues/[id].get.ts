
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pocketbase.aehm.cloud');
export default defineEventHandler(async (event) => {
  const result = await pb.collection('keys_and_values').getFirstListItem( `id="${event.context.params?.id}"` );
  return result;
});

