/* eslint-disable react/prop-types */
import { Button, Avatar, Flex, Text } from "@chakra-ui/react"
import { followOrUnfollow } from "../features/user/userSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
export const FindFriend = ({ suggested }) => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  console.log("usr", user)
  const {
    userDatas,
    followIsLoading,
    message,
    followIsSuccess,
    followIsError,
  } = useSelector((state) => state.user)
  console.log("user Data", userDatas)
  const [isFollowed, setIsFollowed] = useState(false)
  const [followed, setFollowed] = useState(
    userDatas?.followings?.includes(suggested?._id)
  )
  console.log("followed", userDatas?.followings?.includes(suggested?._id))
  const handleFollow = (userId) => {
    dispatch(followOrUnfollow(userId))
    setIsFollowed(true)
  }

  useEffect(() => {
    if (followIsError) {
      toast.error(message)
    }
    if (followIsSuccess && isFollowed) {
      toast.success(message)
      setIsFollowed(false)
    }
  }, [dispatch, followIsError, followIsSuccess, isFollowed, message])
  return (
    <>
      {user?._id !== suggested?._id && (
        <Flex
          alignItems='center'
          gap='10px'
          p='15px'
          boxShadow='sm'
          mb='10px'
          justifyContent={"space-between"}
          border={"2px solid"}
          color='gray.300'
          // bg={useColorModeValue("gray.700", "gray.800")}
          bg='rgb(20,20,20)'
          borderColor='rgb(20,20,20)'
          rounded='md'>
          <Avatar src={suggested?.profilePicture?.url} size='md' />

          <Text>
            {suggested?.firstName} {suggested?.lastName}
          </Text>

          <Button
            onClick={() => handleFollow(suggested._id)}
            bg='linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a) '
            _hover={{
              backgroundColor:
                "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
            }}
            color='gray.200'
            size={"sm"}>
            {userDatas?.followings?.includes(suggested?._id)
              ? "Unfollow"
              : "Follow"}
          </Button>
        </Flex>
      )}
    </>
  )
}
