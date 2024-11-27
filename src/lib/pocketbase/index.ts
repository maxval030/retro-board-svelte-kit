import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';

const pd = new PocketBase(env.PUBLIC_END_POINT_POCKETBASE_URL);
// pd.autoCancellation(false);

export default pd;
