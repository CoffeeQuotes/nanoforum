import React, {useState} from 'react';
import styled from "styled-components";
import {FaPenNib} from "react-icons/fa6";
import {Link} from "react-router-dom";
const PostContainer = styled.div`
 
`;
const LatestPosts = ({post}) => {
    const createExcerpt = (content, maxNumberOfWords, trailingIndicator = '...') => {
        const listOfWords = content.trim().split(' ');
        const truncatedContent = listOfWords.slice(0, maxNumberOfWords).join(' ');
        const excerpt = truncatedContent + trailingIndicator;
        const output = listOfWords.length > maxNumberOfWords ? excerpt : content;

        return output;
    };
    return (
      <PostContainer>
          <Link to={`/posts/${post._id}`}><h4>{post.title}</h4></Link>
          <p>{createExcerpt(post.message, 8)}</p>
      </PostContainer>
    );
}
export default LatestPosts;