import React, { useEffect } from "react"
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react"
import { FiHome, FiSettings, FiMenu, FiChevronDown } from "react-icons/fi"
import { FaUserFriends } from "react-icons/fa"

import { CgProfile } from "react-icons/cg"
import { AiOutlineInteraction } from "react-icons/ai"
import { BsBell } from "react-icons/bs"
import { Link as LinkRouter, useLocation, useNavigate } from "react-router-dom"

import ProfileCard from "./ProfileCard"
import { logout, reset } from "../features/auth/authSlice"

import Suggestion from "../pages/Suggestion"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../features/user/userSlice"
export const SideBar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { userDatas, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.user
  )

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
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

  return (
    <Box minH='100vh' bg='rgb(20,20,20)'>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Flex
        as='section'
        w={{ base: "auto", md: "calc(100% - 260px)" }}
        ml={{ base: 0, md: "260px" }}
        justify={"space-around"}>
        <Box p='4' w={{ base: "full", md: "95%", lg: "60%" }} mx={"auto"}>
          {children}
        </Box>
        <Box
          as='div'
          w={{ md: "30%" }}
          mr={10}
          display={{ base: "none", lg: "block" }}>
          <RightBar />
        </Box>
      </Flex>
    </Box>
  )
}
const RightBar = () => {
  return (
    <Box
      p='4'
      pos={"sticky"}
      top={103}
      mt='15px'
      minH={"100vh"}
      w={"auto"}
      rounded='lg'
      zIndex={1}
      bg='rgb(25,27,30)'>
      <Suggestion />
    </Box>
  )
}
const SidebarContent = ({ onClose, ...rest }) => {
  const { user } = useSelector((state) => state.auth)
  const LinkItems = [
    { name: "Home", icon: FiHome, path: "/feed" },
    { name: "Friends", icon: FaUserFriends, path: `/friends/${user?._id}` },
    { name: "Notifications", icon: BsBell, path: "" },

    { name: "Saved Posts", icon: AiOutlineInteraction, path: "/savedposts" },
    { name: "Profile", icon: CgProfile, path: `/profile/${user?._id}` },
    { name: "Setting", icon: FiSettings, path: "/setting" },
  ]

  return (
    <Box
      transition='3s ease'
      borderRight='1px'
      borderRightColor={useColorModeValue("gray.900", "gray.800")}
      bg='rgb(25,27,30)'
      color='gray.300'
      w={{ base: "full", md: "260px" }}
      mr={{ base: 0, sm: "250px" }}
      pos='fixed'
      h='full'
      {...rest}>
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Image src='/logo-no-background.svg' w={"160px"} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <ProfileCard />
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          path={link.path}
          color='gray.300'>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, path, ...rest }) => {
  const location = useLocation()
  const isActive = location.pathname === path

  console.log("location", location.pathname)

  return (
    <Link
      color='gray.300'
      as={LinkRouter}
      to={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        color='gray.300'
        role='group'
        cursor='pointer'
        bg={
          isActive &&
          "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)"
        }
        _hover={{
          marginBlock: "5px",
          backgroundImage:
            "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
        }}
        _active={{
          backgroundImage: "rgba(252, 204, 1, 0.8)",
          color: "white",
        }}
        _activeLink={{
          backgroundImage:
            "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
          color: "white",
        }}
        {...rest}>
        {icon && (
          <Icon
            mr='4'
            fontSize='22'
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { userDatas } = useSelector((state) => state.user)
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }
  return (
    <Flex
      zIndex={2}
      ml={{ base: 0, md: "250px" }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg='rgb(25,27,30)'
      color='white'
      borderBottomWidth='1px'
      position={"sticky"}
      top={0}
      width={{ base: "full", md: "calc(100% - 250px)" }}
      borderBottomColor='rgb(20,20,20)'
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}>
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Image
        display={{ base: "flex", md: "none" }}
        src='/logo-no-background.svg'
        w={"160px"}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    userDatas?.profilePicture?.url
                      ? userDatas?.profilePicture?.url
                      : ""
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'>
                  <Text fontSize='sm'>
                    {user?.firstName} {user?.lastName}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              zIndex={1000}
              bg='rgb(20,20,20)'
              borderColor='rgba(252, 204, 1, 0.8)'>
              <MenuItem bg='rgb(20,20,20)' color='gray.300' onClick={onLogout}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
