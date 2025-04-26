import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

const PlacesPage = () => {
  const [places, setPlaces] = React.useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      // console.log(data);
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 space-y-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place._id}
              to={"/account/places/" + place._id}
              className="flex flex-col md:flex-row cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl shadow-md"
            >
              <div className="w-full md:w-32 h-32 bg-gray-300 flex-shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold">{place.title}</h2>
                <p className="text-sm mt-2 text-gray-500">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
