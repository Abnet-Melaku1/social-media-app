import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  FormErrorMessage,
} from "@chakra-ui/react"
import * as Yup from "yup"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import { login, reset } from "../features/auth/authSlice"
import { useState } from "react"

export default function SignIn() {
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
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      // console.log(values)
      dispatch(login(values))
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
  })
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"brand.400"}>features</Link>{" "}
            ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                id='email'
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
                isInvalid={formik.touched.password && formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  focusBorderColor='brand.500'
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}>
                  <Checkbox isChecked colorScheme={"brand"}>
                    Remember me
                  </Checkbox>
                </Stack>
                <Button
                  type='submit'
                  bg={"brand.400"}
                  color={"white"}
                  _hover={{
                    bg: "brand.500",
                  }}>
                  {isLoading ? <Spinner size='sm' speed='0.65s' /> : "Sign in"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
