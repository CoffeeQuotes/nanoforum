import {styled} from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import Forums from "./Pages/Forums";
import Post from "./Pages/Post";
import Profile from "./Pages/Profile";
import ScrollToTop from "./ScrollToTop";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import {AuthContextProvider} from "./Context/AuthContext";

const Wrapper = styled.div`
  margin : 0; 
  padding: 0;
`;
const Container  = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
`;
function App() {
  return (
      <AuthContextProvider>
      <BrowserRouter basename="/">
          <ScrollToTop/>
          <Wrapper>
          <Container>
            <Navbar />
                  <Routes>
                    <Route path="/" index  element={<Homepage />} />
                    <Route path="login" element={<Login/>} />
                    <Route path="register" element={<Register/>}/>
                    <Route path="forums/:id" element={<Forums/>} />
                    <Route path="posts/:id" element={<Post />} />
                    <Route path="users/:id" element={<Profile />} />
                  </Routes>

          </Container>
        </Wrapper>
      </BrowserRouter>
      </AuthContextProvider>
  );
}

export default App;
