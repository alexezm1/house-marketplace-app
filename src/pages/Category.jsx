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

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const [noMoreListings, setNoMoreListings] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get a reference of listing collection
        const listingCollection = collection(db, "listings");

        // Query
        const q = query(
          listingCollection,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // Execute query
        const querySnapshot = await getDocs(q);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastFetchedListing(lastVisible);

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
  }, [params.categoryName]);

  // Pagination / Load More
  const loadMoreListings = async () => {
    try {
      // Get a reference of listing collection
      const listingCollection = collection(db, "listings");

      // Query
      const q = query(
        listingCollection,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );

      // Execute query
      const querySnapshot = await getDocs(q);

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listingsData = [];

      querySnapshot.forEach((doc) => {
        return listingsData.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listingsData]);
      setNoMoreListings(querySnapshot.empty);
      setLoading(false);
    } catch (error) {
      toast.error("Could not load more listings");
    }
  };
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>

        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul className="categoryListings">
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
              </ul>
            </main>

            <br />
            <br />
            {noMoreListings ? (
              <p>No More Listings</p>
            ) : (
              <p className="loadMore" onClick={() => loadMoreListings()}>
                Load More
              </p>
            )}
          </>
        ) : (
          <p>No listings for {params.categoryName} </p>
        )}
      </header>
    </div>
  );
}

export default Category;
