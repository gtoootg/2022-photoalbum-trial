import type { NextPage } from "next";
import { useEffect, useState } from "react";

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

  return (
    <>
      {countries.map(
        (country: { name: string; capital: string }, i: number) => {
          return <span key={i}>name:{country.name}</span>;
        }
      )}
    </>
  );
};

export default Home;
