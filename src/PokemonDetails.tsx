import React, { useEffect, useState } from "react";
import axios from "axios";

export function PokemonDetails() {
  const capitalize = (str: string) => {
    if (typeof str !== "string") {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.substr(1);
  };

  const [inputValue, setInputValue] = useState(10);
  const [isLoading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [errorOcorred, setErrorOcorred] = useState(false);
  const [pokemonData, setPokemonData] = useState({
    name: "",
    types: [],
    img: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Math.max(1, e.target.valueAsNumber));
  };

  const fetchPokemonData = async () => {
    try {
      setErrorOcorred(false);
      setLoading(true);
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);

      setPokemonData((pokemonData) => {
        return {
          name: res.data.name,
          types: res.data.types.map((typeData: any) => capitalize(typeData.type.name)),
          img: res.data.sprites.other.dream_world.front_default,
          //   img: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${inputValue.toString().padStart(3, "0")}.png`,
        };
      });
    } catch (error) {
      setErrorOcorred(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemonData();
  }, [inputValue, buttonClicked]);

  //   useEffect(() => {
  //     fetchPokemonData();
  //   }, []);

  return (
    <>
      <div>
        <input type="number" min={1} value={inputValue} onChange={handleInputChange} />
        <button onClick={() => setButtonClicked(!buttonClicked)}>Atualizar</button>
      </div>
      {errorOcorred ? (
        <div>
          <h1>Ocorred some error, try again.</h1>
        </div>
      ) : isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <h1>{capitalize(pokemonData.name)}</h1>
          <h2>{pokemonData.types.join(", ")}</h2>
          <img src={pokemonData.img} alt={`Imagem do ${pokemonData.name}`} />
        </div>
      )}
    </>
  );
}
