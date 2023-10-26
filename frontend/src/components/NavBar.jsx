import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  Container,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons"
import React from "react"
import { Link as LinkRouter } from "react-router-dom"
import img from "../assets/logo-no-background.svg"
export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box bg='rgb(20,20,20)'>
      <Container maxW='7xl'>
        <Flex
          bg='rgb(20,20,20)'
          borderRadius='16px'
          backdropFilter='blur(5px)'
          webkitBackdropFilter='blur(5px)'
          border='1px solid rgb(20,20,20)'
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={"center"}>
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Link as={LinkRouter} to='/'>
              <Image
                src='/logo-no-background.svg'
                width='160px'
                objectFit='cover'
                alt='logo'
              />
            </Link>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            align={"center"}
            spacing={6}>
            <Link as={LinkRouter} to='/signin'>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                px={6}
                fontWeight={600}
                bg='gray.100'
                _hover={{
                  bg: "gray.200",
                }}
                rounded={"full"}>
                Sign In
              </Button>
            </Link>
            <Link as={LinkRouter} to='/signup'>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg='linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)'
                _hover={{
                  bg: "linear-gradient(to right, #f7b538, #f29e2f, #eb872b, #e26f29, #d8572a)",
                }}>
                Sign Up
              </Button>
            </Link>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity color='gray.300'>
          <MobileNav />
        </Collapse>
      </Container>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200")
  const linkHoverColor = useColorModeValue("gray.800", "white")
  const popoverContentBgColor = useColorModeValue("white", "gray.800")

  return <Stack direction={"row"} spacing={4}></Stack>
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}>
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "gray.300" }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}>
          <Icon color={"gray.200"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack bg='rgb(25,27,30)' p={4} display={{ md: "none" }}>
      <Stack
        flex={{ base: 1, md: 0 }}
        justify={"flex-end"}
        direction={"column"}
        spacing={6}>
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"gray.300"}
          href={"#"}
          _hover={{
            bg: "rgba(252, 204, 1, 0.7)",
          }}>
          Sign In
        </Button>
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"brand.500"}
          href={"#"}
          _hover={{
            bg: "brand.400",
          }}>
          Sign Up
        </Button>
      </Stack>
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_ITEMS = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
]
