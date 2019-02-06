import React, { Component } from "react";
import styled from "styled-components";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {H1} from "./H1";
import * as COLORS from "../constants/colors";

const Container = styled.div`
  display: block;
  margin: 0 auto;
  max-width: 200px;
`;

const BlueButton = styled.button`
    background-color: ${COLORS.GENERAL.BLUE};
    border: 0px;
    color: ${COLORS.GENERAL.WHITE}
    font-size: 1em;
    cursor:pointer;
    cursor:hand;
`;

class SelectedPokemon extends Component {

    render() {
        const pokemon = this.props.pokemon;

        // TODO: Mutation?
        const q = gql`
          {
            Pokemon(name: "${pokemon.name}") {
                id,
                image,
                name
                abilities { name },
                  types (first: 1){ 
                 name
                },
                    stats { 
                  name,
                    value
                },
            }
          }
        `;

        return (
          <Container>
              <Query query={q}>
                  {({ loading, error, data }) => {
                      if (loading) return "Loading...";
                      if (error) return `Error! ${error.message}`;

                      const { id, image, name} = data.Pokemon;

                      console.log('DETAILS = ' , data.Pokemon);

                      return (
                          <div onChange={evt => console.log(evt)}>
                              <img src={image} width={96} height={96} />
                              <H1>{name}</H1>
                              <BlueButton onClick={() => this.props.onSavePokemonClicked(data.Pokemon)}>SAVE POKEMON </BlueButton>
                          </div>
                      );
                  }}
              </Query>


          </Container>
        );
    }
}

export default SelectedPokemon;
