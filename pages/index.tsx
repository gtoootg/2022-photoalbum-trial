import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";

const Home: NextPage = () => {
  const [countries, setCountries] = useState([]);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch("/api/countries")
      .then((res) => {
        return res.json();
      })
      .then((countries) => {
        setCountries(countries);
      });
  }, []);

  const submit = async () => {
    const data = { name: "Japan", capital: "tokkkyo" };
    const post = () => {
      axios
        .post("/api/country", data)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    post();
  };

  const apiPath =
    "https://api.flickr.com/services/rest?api_key=3bbbbcbca484db8972d0a979c293030f&method=flickr.photos.search&user_id=135315222@N04&format=json&nojsoncallback=?&extras=url_h,date_taken";

  const getFlickrAPI = () => {
    axios.get(apiPath).then((res) => {
      console.log(res.data.photos.photo[0].url_h);
      setPhotos(res.data.photos.photo);
    });
  };

  return (
    <>
      <button onClick={submit}>Submit</button>
      <button onClick={getFlickrAPI}>Submit</button>
      {countries.map(
        (country: { name: string; capital: string }, i: number) => {
          return <span key={i}>name:{country.name}</span>;
        }
      )}
      {photos.map((photo, i) => {
        return (
          <div key={i} style={{ width: "50%" }}>
            <Image alt="image" src={photo["url_h"]} height={200} width={300} />
          </div>
        );
      })}
    </>
  );
};

export default Home;
