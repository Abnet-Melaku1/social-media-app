import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react"
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Link as LinkRouter } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { reset, register } from "../features/auth/authSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate("/feed")
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const formik = useFormik({
    initialValues: { firstName: "", email: "", lastName: "", password: "" },
    onSubmit: (values) => {
      dispatch(register(values))
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string(),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
  })
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg='rgb(20,20,20)'
      w='full'>
      <Stack spacing={8} mx='auto' maxW={"xl"} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} color='gray.300'>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.300"}>
            to connect with the world. ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg='rgb(25,27,30)' w='full' boxShadow={"lg"}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} p='10'>
              <HStack
                flexDirection={{ base: "column", md: "row" }}
                // justifyContent={"flex-start"}
                alignItems='center'>
                <Box w={{ base: "full", md: "auto" }}>
                  <FormControl
                    id='firstName'
                    isRequired
                    isInvalid={
                      formik.touched.firstName && formik.errors.firstName
                    }>
                    <FormLabel color='gray.300'>First Name</FormLabel>
                    <Input
                      color='gray.300'
                      bg='rgb(20,20,20)'
                      type='text'
                      focusBorderColor='#d8572a'
                      {...formik.getFieldProps("firstName")}
                    />
                    <FormErrorMessage>
                      {formik.errors.firstName}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box w={{ base: "full", md: "auto" }}>
                  <FormControl
                    id='lastName'
                    isRequired
                    isInvalid={
                      formik.touched.lastName && formik.errors.lastName
                    }>
                    <FormLabel color='gray.300'>Last Name</FormLabel>
                    <Input
                      color='gray.300'
                      bg='rgb(20,20,20)'
                      type='text'
                      focusBorderColor='#d8572a'
                      {...formik.getFieldProps("lastName")}
                    />
                    <FormErrorMessage>
                      {formik.errors.lastName}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl
                id='email'
                isRequired
                isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel color='gray.300'>Email address</FormLabel>
                <Input
                  type='email'
                  bg='rgb(20,20,20)'
                  color='gray.300'
                  focusBorderColor='#d8572a'
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                id='password'
                isRequired
                isInvalid={formik.touched.password && formik.errors.password}>
                <FormLabel color='gray.300'>Password</FormLabel>
                <InputGroup>
                  <Input
                    color='gray.300'
                    bg='rgb(20,20,20)'
                    type={showPassword ? "text" : "password"}
                    focusBorderColor='#d8572a'
                    {...formik.getFieldProps("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type='submit'
                  loadingText='Submitting'
                  size='lg'
                  bg='linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)'
                  color={"white"}
                  _hover={{
                    bg: "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
                  }}>
                  {isLoading ? <Spinner size='sm' /> : "Sign up"}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"} color='gray.300'>
                  Already a user?{" "}
                  <Link
                    as={LinkRouter}
                    to='/signin'
                    color='rgba(252, 204, 1, 0.8)'>
                    Sign in
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
