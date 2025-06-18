export type Ability = {
  ability: NameUrl;
  is_hidden: boolean;
};

export type SpriteUrl = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

export type Species = NameUrl;

export type NameUrl = {
  name: string;
  url: string;
};
