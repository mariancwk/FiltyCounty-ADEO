export const filter = (data, pattern) => {
  const filteredData = data
    .map((c) => ({
      ...c,
      people: c.people
        .map((p) => ({
          ...p,
          animals: p.animals.filter((a) => a.name.includes(pattern)),
        }))
        .filter((p) => p.animals.length > 0),
    }))
    .filter((c) => c.people.length > 0);

  return filteredData;
};
