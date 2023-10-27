import React from 'react'
import styled from 'styled-components';
import {Link} from "react-router-dom";

const ForumContainer = styled.div`
    padding: 3px 0;
    margin: 3px 0;
`;
const PopularForums = ({forum}) => {
    
  return (
      <ForumContainer>
          <Link to={`forums/${forum._id}`}>
            <h4>{forum.name}</h4>
            <p>{forum.description}</p>
          </Link>
      </ForumContainer>
  )
}

export default PopularForums