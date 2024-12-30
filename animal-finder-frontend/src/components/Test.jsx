import React, { useState, useEffect } from "react";
import TestService from "../services/test.service";

const Test = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await TestService.getTests();
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  return (
    <div>
      <h1>Tests</h1>
      {tests.length === 0 ? (
        <p>No tests found.</p>
      ) : (
        <ul>
          {tests.map((test) => (
            <li key={test.id}>
              <p>{test.name} </p>
              <p> {test.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Test;
