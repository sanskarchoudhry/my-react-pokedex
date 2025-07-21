type DefenseRelations<T extends string> = {
  doubleDamageFrom: readonly T[];
  halfDamageFrom: readonly T[];
  noDamageFrom: readonly T[];
};

export function getTypeEffectiveness<
  T extends string,
  D extends Record<T, DefenseRelations<T>>
>(defendingTypes: { type: { name: T } }[], typeDefenses: D): Record<T, number> {
  const result: Partial<Record<T, number>> = {};

  for (const attackingType of Object.keys(typeDefenses) as T[]) {
    let multiplier = 1;

    for (const defType of defendingTypes) {
      const defense = typeDefenses[defType.type.name];

      if (defense.noDamageFrom.includes(attackingType)) {
        multiplier *= 0;
      } else if (defense.doubleDamageFrom.includes(attackingType)) {
        multiplier *= 2;
      } else if (defense.halfDamageFrom.includes(attackingType)) {
        multiplier *= 0.5;
      } else {
        multiplier *= 1;
      }
    }

    result[attackingType] = multiplier;
  }

  return result as Record<T, number>;
}
