import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../assets/svg/deleteIcon.svg";
import bedIcon from "../../assets/svg/bedIcon.svg";
import bathtubIcon from "../../assets/svg/bathtubIcon.svg";

function ListingItem({ listing: { data, id }, onDelete }) {
  return (
    <li className="categoryListing">
      <Link className="categoryListingLink" to={`/category/${data.type}/${id}`}>
        <img
          className="categoryListingImg"
          src={data.imageUrls[0]}
          alt={data.name}
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{data.location}</p>
          <p className="categoryListingName">{data.name}</p>
          <p className="categoryListingPrice">
            $
            {data.offer
              ? data.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : data.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {data.type === "rent" && " / Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {data.bedrooms > 1 ? `${data.bedrooms} Bedrooms` : "1 Bedroom"}
            </p>
            <img src={bathtubIcon} alt="bathtub" />
            <p className="categoryListingInfoText">
              {data.bathrooms > 1
                ? `${data.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          fill="rgb(231,76,60)"
          onClick={() => onDelete(id, data.name)}
        />
      )}
    </li>
  );
}

export default ListingItem;
