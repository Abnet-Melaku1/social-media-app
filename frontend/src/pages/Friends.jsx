import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"

import { SideBar as Layout } from "../components/SideBar"

import { useDispatch, useSelector } from "react-redux"

import Followers from "../components/Followers"

import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { getUserPosts, reset } from "../features/user/userSlice"
const Page = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const { userData, isError, message } = useSelector((state) => state.user)

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
            <Tabs variant='unstyled'>
              <TabList
                display='flex'
                alignItems='center'
                gap='45px'
                bg='rgb(20,20,20)'
                rounded='2xl'
                px='45px'
                py='10px'>
                <Tab
                  borderRadius='10px'
                  _selected={{
                    color: "rgb(25,27,30)",
                    borderRadius: "10px",
                    bg: "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
                  }}>
                  Followers
                </Tab>
                <Tab
                  borderRadius='10px'
                  _selected={{
                    color: "rgb(25,27,30)",
                    borderRadius: "10px",
                    bg: "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
                  }}>
                  Followings
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {userData?.user.followers.length == 0 ? (
                    <Heading
                      fontSize={"md"}
                      fontWeight={400}
                      color='gray.300'
                      fontFamily={"body"}>
                      You haven't followed by anyone.
                    </Heading>
                  ) : (
                    userData?.user.followers.map((data) => (
                      <Followers data={data} key={data._id} />
                    ))
                  )}
                </TabPanel>
                <TabPanel>
                  {userData?.user.followings.length == 0 ? (
                    <Heading
                      fontSize={"md"}
                      fontWeight={500}
                      color='gray.300'
                      fontFamily={"body"}>
                      You aren't following anyone.
                    </Heading>
                  ) : (
                    userData?.user.followings.map((data) => (
                      <Followers data={data} key={data._id} />
                    ))
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
          <Stack spacing={0} align={"center"}></Stack>
        </Box>
        <Box maxW='full' mx='15px'></Box>
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

const Friends = withLayout(Page)
export default Friends
