import styled from 'styled-components';
import React from 'react';

const ExampleStyledComponent = styled.div`
    color: ${ props  => props.color};
    `;

export const ExampleComponent = () => (
    <ExampleStyledComponent color="red">
        <p>This is an example of using styled components in a react component.</p>
    </ExampleStyledComponent>

    
);


export const Grid = styled.div`
    

`;
export const NewCol = styled.div`
    flex: ${(props) => props.size};
    border:2px solid black;
    margin-left:20px;
    
`;
export const InnerCol = styled.div`
    flex: ${(props) => props.size};
    border:2px solid gray;
    text-align:center;
    margin-left:10px;
    margin-top:10px;
    
`;
export const Row = styled.div`
    display:flex;
    
`;

export const Col = styled.div`
    flex: ${(props) => props.size};
    text-align:center;
    
    `;