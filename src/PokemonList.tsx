import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

interface Card {
  id: number;
  name: string;
}

interface PokemonData {
  name: string;
  url: string;
}

export function PokemonList() {
  const [selectedIndex, setIndexSelected] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [scrollPos, setScrollPos] = useState(180);

  const cardWidth = 120;
  const [offset, setOffset] = useState(0);

  const fetchPokemons = async (limit: number = 20) => {
    try {
      console.log("offeset" + offset);
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
      setOffset((offset) => offset + result.data.results.length);
      setCards((cards) => {
        return [
          ...cards,
          ...result.data.results.map((pokemon: PokemonData) => {
            return {
              name: pokemon.name,
              id: parseInt(pokemon.url.split("/")[6]),
            };
          }),
        ];
      });
    } catch (error) {
      console.error(error);
    }
  };

  const nextCard = () => {
    setCards((cards) => {
      setIndexSelected((selectedIndex) => {
        selectedIndex = (selectedIndex + 1) % cards.length;

        if (selectedIndex === 0) {
          setScrollPos((scrollPos) => scrollPos + (cards.length - 1) * cardWidth);
        } else {
          setScrollPos((scrollPos) => scrollPos - cardWidth);
        }

        return selectedIndex;
      });
      return cards;
    });
  };

  const prevCard = () => {
    setCards((cards) => {
      setIndexSelected((selectedIndex) => {
        selectedIndex = (selectedIndex - 1 + cards.length) % cards.length;

        if (selectedIndex === cards.length - 1) {
          setScrollPos((scrollPos) => scrollPos - (cards.length + 1) * cardWidth);
        } else {
          setScrollPos((scrollPos) => scrollPos + cardWidth);
        }
        return selectedIndex;
      });
      return cards;
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      nextCard();
    } else if (e.deltaY < 0) {
      prevCard();
    }
  };

  useEffect(() => {
    if (cards.length - selectedIndex == 4) {
      fetchPokemons();
    }
  }, [selectedIndex]);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        prevCard();
      } else if (event.key === "ArrowRight") {
        nextCard();
      }
    });

    fetchPokemons(offset);
  }, []);

  return (
    <>
      <h1>Listinha</h1>
      <div className="container">
        <div className="scrollable" style={{ transform: `translateX(${scrollPos}px)` }} onWheel={handleWheel}>
          <div className="cards">
            {cards.map((card, i) => {
              return (
                <div key={card.id} className={i == selectedIndex ? "card selected" : "card"}>
                  {card.name + "\n" + card.id}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
