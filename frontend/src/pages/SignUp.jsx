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
  useColorModeValue,
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
      console.log(values)
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
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg='white'>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to connect with the world. ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <HStack
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={"flex-start"}>
                <Box w={{ base: "full", md: "auto" }}>
                  <FormControl
                    id='firstName'
                    isRequired
                    isInvalid={
                      formik.touched.firstName && formik.errors.firstName
                    }>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type='text'
                      focusBorderColor='brand.500'
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
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type='text'
                      focusBorderColor='brand.500'
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
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  focusBorderColor='brand.500'
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                id='password'
                isRequired
                isInvalid={formik.touched.password && formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    focusBorderColor='brand.500'
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
                  bg={"brand.400"}
                  color={"white"}
                  _hover={{
                    bg: "brand.500",
                  }}>
                  {isLoading ? <Spinner size='sm' /> : "Sign up"}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link as={LinkRouter} to='/signin' color={"brand.400"}>
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
