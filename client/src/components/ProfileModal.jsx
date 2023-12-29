import React from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Text,IconButton,Modal,ModalBody,ModalOverlay,Button,ModalCloseButton,ModalFooter,ModalContent,ModalHeader,Image } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

const ProfileModal = ({user,children}) => {
    const {isOpen,onOpen,onClose}=useDisclosure();
  return (
    <>
        {children?(<span onClick={onOpen}>{children}</span>):
        (
            <IconButton 
            display={{base:"flex"}}
            icon={<ViewIcon/>}
            onClick={onOpen}
            />
        )}

<Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}  >
        <ModalOverlay />
        <ModalContent bg="#3a3a43">
          <ModalHeader
          fontSize="40px"
          fontFamily="Work Sans"
          display="flex"
          justifyContent="center" textColor='white'>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between">
            <Image
            borderRadius="full"
            boxSize="250px"
            src={user.pic}
            alt={user.name}/>

            <Text fontSize={{base:"28px",md:"30px"}}
            fontFamily="Work Sans"
            textOverflow textColor='white'>Email:{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
