import { Box, Heading, Spinner } from "@chakra-ui/react"
import { FindFriend } from "../components/FindFriend"
import { getSuggestedUser, reset } from "../features/user/userSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
const Suggestion = () => {
  const dispatch = useDispatch()
  const { suggestedUser, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.user
  )
  const { user } = useSelector((state) => state.auth)
  console.log(suggestedUser)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (user) {
      dispatch(getSuggestedUser())
    }
    dispatch(reset())
  }, [dispatch, isError, message, user])
  return (
    <Box
      // bg={useColorModeValue("gray.800", "gray.700")}
      bg='rgb(25,27,30)'
      p={4}
      w='full'
      zIndex={-1}
      overflowY='scroll'>
      <Heading as='h5' size='md' color='gray.300' mb='2' textAlign='center'>
        Find Friends
      </Heading>

      {isLoading ? (
        <Spinner size='md' speed='0.65s' />
      ) : (
        suggestedUser?.map((suggested) => (
          <FindFriend suggested={suggested} key={suggested._id} />
        ))
      )}
    </Box>
  )
}
export default Suggestion
