import styled from 'styled-components';
import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
const ProfileContainer = styled.div`
    width: 70%;
    margin: var(--margin-center);
    padding: var(--standard-padding);
`;
const Profile = () => {
  const {id} = useParams();
  const [user, setUser] = useState([]);
  const getUser = async () => {
      try {
         await axios.get(`http://localhost:5000/api/v1/users/${id}`)
              .then(response => {
                  setUser(response.data.data);
                  console.log(response.data.data);
              }).catch(error => {
                  console.log(error);
              });
      } catch (error) {
         console.log(error);
      }
  }

  useEffect(()=> {
      getUser();
  },[]);
  return (
      <ProfileContainer>
          <h1>{user.firstname + " " + user.lastname}</h1>
          <p>{user.bio}</p>
      </ProfileContainer>
  )
}
export  default  Profile;