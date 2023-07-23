import { Button, Box, Avatar, Flex, Heading, Text } from "@chakra-ui/react"

export const FindFriend = () => {
  return (
    <Flex
      alignItems='center'
      gap='10px'
      p='15px'
      boxShadow='sm'
      bg='white'
      mb='10px'
      border={"0.1px solid"}
      borderColor={"gray.100"}
      rounded='md'>
      <Avatar src='https://i.pravatar.cc/300' size='md' />

      <Text>Hewan</Text>

      <Button colorScheme='brand'>Follow</Button>
    </Flex>
  )
}
