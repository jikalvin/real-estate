import {
    collection,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";


export function useHouses() {
    const q = query(collection(db, "houses"));
    const [hses, isLoading, error] = useCollectionData(q);
    if (error) throw error;
    return { hses, isLoading };
  }