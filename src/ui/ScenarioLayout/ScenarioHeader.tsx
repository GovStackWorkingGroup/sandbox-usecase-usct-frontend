import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, ChakraProvider, Flex, Image, SimpleGrid } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function ScenarioHeader({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) {

  return (
    <SimpleGrid
      templateColumns={{xs: "87px 1fr", md: "87px 1fr 87px"}}
      padding={{ xs: "16px 12px", lg: "16px 64px", '2xl': '24px 64px' }}
      alignItems="center" 
      width="100%"
      spacing={{ xs: '2'}} 
    >
      <Button
        justifySelf="flex-start"
        display="flex"
        leftIcon={<ArrowBackIcon />}
        as={Link}
        colorScheme="light"
        to="https://www.govstack.global/"
        variant="outline"
      >
        Exit
      </Button>
      <Flex gap="16px" justifySelf="center" alignItems="center">
        <Image
          height="40px"
          width="auto"
          src="/govstack-sandbox-logo.svg"
          alt="govstack sandbox logo"
        />
        {children}
      </Flex>
    </SimpleGrid>
  );
}
