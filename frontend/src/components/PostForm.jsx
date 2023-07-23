import {
  Avatar,
  Box,
  Flex,
  Input,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"

export const PostForm = () => {
  return (
    <Flex
      background='white'
      flexDirection='column'
      border='1px solid white'
      marginTop='17px'
      padding='10px'
      borderRadius='15px'
      width={{ base: "100%", md: "90%" }}
      mx='auto'
      boxShadow='sm'>
      <Text color='gray.500'>Post Something</Text>
      <Box>
        <Flex alignItems='center' gap='8px'>
          <Wrap opacity='1'>
            <WrapItem>
              <Avatar
                padding='5px'
                name='Dan Abrahmov'
                src='https://bit.ly/dan-abramov'
                size='lg'
              />
            </WrapItem>
          </Wrap>
          <Input
            focusBorderColor='brand.500'
            type='text'
            width='70%'
            placeholder="What's on your mind ?"
          />
          <Text
            paddingBlock='3px'
            paddingInline='16px'
            backgroundColor='brand.500'
            boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
            color='white'
            cursor='pointer'
            borderRadius='20px'>
            Post
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}
export default PostForm
