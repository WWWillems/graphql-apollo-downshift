import React, {Component} from "react";
import styled from "styled-components";
import * as Title from "./H1";
import * as COLORS from './../constants/colors';
import Downshift from "downshift";
import gql from "graphql-tag";
import {Query} from "react-apollo";

const Container = styled.div`
  max-width: 350px;      
`;

const SearchInput = styled.input`
  display: block;
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

const Search = (props) => {
    return <Container>
        <Title.H1 color={COLORS.GENERAL.YELLOW}>Select a Pokemon</Title.H1>

        <Query query={GET_POKEMONS}>
            {({loading, error, data}) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}. Is the GraphQL endpoint still active?`;

                return (<Downshift
                        onChange={selection => props.onPokemonSelected(selection)}
                        itemToString={item => (item ? item.name : '')}>
                        {({
                              getInputProps,
                              getItemProps,
                              getLabelProps,
                              getMenuProps,
                              isOpen,
                              inputValue,
                              highlightedIndex,
                              selectedItem,
                          }) => (
                            <div>
                                <SearchInput placeholder="TYPE TO FILTER" {...getInputProps()} />
                                {isOpen
                                    ? data.Pokemons
                                        .filter(pokemon => !inputValue || pokemon.name.includes(inputValue))
                                        .map((item, index) => (
                                            <ResultItem
                                                {...getItemProps({
                                                    key: item.name,
                                                    index,
                                                    item,
                                                })}
                                            >
                                                {item.name}
                                            </ResultItem>
                                        ))
                                    : null}
                            </div>
                        )}
                    </Downshift>


                );
            }}
        </Query>

    </Container>
}


export default Search;
