import { Button, Avatar, Flex, Text } from "@chakra-ui/react"
import { followOrUnfollow } from "../features/user/userSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Followers = ({ data }) => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const [isFollowed, setIsFollowed] = useState(
    user?.followings?.includes(data?._id)
  )
  console.log(user?.followings?.includes(data?._id))
  const handleFollow = (userId) => {
    dispatch(followOrUnfollow(userId))
    setIsFollowed(!isFollowed)
  }
  return (
    <>
      {user?._id !== data?._id && (
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
          <Avatar src={data?.profilePicture?.url} size='md' />

          <Text>
            {data?.firstName} {data?.lastName}
          </Text>

          <Button
            onClick={() => handleFollow(data._id)}
            bg='linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)  '
            _hover={{
              backgroundColor:
                "rlinear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)  ",
            }}
            color='gray.200'
            size={"sm"}>
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </Flex>
      )}
    </>
  )
}
export default Followers
