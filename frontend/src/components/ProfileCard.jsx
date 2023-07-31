import {
  Heading,
  Avatar,
  Box,
  Center,
  useColorModeValue,
} from "@chakra-ui/react"
import { useSelector } from "react-redux"

export default function ProfileCard() {
  const { user } = useSelector((state) => state.auth)
  const { userDatas } = useSelector((state) => state.user)
  return (
    <Center py={0}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        rounded={"lg"}
        p={2}
        textAlign={"center"}>
        <Avatar
          size={"xl"}
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
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {user?.firstName} {user?.lastName}
        </Heading>
      </Box>
    </Center>
  )
}
