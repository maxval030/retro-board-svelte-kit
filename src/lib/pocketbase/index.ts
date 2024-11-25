import PocketBase from 'pocketbase';

const pd = new PocketBase(import.meta.env.PUBLIC_END_POINT_POCKETBASE_URL);

export default pd;
