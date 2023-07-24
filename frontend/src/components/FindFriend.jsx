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
      justifyContent={"space-between"}
      border={"0.1px solid"}
      borderColor={"gray.100"}
      rounded='md'>
      <Avatar
        src='https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
        size='md'
      />

      <Text>Hewan</Text>

      <Button colorScheme='brand' size={"sm"}>
        Follow
      </Button>
    </Flex>
  )
}
