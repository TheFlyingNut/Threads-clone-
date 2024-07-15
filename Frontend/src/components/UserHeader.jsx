import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import { CgMoreO } from "react-icons/cg";

const UserHeader = () => {
  const toast = useToast();
  const copyURL = () =>{
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(()=>{
      toast({
        title: "Link Copied.",
        description: "copied to your clickboard",
        status: "success",
        duration: 5000,
        isclosable: true,
      });
    });
  }
  return (
    <VStack>
      <Flex justifyContent="space-between" w="full">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Mark Zuckerberg
          </Text>

          <Flex gap={2} alignItems="center">
            <Text fontSize="sm">
              Mark Zuckerberg
            </Text>
            <Text fontSize="xs" bg="gray.800" color="gray.100" p={1} borderRadius="full">
              threads.net
            </Text>
          </Flex>
        </Box>

        <Box>
          <Avatar name="Mark Zuckerberg" src="/zuck-avatar.png" size="xl" />
        </Box>
      </Flex>

      <Text>Co-founder, Executive Chairman, and CEO of Meta Platforms.</Text>

      <Flex w="full" justifyContent="space-between">
        <Flex gap={2} alignItems="center">
          <Text color={"gray.light"}>3.2k followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"}/>
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"}/>
              </MenuButton>
            <Portal>
              <MenuList bg={"gray.dark"}>
                <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
              </MenuList>
            </Portal>
            </Menu>
          </Box>
        </Flex>
        </Flex>
        <Flex w={"full"}>
          <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
            <Text fontWeight={"bold"}>Threads</Text>
          </Flex>
          <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb="3" cursor={"pointer"}>
            <Text fontWeight={"bold"}>Replies</Text>
          </Flex>
        </Flex>
    </VStack>
  );
};

export default UserHeader;
