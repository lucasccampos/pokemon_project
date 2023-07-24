import { useEffect, useState } from "react";
import axios from "axios";

export function PokemonList() {
  //   const [pokemonList, setPokemonList] = useState([]);
  const [selectedIndex, setIndexSelected] = useState(5);

  useEffect(() => {}, []);

  return (
    <>
      <h1>Listinha</h1>
      <div className="wheel">
        {[...Array(10)].map((_, i) => {
          return selectedIndex == i ? (
            <>
              <div className="line selected">
                <p>{i} - Around the world</p>
              </div>
            </>
          ) : (
            <>
              <div className="line">
                <p>{i} - Around the world</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
