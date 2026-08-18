export class DataFixture {
    constructor() {
        this._data = [];
    }

    withCountry(name) {
        const country = {
            name,
            people: []
        };

        this._data.push(country);

        return new CountryFixture(this, country);
    }

    build() {
        return this._data;
    }
}

class CountryFixture {
    constructor(dataFixture, country) {
        this._dataFixture = dataFixture;
        this._country = country;
    }

    withPeople(name) {
        const people = {
            name,
            animals: []
        };

        this._country.people.push(people);

        return new PeopleFixture(this, people);
    }

    withCountry(name) {
        return this._dataFixture.withCountry(name);
    }

    build() {
        return this._dataFixture.build();
    }
}

class PeopleFixture {
    constructor(countryFixture, people) {
        this._countryFixture = countryFixture;
        this._people = people;
    }

    withAnimal(name) {
        this._people.animals.push({
            name
        });

        return this;
    }

    withPeople(name) {
        return this._countryFixture.withPeople(name);
    }

    withCountry(name) {
        return this._countryFixture.withCountry(name);
    }

    build() {
        return this._countryFixture.build();
    }
}