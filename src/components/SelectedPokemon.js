import React, { Component } from "react";
import styled from "styled-components";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {H1} from "./H1";
import * as COLORS from "../constants/colors";
import {Row} from "./Row";
import Grid from 'styled-components-grid';

const Container = styled(Row)`
  display: block;
  margin: 2em;
  text-align: center;
`;

const BlueButton = styled.button`
    background-color: ${COLORS.GENERAL.BLUE};
    border: 0px;
    color: ${COLORS.GENERAL.WHITE}
    font-size: 1em;
    cursor:pointer;
    cursor:hand;
`;

const StatLabel = styled.span`
    color: ${COLORS.GENERAL.YELLOW};
    text-transform: uppercase;
`;

const StatValue = styled.span`
    color: ${COLORS.GENERAL.BLUE}
    font-size: 2em;
`;

const MoveItem = styled.div`
    padding: 1em;
    border: 1px solid;
    border-color: ${COLORS.GENERAL.BLUE}
    color: ${COLORS.GENERAL.BLUE}
    cursor:pointer;
    cursor:hand;
`;

const AbilityLabel = styled.div`
    cursor:pointer;
    cursor:hand;
    color: ${COLORS.GENERAL.BLUE}
`;

const StatItem = ({label, value}) => <div style={{textAlign: 'right'}}><StatLabel>{label}</StatLabel> <StatValue>{value}</StatValue></div>;

class SelectedPokemon extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedMoves: []
        }
    }

    onMoveClicked = move => {
      if(this.state.selectedMoves.length < 4){

          // Is the move already added?
          const isDuplicate = this.state.selectedMoves.find(selectedMove => selectedMove === move);

          if(!isDuplicate){
              // Add to selection
              this.setState({
                  selectedMoves: this.state.selectedMoves.concat([move])
              });
          }else{
              // Remove from selection
              this.setState({
                  selectedMoves: this.state.selectedMoves.filter(selectedMove => selectedMove != move)
              });
          }

      }else{
          window.alert('Maximum 4 moves allowed.')
      }
    };

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
                    {({loading, error, data}) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        const {id, image, name, stats, abilities} = data.Pokemon;

                        return (

                            <Row>
                                <Container onChange={evt => console.log(evt)}>
                                    <img src={image} width={96} height={96}/>
                                    <H1>{name}</H1>
                                    <BlueButton onClick={() => this.props.onSavePokemonClicked(Object.assign(data.Pokemon, { selectedMoves: this.state.selectedMoves }))}>SAVE
                                        POKEMON </BlueButton>
                                </Container>


                                <Container>

                                    <H1>Stats</H1>

                                    <Grid>
                                        <Grid.Unit size={1 / 2}><StatItem label="Speed" value={stats.find(stat => stat.name === 'speed').value} /></Grid.Unit>
                                        <Grid.Unit size={1 / 2}><StatItem label="Special Defense" value={stats.find(stat => stat.name === 'special-defense').value} /></Grid.Unit>

                                        <Grid.Unit size={1 / 2}><StatItem label="Special Attack" value={stats.find(stat => stat.name === 'special-attack').value} /></Grid.Unit>
                                        <Grid.Unit size={1 / 2}><StatItem label="Defense" value={stats.find(stat => stat.name === 'defense').value} /></Grid.Unit>

                                        <Grid.Unit size={1 / 2}><StatItem label="Attack" value={stats.find(stat => stat.name === 'attack').value} /></Grid.Unit>
                                        <Grid.Unit size={1 / 2}><StatItem label="HP" value={stats.find(stat => stat.name === 'hp').value} /></Grid.Unit>
                                    </Grid>

                                    <div>
                                        <H1>Selected Moves</H1>

                                        { this.state.selectedMoves.map(move => <MoveItem key={move} onClick={() => this.onMoveClicked(move)}>{move}</MoveItem>)}

                                    </div>

                                </Container>


                                <Container>

                                    <H1>Tutor machine</H1>

                                    { abilities.map(({name}, i) => <AbilityLabel key={i + name} onClick={() => this.onMoveClicked(name)}>{name.charAt(0).toUpperCase() + name.slice(1)}</AbilityLabel>) }

                                </Container>
                            </Row>



                        );
                    }}
                </Query>

            </Container>
        );
    }
}

export default SelectedPokemon;
