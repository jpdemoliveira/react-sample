import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch the data for that resource");
          }
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setError(null);
          setData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.name === "AbortError") {
          } else {
            setIsLoading(false);
            setError(error.message);
          }
        });
    }, 500);

    return () => {
      abortCont.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
