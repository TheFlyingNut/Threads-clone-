
import { Center, Container, Flex } from "@chakra-ui/react";
import { Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import Header from './components/Header';


function App() {
  return (
    <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
    <Center>
    <Container maxW='620px' centerContent>
      <Header/>
      <Routes>
        <Route path='/:username' element={<UserPage />}/>
        <Route path='/:username/post/:pid' element={<PostPage />}/>
      </Routes>
    </Container>
    </Center>
  </Flex>
  );
}

export default App;

