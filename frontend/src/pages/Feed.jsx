import React from "react"
import Post from "../components/Post"
import { Box } from "@chakra-ui/react"
import PostForm from "../components/PostForm"
const Feed = () => {
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
export default Feed
