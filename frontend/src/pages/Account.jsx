import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Flex,
  Badge,
  HStack,
  FormControl,
  Input,
  FormLabel,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"

import { SideBar as Layout } from "../components/SideBar"
export const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex
      py={6}
      direction={{ sm: "column" }}
      alignItems='center'
      gap='15px'
      width='full'
      bg='white'>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        minHeight={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Are you sure ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody color='gray.700'>
            By clicking the delete button, you are confirming that you want to
            permanently delete your account. This process cannot be undone.
          </ModalBody>

          <ModalFooter>
            <Button variant='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              rounded={"md"}
              bg={"red.500"}
              color={"white"}
              boxShadow={"md"}
              _hover={{
                bg: "red.500",
              }}
              _focus={{
                bg: "red.500",
              }}>
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        maxW={{ base: "full" }}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"sm"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}>
        <Box border={"1px solid"} borderColor='gray.100' rounded='md'>
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            alt={"Avatar Alt"}
            mb={4}
            pos={"relative"}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            Lindsey James
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            Ethiopia
          </Text>
        </Box>
        <Stack
          mt={8}
          direction={"row"}
          spacing={4}
          alignItems='center'
          justifyContent='center'>
          <Button
            flex={{ base: 0.5 }}
            fontSize={"sm"}
            rounded={"md"}
            bg={"brand.400"}
            color={"white"}
            boxShadow={"md"}
            _hover={{
              bg: "brand.500",
            }}
            _focus={{
              bg: "brand.500",
            }}>
            Upload Profile
          </Button>
        </Stack>

        <Stack
          mt={8}
          direction={"row"}
          spacing={4}
          alignItems='center'
          justifyContent='center'>
          <Button
            onClick={onOpen}
            flex={{ base: 0.5 }}
            fontSize={"sm"}
            rounded={"md"}
            bg={"red.300"}
            color={"white"}
            boxShadow={"md"}
            _hover={{
              bg: "red.500",
            }}
            _focus={{
              bg: "red.500",
            }}>
            Delete Account
          </Button>
        </Stack>
      </Box>

      <Box boxShadow='sm' p='25px' rounded='md' w='full' bg='white' mt='15px'>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent={"center"}>
          <Box>
            <FormControl id='firstName' isRequired>
              <FormLabel>First Name</FormLabel>
              <Input type='text' focusBorderColor='brand.500' />
            </FormControl>
          </Box>
          <Box>
            <FormControl id='lastName'>
              <FormLabel>Last Name</FormLabel>
              <Input type='text' width={"full"} focusBorderColor='brand.500' />
            </FormControl>
          </Box>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent={"center"}>
          <Box>
            <FormControl id='email' isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input type='text' focusBorderColor='brand.500' />
            </FormControl>
          </Box>
          <Box>
            <FormControl id='country'>
              <FormLabel>Country</FormLabel>
              <Input type='text' focusBorderColor='brand.500' />
            </FormControl>
          </Box>
        </Stack>
        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"md"}
            bg={"brand.400"}
            color={"white"}
            boxShadow={"md"}
            _hover={{
              bg: "brand.500",
            }}
            _focus={{
              bg: "blue.500",
            }}>
            Update Account
          </Button>
        </Stack>
      </Box>
    </Flex>
  )
}

const withLayout = (WrappedComponent) => {
  return function WithLayout(props) {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    )
  }
}

const Account = withLayout(Page)
export default Account
