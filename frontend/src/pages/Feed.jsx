import React from "react"
import Post from "../components/Post"
import { Box } from "@chakra-ui/react"
import PostForm from "../components/PostForm"
import { SideBar as Layout } from "../components/SideBar"

const Page = () => {
  return (
    <>
      <Box position={"sticky"} top='100' zIndex={5}>
        <PostForm />
      </Box>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
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
