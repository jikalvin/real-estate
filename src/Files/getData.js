import { getDocs } from "firebase/firestore"; 
import { db } from "../firebase";
import {query, orderBy, collection, doc, deleteDoc} from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const collection_name = "houses"

export function useHouses() {
    const q = query(collection(db, "houses"), orderBy("date", "desc"));
    const [houses, isLoading, error] = useCollectionData(q);
    if (error) throw error;
    return { houses, isLoading };
  }

  export function useDeletePost(id) {
    const [isLoading, setLoading] = useState(false);
  
    async function deletePost() {
      const res = window.confirm("Are you sure you want to delete this House?");
  
      if (res) {
        setLoading(true);
  
        // Delete post document
        await deleteDoc(doc(db, "houses", id));
  
        setLoading(false);
      }
    }
  
    return { deletePost, isLoading };
  }
  