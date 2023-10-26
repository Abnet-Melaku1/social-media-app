/* eslint-disable react/prop-types */
import { Box, Flex, Avatar, Text, Center } from "@chakra-ui/react"
import moment from "moment"
const Comment = ({ comment }) => {
  function formatRelativeTime(apiDate) {
    const parsedDate = moment(apiDate)
    const now = moment()

    const secondsDiff = now.diff(parsedDate, "seconds")
    const minutesDiff = now.diff(parsedDate, "minutes")
    const hoursDiff = now.diff(parsedDate, "hours")
    const daysDiff = now.diff(parsedDate, "days")
    const monthsDiff = now.diff(parsedDate, "months")

    if (secondsDiff < 60) {
      return "just now"
    } else if (minutesDiff < 60) {
      return `${minutesDiff} ${minutesDiff === 1 ? "minute" : "minutes"} ago`
    } else if (hoursDiff < 24) {
      return `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hours"} ago`
    } else if (daysDiff < 30) {
      return `${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`
    } else if (monthsDiff < 12) {
      return `${monthsDiff} ${monthsDiff === 1 ? "month" : "months"} ago`
    } else {
      return moment(apiDate).fromNow()
    }
  }

  return (
    <Center bg='rgb(25,27,30)' color='gray.300' mx='auto'>
      <Flex
        w={{ sm: "100%", md: "540px" }}
        rounded='md'
        pl='10px'
        gap='25px'
        mb='5px'
        color='white'
        border='0.1px solid'
        alignItems='center'
        borderColor='rgb(20,20,20)'
        bg='rgb(20,20,20)'
        py='20px'>
        <Avatar
          size='sm'
          name={comment?.user.firstName}
          src={comment.user.profilePicture?.url}
        />
        <Box>
          <Flex gap='14px' alignItems='center'>
            {" "}
            <Text
              fontSize={"xl"}
              fontWeight={500}
              fontFamily={"body"}
              color='gray.300'>
              {comment?.user.firstName} {comment?.user.lastName}
            </Text>
            <Text fontFamily={"body"} color='#f4845f'>
              {formatRelativeTime(comment?.createdAt)}
            </Text>
          </Flex>

          <Text fontFamily={"body"} color='gray.300'>
            {comment?.text}
          </Text>
        </Box>
      </Flex>
    </Center>
  )
}
export default Comment
