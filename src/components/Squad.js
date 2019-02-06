import React, { Component } from "react";
import styled from "styled-components";
import * as COLORS from "../constants/colors";
import {H1} from "./H1";
import {Row} from "./Row";


const PokeTile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    background-color: ${props => props.color}
    padding: 1em;
    margin: 1em;
`;

const EmptyTile = styled(PokeTile)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    background-color: ${COLORS.GENERAL.GREY}
    padding: 1em;
    margin: 1em;
`;

const PokeMove = styled.div`
    padding: 1em;
    background-color: ${COLORS.GENERAL.GREY};
    border-radius: 15px;
    display: flex;
    width: 85%;
    margin: 0em;
`;

export const Squad = (props) => {
    const {squad} = props;

    const moves = ['test'];

    if(!squad){
        return null;
    }

    return <Row>

        {squad.map(({id, image, name, types}) => {
            const pokeType = types[0].name;

            return <PokeTile key={id} color={COLORS.POKE_TYPE[pokeType.toUpperCase()]}>
                <img src={image} height={96} width={96} />
                <H1 color={COLORS.GENERAL.WHITE}>{name}</H1>

                { moves.map(move => <PokeMove id={move}>{move}</PokeMove>)}
            </PokeTile>
        })}

    </Row>
};