export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
};

export type Stat = {
  base_stat: string;
  effort: 0 | 1;
  stat: {
    name: string;
    url: string;
  };
};

export type SpriteUrl = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

export type Species = {
  name: string;
  url: string;
};
