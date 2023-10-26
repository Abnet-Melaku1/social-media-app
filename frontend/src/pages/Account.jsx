import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Flex,
  Badge,
  HStack,
  FormControl,
  Input,
  FormLabel,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { SideBar as Layout } from "../components/SideBar"
import { useSelector, useDispatch } from "react-redux"

import * as Yup from "yup"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { updateUser, reset, getUser } from "../features/user/userSlice"

export const Page = () => {
  const { user } = useSelector((state) => state.auth)
  const { userDatas, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.user
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (user) {
      console.log("getuser")
      dispatch(getUser())
      dispatch(reset())
    }

    if (!user) {
      navigate("/signin")
    }
  }, [user, navigate, isError, message, dispatch])
  if (isLoading) console.log("loading")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState(null)
  const customStyles = {
    "&:focus": {
      boxShadow:
        "0 0 0 3px linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
      borderColor:
        "2px solid linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
    },
  }

  const formik = useFormik({
    initialValues: {
      firstName: userDatas?.firstName,
      lastName: userDatas?.lastName,
      email: userDatas?.email,
      country: userDatas?.country,
      file: null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values)
      const formData = new FormData()
      formData.append("firstName", values.firstName)
      formData.append("lastName", values.lastName)
      formData.append("country", values.country)
      formData.append("email", values.email)
      formData.append("file", values.file)

      dispatch(updateUser(formData))
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      country: Yup.string().required("Required"),
      file: Yup.mixed().required("File is required."),
    }),
  })
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      const file = e.target.files[0]

      formik.setFieldValue("file", file)
    }
  }
  return (
    <Flex
      py={6}
      direction={{ base: "column" }}
      alignItems='center'
      gap='15px'
      width='full'
      rounded='md'
      bg='rgb(25,27,30)'>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        minHeight={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Are you sure ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody color='gray.700'>
            By clicking the delete button, you are confirming that you want to
            permanently delete your account. This process cannot be undone.
          </ModalBody>

          <ModalFooter>
            <Button variant='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              rounded={"md"}
              bg={"red.500"}
              color={"white"}
              boxShadow={"md"}
              _hover={{
                bg: "red.500",
              }}
              _focus={{
                bg: "red.500",
              }}>
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        maxW={{ base: "full" }}
        w={"full"}
        bg='rgb(25,27,30)'
        boxShadow={"sm"}
        rounded={"lg"}
        color='gray.300'
        p={6}
        textAlign={"center"}>
        <Box border={"1px solid"} borderColor='gray.900' rounded='md'>
          <Avatar
            size={"xl"}
            alt={"Avatar Alt"}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : userDatas?.profilePicture?.url
            }
            mb={4}
            pos={"relative"}
            showBorder={true}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {user?.firstName} {user?.lastName}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            Ethiopia
          </Text>
        </Box>
        <Stack
          mt={8}
          direction={"row"}
          spacing={4}
          alignItems='center'
          justifyContent='center'>
          <FormControl flex={{ base: 0.5 }}>
            <Input
              type='file'
              id='fileInput'
              style={{ display: "none" }}
              onChange={imageChange}
            />
            <Button
              as='label'
              htmlFor='fileInput'
              fontSize={"sm"}
              width='full'
              cursor={"pointer"}
              rounded={"md"}
              bg='linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)'
              color={"white"}
              boxShadow={"md"}
              _hover={{
                bg: "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
              }}
              _focus={{
                bg: "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
              }}>
              Upload Profile
            </Button>
          </FormControl>
        </Stack>

        <Stack
          mt={8}
          direction={"row"}
          spacing={4}
          alignItems='center'
          justifyContent='center'>
          <Button
            onClick={onOpen}
            flex={{ base: 0.5 }}
            fontSize={"sm"}
            rounded={"md"}
            bg={"red.500"}
            color={"white"}
            boxShadow={"md"}
            _hover={{
              bg: "red.400",
            }}
            _focus={{
              bg: "red.500",
            }}>
            Delete Account
          </Button>
        </Stack>
      </Box>

      <Box
        boxShadow='sm'
        p='25px'
        rounded='md'
        w='full'
        color='white'
        bg='rgb(25,27,30)'
        mt='15px'>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent={"center"}
            color='gray.300'>
            <Box>
              <FormControl
                id='firstName'
                isRequired
                isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel color='gray.300'>First Name</FormLabel>
                <Input
                  type='text'
                  focusBorderColor=' #f4845f'
                  {...formik.getFieldProps("firstName")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl
                isRequired
                id='lastName'
                isInvalid={formik.touched.lastName && formik.errors.lastName}>
                <FormLabel color='gray.300'>Last Name</FormLabel>
                <Input
                  type='text'
                  width={"full"}
                  focusBorderColor=' #f4845f'
                  {...formik.getFieldProps("lastName")}
                />
                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
              </FormControl>
            </Box>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent={"center"}>
            <Box>
              <FormControl
                id='email'
                isRequired
                isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel color='gray.300'>Email Address</FormLabel>
                <Input
                  type='text'
                  focusBorderColor=' #f4845f'
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl
                id='country'
                isInvalid={formik.touched.country && formik.errors.country}>
                <FormLabel color='gray.300'>Country</FormLabel>
                <Input
                  type='text'
                  border='1px'
                  // borderColor="linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)'"
                  focusBorderColor=' #f4845f'
                  {...formik.getFieldProps("country")}
                />
                <FormErrorMessage>{formik.errors.country}</FormErrorMessage>
              </FormControl>
            </Box>
          </Stack>
          <Stack mt={8} direction={"row"} spacing={4}>
            <Button
              type='submit'
              flex={1}
              fontSize={"sm"}
              rounded={"md"}
              bg='linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)'
              color={"white"}
              boxShadow={"md"}
              _hover={{
                bg: "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
              }}
              _focus={{
                bg: "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
              }}>
              Update Account
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  )
}

const withLayout = (WrappedComponent) => {
  return function WithLayout(props) {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    )
  }
}

const Account = withLayout(Page)
export default Account
