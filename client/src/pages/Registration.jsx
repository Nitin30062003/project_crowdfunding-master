import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";
import { Login, Signup } from "../components";
  
  function Homepage() {
    const navigate = useNavigate();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
  
      if (user) navigate("/");
    }, [navigate]);
  
    return (
      <div>
  
      <Container maxW="xl" centerContent bg="#1c1c24"borderRadius="lg"  >
        <Box m="0 0 15px 0"  w="100%" p={4}  >
          <Tabs isFitted variant="soft-rounded" colorScheme='green'>
            <TabList mb="1em" >
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel >
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
          </div>
    );
  }
  
  export default Homepage;