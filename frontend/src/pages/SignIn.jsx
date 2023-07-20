import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"

const SignIn = () => {
  return (
    <Flex
      minH='100vh'
      align={"center"}
      justify={"center"}
      backgroundColor='white'>
      <Stack spacing={8} py={12} px={6}>
        <Stack align={"center"}>
          <Heading>Sign in to your account</Heading>
          <Text fontSize={"sm"}>To enjoy full experience.</Text>
        </Stack>
        <Box
          rounded={"lg"}
          width={{ base: "sm", sm: "md", md: "lg" }}
          backgroundColor={"white"}
          boxShadow={"md"}
          p={8}>
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input type='email' focusBorderColor='brand.500' />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input type='password' focusBorderColor='brand.500' />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}>
                <Checkbox colorScheme='brand' isChecked>
                  Remember me
                </Checkbox>
              </Stack>
              <Button
                bg={"brand.500"}
                color={"white"}
                _hover={{
                  bg: "brand.600",
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
export default SignIn
