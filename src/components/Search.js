import React, { Component } from "react";
import styled from "styled-components";
import * as Title from "./H1";
import * as COLORS from './../constants/colors';
import Downshift from "downshift";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const Container = styled.div`
  width: 350px;
  max-width: 350px;      
`;

const SearchInput = styled.input`
  display: block;
  width: 100%;
  margin: 0 auto;
  padding: 1em;
  border-color: ${COLORS.GENERAL.BLUE}
  border: 5px solid blue;
`;

const ResultItem = styled.button`
  display: block;
  border-radios: 15px;
  padding: 0.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  border-radius: 15px;
  text-transform: uppercase;
  color: ${COLORS.GENERAL.YELLOW};
  background-color: ${COLORS.GENERAL.BLUE};
  cursor:pointer;
  cursor:hand;
`;

const GET_POKEMONS = gql`
  {
    Pokemons(first: 151) {
        name
    }
  }
`;

class Search extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchQuery: '',

        }
    }

    onInputChanged = evt => {
        console.log(evt.target.value)
    };

    render() {
        return <Container>
            <Title.H1 color={COLORS.GENERAL.YELLOW}>Select a Pokemon</Title.H1>

            <SearchInput placeholder="TYPE TO FILTER" onChange={this.onInputChanged} />

            <Query query={GET_POKEMONS}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    console.log('data == ' , data)

                    return (
                        <div onChange={evt => console.log(evt)}>
                            {data.Pokemons.map(pokemon => (
                                <ResultItem key={pokemon.name} value={pokemon.name} alt={`Click to select ${pokemon.name}`} onClick={(evt) => this.props.onPokemonSelected(pokemon)}>
                                    {pokemon.name}
                                </ResultItem>
                            ))}
                        </div>
                    );
                }}
            </Query>

        </Container>
    }
}


export default Search;
