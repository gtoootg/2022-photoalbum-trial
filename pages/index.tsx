import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import api from "./api/country";

const Home: NextPage = () => {
  const [countries, setCountries] = useState([]);
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
      // axios({
      //   method: "post",
      //   url: "api/country",
      //   headers: { "Content-Type": "application/json" },
      //   data: data,
      // })
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

  return (
    <>
      <button onClick={submit}>Submit</button>
      {countries.map(
        (country: { name: string; capital: string }, i: number) => {
          return <span key={i}>name:{country.name}</span>;
        }
      )}
    </>
  );
};

export default Home;
