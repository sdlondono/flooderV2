import { ref, onValue } from '@firebase/database';
import { db } from './config';

export const doLogin = async (username: string) => {
  const query = ref(db, `/notifs/${username}`);
  return onValue(query, (snapshot) => {
    console.log(snapshot.val());
    snapshot.exists();
  });
};
