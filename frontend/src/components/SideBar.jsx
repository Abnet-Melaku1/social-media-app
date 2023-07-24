import React from "react"
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
import {
  FiHome,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi"
import { FaUserFriends } from "react-icons/fa"

import { CgProfile } from "react-icons/cg"
import { AiOutlineInteraction } from "react-icons/ai"
import { BsBell } from "react-icons/bs"
import { Link as LinkRouter } from "react-router-dom"
const LinkItems = [
  { name: "Home", icon: FiHome, path: "/" },
  { name: "Friends", icon: FaUserFriends, path: "/friends" },
  { name: "Notifications", icon: BsBell, path: "/notifications" },

  { name: "Interaction", icon: AiOutlineInteraction, path: "/interaction" },
  { name: "Profile", icon: CgProfile, path: "/profile" },
  { name: "Setting", icon: FiSettings, path: "/setting" },
]

import ProfileCard from "./ProfileCard"

import logo from "../assets/logo-no-background.svg"
import Suggestion from "../pages/Suggestion"

export const SideBar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH='100vh' bg={useColorModeValue("gray.100", "gray.900")}>
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
        w={{ base: "auto", md: "calc(100% - 250px)" }}
        ml={{ base: 0, md: 60 }}
        justify={"space-around"}>
        <Box p='4' w={{ base: "full", md: "60%" }} mx={"auto"}>
          {children}
        </Box>
        <Box
          as='div'
          w={{ md: "30%" }}
          mr={10}
          display={{ base: "none", md: "block" }}>
          <RightBar />
        </Box>
      </Flex>
    </Box>
  )
}
const RightBar = () => {
  return (
    <Box p='4' pos={"sticky"} top={100} minH={"100vh"} w={"auto"} zIndex={1}>
      <Suggestion />
    </Box>
  )
}
const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue("white", "gray.900")}
      borderRight='1px'
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      mr={{ base: 0, sm: "240px" }}
      pos='fixed'
      h='full'
      {...rest}>
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Image src={logo} w={"120px"} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <ProfileCard />
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Link
      as={LinkRouter}
      to={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: "brand.400",
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
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth='1px'
      position={"sticky"}
      top={0}
      width={{ base: "full", md: "calc(100% - 240px)" }}
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
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
        src='../../public/logo-no-background.svg'
        w={"90px"}
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
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'>
                  <Text fontSize='sm'>Hewan</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              zIndex={2}
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}>
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
