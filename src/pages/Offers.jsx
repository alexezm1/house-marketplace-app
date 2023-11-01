import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/listings/ListingItem";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get a reference of listing collection
        const listingCollection = collection(db, "listings");

        // Query
        const q = query(
          listingCollection,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // Execute query
        const querySnapshot = await getDocs(q);

        const listingsData = [];

        querySnapshot.forEach((doc) => {
          return listingsData.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listingsData);
        setLoading(false);
      } catch (error) {
        toast.error("Could not load listings");
      }
    };
    fetchListings();
  }, []);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>

        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul className="categoryListings">
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                  />
                ))}
              </ul>
            </main>
          </>
        ) : (
          <p>There are no current offers</p>
        )}
      </header>
    </div>
  );
}

export default Offers;
