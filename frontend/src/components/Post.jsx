/* eslint-disable react/prop-types */
import {
  Center,
  Flex,
  Image,
  Stack,
  Icon,
  FormControl,
  Button,
  Text,
  Box,
  Link,
  Avatar,
  Textarea,
  Spinner,
} from "@chakra-ui/react"
import moment from "moment"

import { AiOutlineSend, AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { GoComment } from "react-icons/go"

import { FaBookmark } from "react-icons/fa"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createComment, reset } from "../features/post/postSlice"
import { savePost, likeOrRemove } from "../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { resetSave } from "../features/user/userSlice"

import { Link as LinkRouter } from "react-router-dom"
const Post = ({ post, isBlack }) => {
  console.log(post)
  const dispatch = useDispatch()
  const [isLiked, setIsLiked] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { userDatas } = useSelector((state) => state.user)
  const { commentIsError, commentIsLoading, commentIsSuccess, commentMessage } =
    useSelector((state) => state.post)
  console.log(user)
  useEffect(() => {
    setLiked(post.likes.includes(user?._id))
  }, [user?._id, post.likes])
  useEffect(() => {
    setSaved(userDatas?.savedPosts.includes(post?._id))
  }, [user._id, post.likes, userDatas?.savedPosts, post?._id])

  const LikeIcon = liked ? AiFillHeart : AiOutlineHeart
  const {
    savePostIsSuccess,

    savePostMessage,
    likeMessage,
    likeIsSuccess,
    likeIsError,

    savePostIsError,
  } = useSelector((state) => state.user)

  const [postSaved, setPostSaved] = useState(false)
  const handleSavePost = (userId) => {
    dispatch(savePost(userId))
    setPostSaved(true)
  }
  const handleLikePost = (postId) => {
    dispatch(likeOrRemove(postId))

    setIsLiked(true)
  }
  useEffect(() => {
    if (likeIsError) {
      toast.error(likeMessage)
    }
    if (likeIsSuccess && isLiked) {
      toast.success(likeMessage)
      setIsLiked(false)
    }
    dispatch(resetSave())
  }, [dispatch, likeIsSuccess, likeMessage, isLiked, likeIsError])
  useEffect(() => {
    if (savePostIsError) {
      toast.error(savePostMessage)
    }
    if (savePostIsSuccess && postSaved) {
      toast.success(savePostMessage)
      setPostSaved(false)
    }
    dispatch(resetSave())
  }, [dispatch, savePostIsSuccess, savePostMessage, postSaved, savePostIsError])

  useEffect(() => {
    if (commentIsError) {
      toast.error(commentMessage)
    }
    if (commentIsSuccess) {
      toast.success("Comment added")
    }
    dispatch(reset())
  }, [commentIsError, commentIsSuccess, commentMessage, dispatch])

  function formatRelativeTime(apiDate) {
    const parsedDate = moment(apiDate)
    const now = moment()

    const secondsDiff = now.diff(parsedDate, "seconds")
    const minutesDiff = now.diff(parsedDate, "minutes")
    const hoursDiff = now.diff(parsedDate, "hours")
    const daysDiff = now.diff(parsedDate, "days")
    const monthsDiff = now.diff(parsedDate, "months")

    if (secondsDiff < 60) {
      return "just now"
    } else if (minutesDiff < 60) {
      return `${minutesDiff} ${minutesDiff === 1 ? "minute" : "minutes"} ago`
    } else if (hoursDiff < 24) {
      return `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hours"} ago`
    } else if (daysDiff < 30) {
      return `${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`
    } else if (monthsDiff < 12) {
      return `${monthsDiff} ${monthsDiff === 1 ? "month" : "months"} ago`
    } else {
      return moment(apiDate).fromNow()
    }
  }

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = { text: values.comment, postId: post._id }
      dispatch(createComment(formData))
      console.log(formData)
      formik.setFieldValue("comment", "")
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
    }),
  })
  return (
    <Center py={6} mx='auto'>
      <Stack
        borderWidth='1px'
        borderRadius='2xl'
        color='white'
        borderColor={isBlack ? "rgb(20,20,20)" : "rgb(25,27,30)"}
        // w={{ sm: "100%", md: "540px" }}
        width={{ base: "100%", sm: "md", md: "md", lg: "lg" }}
        height={{ sm: "auto" }}
        direction={{ base: "column" }}
        bg={isBlack ? "rgb(20,20,20)" : "rgb(25,27,30)"}
        boxShadow={"sm"}
        px={8}
        py={7}>
        <Flex flex={1} direction='column'>
          <Box mb='15px' ml='35px'>
            <Flex alignItems='center' gap='15px' mb='15px'>
              <Avatar size={"sm"} src={post?.user.profilePicture?.url} />
              <Text color='gray.300'>
                {post?.user.firstName} {post?.user.lastName}
              </Text>
            </Flex>
            <Text color='#f4845f'>{formatRelativeTime(post?.createdAt)}</Text>
          </Box>
          <Text color='gray.300'>{post?.desc}</Text>
          {post?.image?.url && (
            <Image
              rounded='xl'
              objectFit='contain'
              mx='auto'
              mt='10px'
              width={{ base: "100%", sm: "sm", md: "md", lg: "lg" }}
              src={post?.image?.url}
            />
          )}
        </Flex>
        <Flex
          flexDirection='row'
          justifyContent='space-evenly'
          alignItems='center'
          bg='rgb(20,20,20)'
          mt={2}
          size='xs'
          // width={{ base: "100%", sm: "xs", md: "md" }}
          rounded='2xl'
          p={1}
          pt={2}>
          <Box>
            <Icon
              as={LikeIcon}
              boxSize={7}
              color={liked ? "red" : ""}
              _hover={{ color: "red" }}
              cursor={"pointer"}
              onClick={() => handleLikePost(post?._id)}
            />
            {post?.likes.length > 0 && post.likes.length}
          </Box>
          <Link as={LinkRouter} to={`/comment/${post?._id}`}>
            <Icon
              as={GoComment}
              boxSize={7}
              cursor={"pointer"}
              color={post?.comments.length > 0 ? "#f4845f" : "white"}
            />{" "}
            <Box
              as='span'
              color={post?.comments.length > 0 ? "#f4845f" : "white"}>
              {post?.comments.length > 0 && post.comments.length}
            </Box>
          </Link>
          <Icon
            as={FaBookmark}
            onClick={() => handleSavePost(post?._id)}
            boxSize={7}
            fill={saved ? "#f4845f" : "white"}
            cursor={"pointer"}
          />
        </Flex>
        <form onSubmit={formik.handleSubmit}>
          <Flex
            flexDirection='row'
            alignItems='center'
            mx='auto'
            width={{ base: "100%", sm: "xs", md: "md" }}
            gap='10px'
            justifyContent={"center"}
            px='15px'>
            <FormControl width='full'>
              <Textarea
                size='xs'
                resize='none'
                rounded='2xl'
                px={2}
                variant={"solid"}
                bg={isBlack ? "rgb(25,27,30)" : "rgb(20,20,20)"}
                borderWidth={1}
                color={"gray.200"}
                _placeholder={{
                  color: "gray.400",
                }}
                _focus={{
                  border: "2px solid",
                  borderColor: "#f4845f",
                }}
                borderColor='rgb(25,27,30)'
                id={"text"}
                type={"text"}
                required
                placeholder={"Comment"}
                w='100%'
                base='sm'
                {...formik.getFieldProps("comment")}
              />
            </FormControl>
            <FormControl w='auto'>
              <Button
                size='sm'
                type='submit'
                _hover={{
                  backgroundColor: "rgba(252, 204, 1, 0.8)",
                }}
                paddingInline='16px'
                color='white'
                bg='linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)'
                rounded='md'>
                {commentIsLoading ? (
                  <Spinner size='sm' speed='0.65s' />
                ) : (
                  <Icon boxSize='1.5rem' my='5px' as={AiOutlineSend} />
                )}
              </Button>
            </FormControl>
          </Flex>
        </form>
      </Stack>
    </Center>
  )
}
export default Post
