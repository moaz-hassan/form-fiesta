import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function increaseUserNumber() {
  const counterRef = doc(db, "usersNum", "counter");

  const counterSnap = await getDoc(counterRef);

  let currentNum = 0;
  if (counterSnap.exists()) {
    currentNum = counterSnap.data().uNum || 0;
  }

  const newNum = currentNum + 1;

  await setDoc(counterRef, { uNum: newNum });

  return newNum;
}
