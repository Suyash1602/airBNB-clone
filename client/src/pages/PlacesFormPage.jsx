import React, { useState, useEffect } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const PlacesFormPage = () => {
  const { id } = useParams();
  // console.log({ id });
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1000);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title || ""); // Ensure fallback to an empty string
      setAddress(data.address || "");
      setAddedPhotos(data.photos || []);
      setDescription(data.description || "");
      setPerks(data.perks || []);
      setExtraInfo(data.extraInfo || "");
      setCheckIn(data.checkIn || "");
      setCheckOut(data.checkOut || "");
      setMaxGuests(data.maxGuests || 1);
      setPrice(data.price || 1000);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  async function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // Update existing place
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // Create new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            "Title for your place. should be short and catchy."
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title, for eg. My lovely apt."
          />

          {preInput("Address", "Address to your place.")}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
          />

          {preInput("Photos", "more = better")}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          {preInput("Description", "description the place")}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {preInput("Perks", "select all the perks of your place")}
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>

          {preInput("Extra info", "house rules,etc")}
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />

          {preInput(
            "Check in&out times, max guests",
            `add check in and out times, rember to have time window for
              cleaning the room between guests`
          )}
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 ">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="14:14"
              />
            </div>
            <div>
              <h3 className="mt-2 ">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="11:11"
              />
            </div>
            <div>
              <h3 className="mt-2 ">Max number of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 ">Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <button className="primary my-4">Save</button>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;
