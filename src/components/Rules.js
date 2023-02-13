import styled from 'styled-components';
// import { Link } from 'react-router-dom';

function Rules(){
    return (
        <Container>
            <Title>Move the knight to the <Highlighted>highlighted square</Highlighted></Title>
            <span>The goal is to move the knight in order left to right, bottom to up, with the restriction 
                that you can't move it to squares attacked or controlled by the black pieces.</span>
        </Container>
    )
}

export default Rules;



const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2%;
    max-width: 300px;
    margin-bottom: 50px;
`;

const Title = styled.h3`
    text-align: center;
`;

const Highlighted = styled.span`
    color: #4183c4;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    width: fit-content;
`;