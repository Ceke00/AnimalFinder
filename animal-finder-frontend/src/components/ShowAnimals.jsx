import React, { useState, useEffect } from "react";
import AnimalService from "../services/animal.service";

const ShowAnimals = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await AnimalService.getAnimals();
        const data = response.data.$values; 
        setAnimals(data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div>
      <h1>Animals</h1>
      {animals.length === 0 ? (
        <p>No animals found.</p>
      ) : (
        <ul>
          {animals.map((animal) => (
            <li key={animal.animalId}>
              <p>{animal.name}</p>
              <p>{animal.description}</p>
              <p>{animal.type}</p>
              <p>{animal.neighborhood}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowAnimals;
