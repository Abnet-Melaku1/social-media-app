import { Heading, Avatar, Box, Center, Button } from "@chakra-ui/react"
import { useSelector } from "react-redux"

export default function ProfileCard() {
  const { user } = useSelector((state) => state.auth)
  const { userDatas } = useSelector((state) => state.user)
  return (
    <Center py={0}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg='rgba(20,20,20,0.6)'
        padding='5px'
        mt='10px'
        mb='30px'
        mx='10px'
        py='10px'
        // bg={useColorModeValue("gray.800", "gray.700")}

        rounded={"lg"}
        p={2}
        textAlign={"center"}>
        <Avatar
          size={"lg"}
          src={userDatas?.profilePicture?.url && userDatas?.profilePicture?.url}
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
        <Heading fontSize={"2xl"} fontFamily={"body"} color='gray.300'>
          {user?.firstName} {user?.lastName}
        </Heading>

        {/* <Button
          bg='rgb(20,20,20)'
          marginTop={"10px"}
          rounded={"xl"}
          _hover={{ bg: "rgb(20,20,20)" }}
          paddingBlock='30px'>
          <Button size='sm' bg='rgba(252,204,1,0.9) ' rounded={"lg"}>
            Followers{" "}
            <Box as='span' ml='3px' color='gray.100'>
              31
            </Box>
          </Button>
          <Button
            size='sm'
            ml='10px'
            bg='rgb(20,20,20)'
            color='gray.300'
            _hover={{ color: "gray.300", bg: "rgb(20,20,20)" }}>
            Following{" "}
            <Box as='span' ml='3px' color='rgb(252,204,1)'>
              31
            </Box>
          </Button>
        </Button> */}
      </Box>
    </Center>
  )
}
