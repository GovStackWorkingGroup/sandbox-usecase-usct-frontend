import {
  Box,
  Button,
  ButtonGroup,
  Center,
  CircularProgress,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { colors } from '../../chakra-overrides/colors';
import BankInformation from '../usct/personal/BankInformation';
import PersonalInformation from '../usct/personal/PersonalInformation';
import { RPCContext } from './rpc';
import { DriverPOC } from './types';
import { ReactComponent as DeleteIcon} from '@assets/icons/trash.svg';
import { getRole } from './utils/token';

export default function CandidateDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const rpc = useContext(RPCContext);
  const [selectedPackage, setSelectedPackage] = useState<DriverPOC.Package>();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const isEnrollmentOfficer = (getRole() === "ROLE_ENROLLMENT_OFFICER");
  const isRegistryAdministrator = (getRole() === "ROLE_REGISTRY_ADMINISTRATION");

  const { data: packages } = useQuery('packages', rpc.getPackages);

  const { data: candidate, isFetching } = useQuery(
    `candidate-${id}`,
    async () => {
      if (id) {
        const res = await rpc.getCandidateInfo(+id);
        return (res.person != null)?(res):(navigate('/driver-poc'));
      }
    }
  );
  const deleteCandidate = async (id: number) => {
    rpc.deleteCandidate(id);
    return navigate('/driver-poc/candidates');
  }

  const handleEnroll = async (selectedPackage?: DriverPOC.Package) => {
    if (candidate && selectedPackage) {
      setIsEnrolling(true);
      const res = await rpc.enrollCandidate(candidate, selectedPackage);
      if (res) {
        setIsEnrolled(true);
      }
    }
  };
  if (isFetching) {
    <Center>
      <Spinner />
    </Center>;
  }
  if (isEnrolled) {
    return (
      <Center display="flex" margin="auto">
        <VStack maxW="640px" gap="40px">
          <Heading size="md" mb="20px">
            Thank you! Candidate Enrolled into the program.
          </Heading>
          <Box>
            <Text size="lg" mb="20px">
              The Candidate has been successfully enrolled in the Unconditional
              Social Cash Transfer Program and has become a beneficiary of the
              program.
            </Text>
            <Text size="lg">
              To initiate a payment for the beneficiary, kindly access the
              beneficiary list.
            </Text>
          </Box>
          <Box>
            {/* <Button mb="10px" maxW="380px" w="100%" colorScheme="admin">
              Home
            </Button> */}
            <ButtonGroup
              maxW="380px"
              w="100%"
              colorScheme="admin"
              variant="solid"
              gap="20px"
            >
              <Button as={Link} to="/driver-poc" w="100%">
                Candidate List
              </Button>
            </ButtonGroup>
          </Box>
        </VStack>
      </Center>
    );
  }
  if (isEnrolling) {
    return (
      <Center display="flex" margin="auto">
        <VStack gap="40px">
          <CircularProgress isIndeterminate size={100} mb="40px" />
          <Heading mb="20px">Enrolling!</Heading>
          <Text>Please wait! This process might take some time.</Text>
        </VStack>
      </Center>
    );
  }
  return (
    <Flex direction="column" gap="60px">
      {/* <Heading>Assign candidate to the program</Heading> */}
      {candidate ? (
        <>
          <PersonalInformation person={candidate.person} />
          <BankInformation candidate={candidate}
          />
           <Flex direction="column" gap="20px">
            { isEnrollmentOfficer?  (<Heading size="md">Select a Benefit Package</Heading>):""}
            <SimpleGrid columns={4} gap="40px">
              {packages?.map((p) => {
                return (
                  <button
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'flex-start',
                      borderRadius: '8px',
                      flexDirection: 'column',
                      border: `1px solid ${colors.secondary[1000]}`,
                      padding: '20px',
                      color: candidate.packages.some(
                        (candidatePackage) => candidatePackage.id === p.id
                      )
                        ? colors.secondary[1000]
                        : colors.secondary[200],
                    }}
                    key={p.id}
                    disabled={
                      !candidate.packages.some(
                        (candidatePackage) => candidatePackage.id === p.id
                      )
                    }
                    onClick={() => setSelectedPackage(p)}
                  >
                    <Flex justifyContent="space-between" gap="20px" w="100%">
                      <Text textAlign="left" size="lg">
                        <strong>{p.name}</strong>
                      </Text>
                      { isEnrollmentOfficer ? (
                        <Box
                        w="20px"
                        h="20px"
                        flexShrink="0"
                        borderRadius="100%"
                        border={`1px solid ${colors.secondary[1000]}`}
                        backgroundColor={
                          selectedPackage?.id === p.id
                            ? colors.secondary[1000]
                            : colors.secondary[0]
                        }
                      ></Box>
                      ):""}
                    </Flex>
                    <Text textAlign="left">{p.description}</Text>
                    <Text textAlign="left">Payment Amount: 1 234 €</Text>
                    {!candidate.packages.some(
                      (candidatePackage) => candidatePackage.id === p.id
                    ) && (
                      <Text
                        color={colors.secondary[200]}
                        size="sm"
                        textAlign="right"
                        w="100%"
                        mt="auto"
                      >
                        Not eligible
                      </Text>
                    )}
                  </button>
                );
              })}
            </SimpleGrid>
          </Flex>
          <Flex>
            { isRegistryAdministrator ? (
              <Flex>
                <Button  onClick={() => deleteCandidate(candidate.id)} colorScheme="red" leftIcon={<DeleteIcon/>} w="180px">
                  Delete candidate
                </Button>
              </Flex>
              ):""}
            <Spacer/>
            <Flex>
              <ButtonGroup colorScheme="admin">
                <Button as={Link} to="/driver-poc/candidates" w="180px" variant={ isEnrollmentOfficer ? "outline" : "solid" }>
                  Back
                </Button>
                { isEnrollmentOfficer ? (
                  <Button w="180px" onClick={() => handleEnroll(selectedPackage)}>
                    Enroll
                  </Button>
                ):""}
              </ButtonGroup>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" w="100%">
          <Spinner size="lg" />
        </Flex>
      )}
    </Flex>
  );
}
