import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';
import type { TypedPocketBase } from '$lib/pocketbase-types';

const pb = new PocketBase(env.PUBLIC_END_POINT_POCKETBASE_URL) as TypedPocketBase;
// pd.autoCancellation(false);

export default pb;
