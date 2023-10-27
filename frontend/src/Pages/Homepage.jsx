import React, { useState, useEffect } from 'react'
import PopularForums from '../Components/Homepage/PopularForums'
import axios from 'axios';
import  styled from 'styled-components';
import LatestPosts from "../Components/Homepage/LatestPosts";
import {FaPenNib} from "react-icons/fa6";
import {FaFire} from "react-icons/fa6";
import Hero from './../images/hero.jpg';
const HomeWrapper = styled.div`
    display: flex;
    gap: var(--standard-padding);
    margin: var(--standard-margin);
`;
const HomeBlockContainer = styled.div`
    margin: var(--standard-margin);
    padding: var(--standard-padding);
    border-radius: var(--standard-margin);
`;
const ImageWrapper = styled.div`
    max-width: 100vw;
    max-height: 50vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;
const HeroText = styled.div`
    position: absolute;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* optional: add text shadow for better visibility */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: var(--main);
    padding: var(--standard-padding);
`;
const Homepage = () => {
  const [forums, setForums] = useState([]);
  const [posts, setPosts] = useState([]);
  const signedUserData = JSON.parse(localStorage.getItem("user"));
  console.log(signedUserData);
  useEffect(() => {
      getForums();
      getLatestPosts();
  }, []);
  const getForums = async () => {
      await axios.get('http://localhost:5000/api/v1/forums')
          .then(response =>  {
                setForums(response.data.data);
                console.log(response.data);
          }).catch(error => {
              console.log(error);
      });
  }

  const getLatestPosts = async () => {
      await axios.get('http://localhost:5000/api/v1/posts')
          .then(response => {
               setPosts(response.data.data);
               console.log(response.data);
          }).catch(error => {
              console.log(error);
      });
  }
  return (
      <>
        <ImageWrapper>
            <img className="hero" src={Hero} alt="Hero images for nanoforum"/>
            <HeroText>

            </HeroText>
        </ImageWrapper>
        <HomeWrapper>
            <HomeBlockContainer>
                <h2><FaFire className='accent' />&nbsp;Popular Forums</h2>
                <div>
                    {forums.map(forum => <PopularForums key={forum._id}  forum={forum} />)}
                </div>
            </HomeBlockContainer>
            <HomeBlockContainer>
                <h2><FaPenNib className='accent' />&nbsp;Latest Posts</h2>
                <div>
                    {posts.map(post => <LatestPosts key={post._id} post={post}/>)}
                </div>
            </HomeBlockContainer>
        </HomeWrapper>
      </>
  )
}

export default Homepage