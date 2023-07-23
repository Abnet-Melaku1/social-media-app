import { Box } from "@chakra-ui/react"
import { FindFriend } from "../components/FindFriend"

const Suggestion = () => {
  return (
    <Box bg='white' p={4} w='full' zIndex={-1}>
      <FindFriend />
      <FindFriend />
      <FindFriend />
      <FindFriend />
      <FindFriend />
      <FindFriend />
    </Box>
  )
}
export default Suggestion
