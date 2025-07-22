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

export type EffectEntries = {
  effect: string;
  language: NameURL;
  short_effect: string;
};

export type FlavorTextEntries = {
  flavor_text: string;
  language: NameURL;
  version_group: NameURL;
};
