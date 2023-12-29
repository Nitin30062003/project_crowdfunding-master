import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import {  useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useStateContext } from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { ENDPOINT,user,setUser } = useStateContext();
  const [lshow, setLShow] = useState(false);
  const handleClick = () => setLShow(!lshow);
  const toast = useToast();
  const [lemail, setLEmail] = useState('');
  const [lpassword, setLPassword] = useState('');
  const [lloading, setLLoading] = useState(false);
  // eslint-disable-next-line
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();
  const submitHandler = async () => {
    setLLoading(true);
    if (!lemail || !lpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${ENDPOINT}/api/user/login`,
        { lemail, lpassword },
        config
      );

      //console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLLoading(false);
      navigate('/');
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="lemail" isRequired>
        <FormLabel className=" font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">Email Address</FormLabel>
        <Input
        className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        borderColor="#3a3a43"
          value={lemail}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setLEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="lpassword" isRequired>
        <FormLabel className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">Password</FormLabel>
        <InputGroup size="md">
          <Input
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          borderColor="#3a3a43"
            value={lpassword}
            onChange={(e) => setLPassword(e.target.value)}
            type={lshow ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick} bg="#8C8888" >
              {lshow ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        bg="#1dc071"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={lloading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setLEmail("guest@example.com");
          setLPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;