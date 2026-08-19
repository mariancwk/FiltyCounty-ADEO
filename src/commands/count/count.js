export const count = (data) => {
  const dataWithCounts = data.map((c) => {
    const peopleCount = c.people.length;

    return {
      name: `${c.name} [${peopleCount}]`,
      people: c.people.map((p) => {
        const animalCount = p.animals.length;

        return {
          name: `${p.name} [${animalCount}]`,
          animals: p.animals,
        };
      }),
    };
  });

  return dataWithCounts;
};
