import { Box, Flex, Avatar, Text } from "@chakra-ui/react"

const Comment = () => {
  return (
    <Box bg='white'>
      <Flex
        pl='10px'
        gap='25px'
        border='0.1px solid'
        alignItems='center'
        borderColor='gray.200'
        py='20px'>
        <Avatar
          size='xs'
          name='Kola Tioluwani'
          src='https://bit.ly/tioluwani-kolawole'
        />
        <Box>
          <Flex gap='14px' alignItems='center'>
            {" "}
            <Text fontSize={"xl"} fontWeight={500} fontFamily={"body"}>
              Hewan
            </Text>
            <Text fontFamily={"body"}>36 mins ago</Text>
          </Flex>

          <Text fontFamily={"body"}>
            Hewan is a stunning and incredible Ethiopian singer and songwriter.
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
export default Comment
