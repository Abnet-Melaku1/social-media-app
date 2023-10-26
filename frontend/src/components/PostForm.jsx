import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import { createPost, reset } from "../features/post/postSlice"
import { IoMdPhotos } from "react-icons/io"
import { toast } from "react-toastify"
export const PostForm = () => {
  const dispatch = useDispatch()
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.post
  )
  const { userDatas } = useSelector((state) => state.user)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success("Post Created")
    }
    dispatch(reset())
  }, [isError, isSuccess, message, dispatch])
  const [selectedImage, setSelectedImage] = useState(null)

  const formik = useFormik({
    initialValues: {
      desc: "",
      file: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values.desc)
      console.log(values.file)

      const formData = new FormData()
      formData.append("desc", values.desc)
      formData.append("file", values.file)
      console.log(formData)
      dispatch(createPost(formData))
      formik.setFieldValue("file", "")
      formik.setFieldValue("desc", "")
      setSelectedImage(null)
    },
    validationSchema: Yup.object({
      desc: Yup.string(),
      file: Yup.mixed(),
    }),
  })
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      const file = e.target.files[0]

      formik.setFieldValue("file", file)
    }
  }
  const removeImageHandler = () => {
    console.log("clicked")
    formik.setFieldValue("file", null)
    setSelectedImage(null)
  }
  return (
    <Stack
      zIndex='-1'
      color='white'
      border='2px solid'
      borderColor='rgb(20,20,20)'
      bg='rgb(25,27,30) '
      marginTop='17px'
      padding='10px'
      boxShadow='sm'
      borderRadius='15px'
      width={{ base: "100%" }}>
      <form onSubmit={formik.handleSubmit}>
        <Flex flexDirection='column'>
          <Text mb='5px' color='gray.300'>
            Post Something
          </Text>
          <Box>
            <Flex alignItems='center' gap='8px'>
              <Wrap opacity='1'>
                <WrapItem>
                  <Avatar
                    padding='5px'
                    name='Dan Abrahmov'
                    src={userDatas?.profilePicture?.url}
                    size='md'
                  />
                </WrapItem>
              </Wrap>
              <Textarea
                size='sm'
                rounded='2xl'
                required
                border='1px solid'
                resize='none'
                bg='rgb(20,20,20)'
                borderColor='rgb(20,20,20)'
                _hover={{ borderColor: "gray.900" }}
                focusBorderColor='#f4845f'
                type='text'
                width='80%'
                {...formik.getFieldProps("desc")}
                placeholder="What's on your mind ?"
              />
            </Flex>
          </Box>
        </Flex>

        {selectedImage && (
          <Image
            mx='auto'
            boxSize='300px'
            objectFit='cover'
            alt={"Avatar Alt"}
            src={selectedImage && URL.createObjectURL(selectedImage)}
            mb={4}
            pos={"relative"}
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
        )}
        <Box>
          <Input
            type='file'
            id='fileInput'
            style={{ display: "none" }}
            onChange={imageChange}
          />

          <Flex
            flexDirection='row'
            justifyContent={"space-between"}
            width={"100%"}>
            <Button htmlFor='fileInput' as='label'>
              <IoMdPhotos />
            </Button>
            {selectedImage && (
              <Button onClick={removeImageHandler}>Remove</Button>
            )}

            <Button
              type='submit'
              paddingBlock='3px'
              justifySelf={"flexEnd"}
              _hover={{
                backgroundColor:
                  "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
              }}
              paddingInline='16px'
              bg='linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)'
              boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
              color='white'
              cursor='pointer'
              borderRadius='8px'>
              {isLoading ? <Spinner size='sm' speed='0.65s' /> : "Post"}
            </Button>
          </Flex>
        </Box>
      </form>
    </Stack>
  )
}
export default PostForm
