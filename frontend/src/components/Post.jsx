import {
  Center,
  Flex,
  Image,
  Stack,
  useColorModeValue,
  Input,
  Icon,
  FormControl,
  Button,
} from "@chakra-ui/react"

import { FcLike } from "react-icons/fc"
import { GoComment } from "react-icons/go"
import { BsFillBookmarkFill } from "react-icons/bs"
const Post = () => {
  return (
    <Center py={6}>
      <Stack
        borderWidth='1px'
        borderRadius='lg'
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "auto" }}
        direction={{ base: "column" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"sm"}
        px={2}
        py={7}>
        <Flex flex={1}>
          <Image
            rounded={"lg"}
            objectFit='cover'
            mx='auto'
            boxSize={{ base: "100%", sm: "sm", md: "md" }}
            src={
              "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
          />
        </Flex>
        <Flex
          flexDirection='row'
          justifyContent='space-evenly'
          alignItems='center'
          p={1}
          pt={2}>
          <Icon as={FcLike} boxSize={7} cursor={"pointer"} />
          <Icon as={GoComment} boxSize={7} cursor={"pointer"} />
          <Icon
            as={BsFillBookmarkFill}
            boxSize={7}
            cursor={"pointer"}
            bg='white'
          />
        </Flex>
        <Flex
          flexDirection='row'
          alignItems='center'
          gap='10px'
          w='full'
          justifyContent={"center"}
          px='15px'>
          <FormControl width='full'>
            <Input
              variant={"solid"}
              borderWidth={1}
              color={"gray.800"}
              _placeholder={{
                color: "gray.400",
              }}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              id={"text"}
              type={"text"}
              required
              placeholder={"Comment"}
              w='100%'
            />
          </FormControl>
          <FormControl w='auto'>
            <Button colorScheme={"brand"} rounded='full'>
              Send
            </Button>
          </FormControl>
        </Flex>
      </Stack>
    </Center>
  )
}
export default Post
