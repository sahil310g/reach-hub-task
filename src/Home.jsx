import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
  const [submitText, setSubmitText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/search?q=${submitText}&token=cngumepr01qhlsli9e30cngumepr01qhlsli9e3g`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(true);
        console.log(error);
      }
      setText("");
    };
    if(submitText !== "") 
    fetchData();
  }, [submitText]);

  const handleSubmit = () => {
    setSubmitText(text);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };


  return (
    <div>
      <input type="text" onChange={handleChange} value={text} />
      <button onClick={handleSubmit}>Submit</button>
      {Object.keys(data).length!==0 && error ? (
        <p>Failed to fetch data</p>
      ) : (
        <div>
          <h1> Total Count: {data.count}</h1>
          <div>
            {data.result ?(
              Object.entries(data.result).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    backgroundColor: "grey",
                    margin: "1rem",
                    borderRadius: "10px",
                    padding: "1rem",
                  }}
                >
                  <p>Description: {value.description}</p>
                  <p>Display Symbol: {value.displaySymbol}</p>
                  <p>Symbol: {value.symbol}</p>
                  <p>Type: {value.type}</p>
                </div>
              ))):(
                <p>No Data Found</p>
              )
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
