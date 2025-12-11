import { ArrowForwardIcon, ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Slide,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { colors } from "../../chakra-overrides/colors";
import AccordionElement from "./AccordionElement";
import BuildingBlockView from "./BuildingBlocks/BuildingBlockView";
import { DIALBuildingBlockContext } from "./BuildingBlocks/DIALBuildingBlockContext";
import { Popup, PopupContainer } from "./Dial.styles";

export default function DIAL() {
  const { data: sdgs } = useQuery(
    "sdgs",
    async () => {
      const req = await fetch("https://simulation.govstack.global/data/sdgs.json");
      const res = await req.json();
      return res;
    },
    { refetchOnWindowFocus: false },
  );
  const { data: workflows } = useQuery(
    "workflows",
    async () => {
      const req = await fetch("https://simulation.govstack.global/data/workflows.json");
      const res = await req.json();
      return res;
    },
    { refetchOnWindowFocus: false },
  );

  const { openedBuildingBlock, setOpenedBuildingBlock } = useContext(
    DIALBuildingBlockContext,
  );

  useEffect(() => {
    if (openedBuildingBlock) {
      onOpen();
      setActive({ type: "BUILDING_BLOCKS" });
    }
  }, [openedBuildingBlock]);

  const { isOpen, onToggle, onOpen } = useDisclosure();
  const [active, setActive] = useState<null | {
    type: string;
    name?: string;
    long_title?: string;
    sdg_targets?: { name: string }[];
    use_case_descriptions?: { description: string }[];
    description?: string;
  }>();

  return (
    <Box position="absolute" bottom="0.5rem" left="0.5rem">
      <Button
        onClick={() => {
          onToggle();
          setOpenedBuildingBlock(null);
        }}
        h="4.5rem"
        w="4.5rem"
        backgroundColor="secondary.1000"
        borderWidth=".125rem"
        borderStyle="solid"
        borderColor="#ffC107"
        colorScheme="admin"
        boxShadow="0rem .25rem 2rem rgba(0, 0, 0, 0.25)"
        borderRadius="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="0.8rem"
      >
        <CloseIcon color="#FFC107" display={!isOpen ? "none" : undefined} />
        <Image
          src="/images/govstack-exchange-logo.svg"
          alt="GovStack Exchange Logo"
          display={isOpen ? "none" : undefined}
        />
      </Button>
      <PopupContainer>
        <Slide
          direction="bottom"
          in={isOpen}
          style={{ position: "relative", transition: "all 0.2s ease-out" }}
          unmountOnExit
        >
          {isOpen && (
            <Popup>
              <Flex justifyContent="space-between" pb="0">
                <Text maxW="60%" color="theme.light" variant="caps">
                  Govexchange catalogue
                </Text>
                <Image
                  w="5rem"
                  h="3rem"
                  src="/images/govstack-exchange-logo.svg"
                  alt="GovStack Exchange Logo"
                />
              </Flex>
              <Box position="relative">
                <Slide
                  direction="left"
                  style={{ position: "absolute" }}
                  in={!active}
                  unmountOnExit
                >
                  <Box>
                    <Text mb="1rem" size="sm" color={colors.secondary[500]}>
                      The GovStack Exchange promotes a Whole-of-Government approach
                      to invest in digital technologies to achieve the
                      sustainable development goals.
                    </Text>
                    <Accordion allowToggle>
                      <AccordionElement
                        setActive={setActive}
                        title="SUSTAINABLE DEVELOPMENT GOALS"
                        data={sdgs}
                      />
                      <AccordionItem>
                        <AccordionButton justifyContent="space-between">
                          <Text size="sm">USE CASES</Text>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                          <Text size="sm" mb="1rem">
                            A Use Case defines the steps that an individual or
                            system will undertake in order to achieve a business
                            objective.
                          </Text>
                          <Text size="sm">
                            For more information please check{" "}
                            <Link
                              isExternal
                              href="https://govstack.gitbook.io/use-cases/"
                            >
                              GovStack Specifications
                            </Link>.
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>
                      <AccordionItem>
                        <AccordionButton justifyContent="space-between">
                          <Text size="sm">BUILDING BLOCKS</Text>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                          <Text size="sm" mb="1rem">
                            Building blocks are enterprise-ready, reusable
                            software components providing key functionality
                            facilitating generic WorkFlows across multiple
                            sectors.
                          </Text>
                          <Text size="sm">
                            <Button
                              variant="unstyled"
                              onClick={() =>
                                setActive({ type: "BUILDING_BLOCKS" })
                              }
                            >
                              List of Building Blocks <ArrowForwardIcon />
                            </Button>
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>
                      <AccordionElement
                        setActive={setActive}
                        title="WORKFLOWS"
                        data={workflows}
                      />
                      {/* <AccordionItem>
                        <AccordionButton justifyContent="space-between">
                          <Text size="sm">PRODUCTS</Text>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                          <Text size="sm" mb="1rem">
                            A Product is a specific technology offering that is
                            designed to implement one or more Building Blocks
                          </Text>
                          <Text size="sm">
                            For more information please check{" "}
                            <Link
                              isExternal
                              href="https://exchange-dev.dial.global/products"
                            >
                              GovStack Exchange Catalogue
                            </Link>
                          </Text>
                        </AccordionPanel>
                      </AccordionItem> */}
                    </Accordion>
                  </Box>
                </Slide>
                <Slide
                  direction="right"
                  style={{ position: "absolute" }}
                  in={!!active}
                  unmountOnExit
                >
                  <Box pt="1rem">
                    <Button
                      variant="link"
                      colorScheme="light"
                      onClick={() => {
                        setActive(null);
                        setOpenedBuildingBlock(null);
                      }}
                      leftIcon={<ChevronLeftIcon />}
                    >
                      Back to overview
                    </Button>
                    {active?.type === "BUILDING_BLOCKS" && (
                      <BuildingBlockView />
                    )}
                    {active?.type !== "BUILDING_BLOCKS" && (
                      <Flex direction="column" gap="1rem" mt="1rem">
                        <Heading size="sm">{active?.name}</Heading>
                        {active?.long_title && (
                          <Text>{active?.long_title}</Text>
                        )}
                        {active?.sdg_targets?.map(
                          (target: { name: string }, index: number) => (
                            <Text key={index} size="sm">
                              {target.name}
                            </Text>
                          ),
                        )}
                        {active?.use_case_descriptions?.map((el) => (
                          <Text
                            key={el.description}
                            dangerouslySetInnerHTML={{
                              __html: el.description,
                            }}
                          />
                        ))}
                        {active?.description &&
                          JSON.parse(active.description).ops.map(
                            (
                              op: {
                                attributes: { bold: string };
                                insert: string;
                              },
                              index: number,
                            ) => (
                              <Text
                                key={index}
                                variant={op?.attributes?.bold && "bold"}
                              >
                                {op.insert}
                              </Text>
                            ),
                          )}
                      </Flex>
                    )}
                  </Box>
                </Slide>
              </Box>
            </Popup>
          )}
        </Slide>
      </PopupContainer>
    </Box>
  );
}
