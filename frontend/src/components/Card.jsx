import { Box, Text, Flex, Avatar, Image } from "@chakra-ui/react"

const Card = () => {
  return (
    <>
      <Flex gap={3} mb={4} py={5} bg='white'>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size='md'
            name={"Name"}
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNofDeymYIece5QEl4VAXCCtruE1skQo3TGRZuRoWJ&s"
            }
          />
          <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size='xs'
              name='John doe'
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNofDeymYIece5QEl4VAXCCtruE1skQo3TGRZuRoWJ&s"
              }
              position={"absolute"}
              top={"0px"}
              left='15px'
              padding={"2px"}
            />

            <Avatar
              size='xs'
              name='John doe'
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNofDeymYIece5QEl4VAXCCtruE1skQo3TGRZuRoWJ&s"
              }
              position={"absolute"}
              bottom={"0px"}
              right='-5px'
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                John doe
              </Text>
              <Image
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNofDeymYIece5QEl4VAXCCtruE1skQo3TGRZuRoWJ&s'
                w={4}
                h={4}
                ml={1}
              />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                width={36}
                textAlign={"right"}
                color={"gray.light"}>
                2 dat ago
              </Text>
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>Text</Text>

          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}>
            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNofDeymYIece5QEl4VAXCCtruE1skQo3TGRZuRoWJ&s"
              }
              w={"full"}
            />
          </Box>

          <Flex gap={3} my={1}></Flex>
        </Flex>
      </Flex>
    </>
  )
}
export default Card
