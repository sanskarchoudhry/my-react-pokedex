
export type NameURL = {
  name: string;
  url: string;
};

export type Ability = {
  ability: NameURL;
  is_hidden: boolean;
};

export type SpriteUrl = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

export type Species = NameURL;
