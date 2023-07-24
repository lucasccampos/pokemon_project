import { PokemonDetails } from "./PokemonDetails";
import { PokemonList } from "./PokemonList";

export function App() {
  return (
    <>
      <div className="center">
        <PokemonDetails />
        <PokemonList />
      </div>
    </>
  );
}
