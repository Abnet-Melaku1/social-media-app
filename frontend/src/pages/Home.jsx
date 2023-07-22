import { Container, Heading, Stack, Text, Button, Link } from "@chakra-ui/react"
import { Link as LinkRouter } from "react-router-dom"

export default function Home() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={700}
          fontSize={{ base: "2xl", sm: "2xl", md: "5xl" }}
          lineHeight={"110%"}>
          Connecting the world,
          <Text as={"span"} color={"brand.600"}>
            One Post at a Time.
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          📅 Introducing our revolutionary Social Media App! 🚀 Never miss a
          beat in the digital world, and say goodbye to being late for the
          latest trends! ⏰ With our smart reminders, you'll always be in the
          loop and at the forefront of what's happening.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Link as={LinkRouter} to='/login'>
            <Button
              as={"a"}
              href=''
              rounded={"full"}
              px={6}
              colorScheme={"orange"}
              bg={"brand.500"}
              _hover={{ bg: "brand.600" }}>
              Get started
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  )
}
