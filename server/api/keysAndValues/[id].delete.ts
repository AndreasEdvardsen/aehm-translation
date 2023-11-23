
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pocketbase.aehm.cloud');
export default defineEventHandler(async (event) => {
    if (!event?.context?.params?.id) return;
    return await pb.collection('keys_and_values').delete(event.context.params.id);
});

