import Post from "../components/Post"
import { Box, Spinner } from "@chakra-ui/react"
import PostForm from "../components/PostForm"
import { SideBar as Layout } from "../components/SideBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { reset, getTimeline } from "../features/user/userSlice"
import React from "react"
const Page = () => {
  const dispatch = useDispatch()
  const { timeLine, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.user
  )
  const { user } = useSelector((state) => state.auth)
  console.log(timeLine)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (user) {
      console.log("Dispatched")
      dispatch(getTimeline())
    }
    dispatch(reset())
  }, [dispatch, isError, message, user])
  console.log(timeLine)
  return (
    <>
      <Box position={"sticky"} top='100' zIndex={5}>
        <PostForm />
      </Box>
      {timeLine?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
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

const Feed = withLayout(Page)
export default Feed
