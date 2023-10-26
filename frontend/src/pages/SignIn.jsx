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

export default function SignIn() {
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
      dispatch(login(values))
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
  })
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg='rgb(20,20,20)'>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color='gray.300'>
            Sign in to your account
          </Heading>
          <Text fontSize={"lg"} color={"gray.300"}>
            to enjoy all of our cool <Link color='#d8572a'>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg='rgb(25,27,30)' boxShadow={"lg"} p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                id='email'
                isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel color='gray.300'>Email address</FormLabel>
                <Input
                  bg='rgb(20,20,20)'
                  type='email'
                  color='gray.300'
                  focusBorderColor='#d8572a'
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                id='password'
                isInvalid={formik.touched.password && formik.errors.password}>
                <FormLabel color='gray.300'>Password</FormLabel>
                <Input
                  bg='rgb(20,20,20)'
                  color='gray.300'
                  type='password'
                  focusBorderColor='#d8572a'
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}>
                  <Checkbox isChecked colorScheme={"brand"} color='#d8572a'>
                    Remember me
                  </Checkbox>
                </Stack>
                <Button
                  type='submit'
                  bg='linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)'
                  color={"white"}
                  _hover={{
                    bg: "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
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
