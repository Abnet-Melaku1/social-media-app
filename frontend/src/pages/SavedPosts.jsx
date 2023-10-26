import { Box } from "@chakra-ui/react"
import Post from "../components/Post"
import { SideBar as Layout } from "../components/SideBar"
import { useSelector } from "react-redux"

const Page = () => {
  const { timeLine } = useSelector((state) => state.user)
  console.log(SavedPosts)

  const savedPosts = timeLine.filter((post) => post.isSaved == true)

  return (
    <Box>
      {savedPosts?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </Box>
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

const SavedPosts = withLayout(Page)
export default SavedPosts
