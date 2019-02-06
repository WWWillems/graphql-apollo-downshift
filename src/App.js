import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import styled from "styled-components";
import client from "./graphql";
import Search from "./components/Search";
import SelectedPokemon from "./components/SelectedPokemon";
import {Squad} from "./components/Squad";
import {Row} from "./components/Row";

const Logo = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 200px;
`;

const Container = styled.div`
  margin: auto;
`;


class App extends Component {

  constructor(props){
      super(props);

      this.state = {
          selectedPokemon: null,
          squad: [],
      }
  }

  onPokemonSelected = pokemon => {
      this.setState({ selectedPokemon: pokemon })
  };

  onSavePokemonClicked = pokemon => {
      this.setState({
          squad: this.state.squad.concat([pokemon])
      })
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Logo src="https://vignette.wikia.nocookie.net/logopedia/images/2/2b/Pokemon_2D_logo.svg/revision/latest/scale-to-width-down/639?cb=20170115063554" />

          <Row>
              <Search onPokemonSelected={this.onPokemonSelected}/>

              { this.state.selectedPokemon ? <SelectedPokemon pokemon={this.state.selectedPokemon} onSavePokemonClicked={this.onSavePokemonClicked} /> : null}
          </Row>

          <Squad squad={this.state.squad} />

        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
