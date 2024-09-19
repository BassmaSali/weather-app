import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../api';
import './search.css';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(
                `${GEO_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`,
                geoApiOptions
            );
            const responseData = await response.json();
            return {
                options: responseData.data.map((city) => ({
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                }))
            };
        } catch (err) {
            console.error(err);
            return {
                options: []
            };
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            className="custom-search"
            styles={{
                control: (provided) => ({
                    ...provided,
                    backgroundColor: '#18202d',
                    borderColor: '#fff',
                }),
                placeholder: (provided) => ({
                    ...provided,
                    color: '#fff',
                }),
                singleValue: (provided) => ({
                    ...provided,
                    color: '#fff',
                }),
                input: (provided) => ({
                    ...provided,
                    color: '#fff',
                }),
            }}
        />
    );
};

export default Search;
