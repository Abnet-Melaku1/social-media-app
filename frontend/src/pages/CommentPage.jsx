import Comment from "../components/Comment"
import { Box, Text, Flex } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import Post from "../components/Post"
import { SideBar as Layout } from "../components/SideBar"

const Page = () => {
  return (
    <>
      <Box bg='white'>
        <Flex alignItems='center' ml='35px' gap='10px' py='10px'>
          <ArrowBackIcon boxSize={6} cursor={"pointer"} />
          <Text fontSize={"xl"} fontWeight={500} fontFamily={"body"}>
            Post
          </Text>
        </Flex>
        <Box>
          <Post />
        </Box>

        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </Box>
    </>
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

const CommentPage = withLayout(Page)
export default CommentPage
