// TODO: Make a tree like structure for the level ups and the evolution types
// What structure are we getting as evolution line
// Make a tree structure ->
// Squirtle -> Wartortle -> Blastoise
//       -> Flareon
//       -> Vaporeon
//       -> Jolteon
// Eevee -> Espeon
//       -> Umbreon
//       -> Glaceon
//       -> Leafeon
//       -> Sylveon

class PokemonNode {
  name: string;
  evolutions: PokemonNode[];

  constructor(name: string) {
    this.name = name;
    this.evolutions = [];
  }

  addEvolution(child: PokemonNode): void {
    this.evolutions.push(child);
  }

  // printTree(indent: string = ''): void {
  //   console.log(`${indent}${this.name}`);
  //   for (const child of this.evolutions) {
  //     child.printTree(indent + '  ');
  //   }
  // }
}
