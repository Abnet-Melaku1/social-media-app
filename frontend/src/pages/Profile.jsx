import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
} from "@chakra-ui/react"
import Post from "../components/Post"
import { SideBar as Layout } from "../components/SideBar"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { getUserPosts, reset } from "../features/user/userSlice"
const Page = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const { userData, isError, message } = useSelector((state) => state.user)
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getUserPosts(userId))

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message, userId])

  return (
    <Center py={6}>
      <Box
        w={"full"}
        // bg='rgb(20,20,20)'
        bg='rgb(25,27,30)'
        color='gray.300'
        boxShadow={"sm"}
        rounded={"md"}
        minH={"100vh"}
        overflow={"hidden"}>
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={{ base: "xl", md: "2xl" }}
            src={userData?.user.profilePicture.url}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {userData?.user.firstName} {userData?.user.lastName}
            </Heading>
            <Text color={"gray.500"}>Frontend Developer</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{userData?.user.followers.length}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{userData?.user.followings.length}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followings
              </Text>
            </Stack>
          </Stack>
          <Stack spacing={0} align={"center"}>
            {user?._id !== userData?.user._id && (
              <Button
                w={"50%"}
                mt={8}
                bg='linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)'
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}>
                Follow
              </Button>
            )}
          </Stack>
        </Box>
        <Box maxW='full' mx='15px'>
          {userData?.posts.map((post) => (
            <Post key={post._id} isBlack={true} post={post} />
          ))}
        </Box>
      </Box>
    </Center>
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

const Profile = withLayout(Page)
export default Profile
