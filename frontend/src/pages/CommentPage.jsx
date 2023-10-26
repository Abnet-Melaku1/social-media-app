import Comment from "../components/Comment"
import { Box, Text, Flex } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import Post from "../components/Post"
import { SideBar as Layout } from "../components/SideBar"
import { toast } from "react-toastify"
import { getPost, reset } from "../features/post/postSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const Page = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const { singlePostData, isError, isLoading, isSuccess, message } =
    useSelector((state) => state.post)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getPost(postId))
    console.log(singlePostData)
    return () => {
      dispatch(reset())
    }
  }, [postId])
  return (
    <>
      <Box
        bg='rgb(25,27,30)'
        border='2px solid'
        borderColor='rgb(20,20,20)'
        minH='full'
        borderRadius='lg'>
        <Flex alignItems='center' ml='35px' gap='10px' py='10px'>
          <ArrowBackIcon boxSize={6} cursor={"pointer"} color='gray.300' />
          <Text
            fontSize={"xl"}
            fontWeight={500}
            fontFamily={"body"}
            color='gray.300'>
            Post
          </Text>
        </Flex>
        <Box>
          <Post post={singlePostData} isBlack />
        </Box>

        {singlePostData?.comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
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
