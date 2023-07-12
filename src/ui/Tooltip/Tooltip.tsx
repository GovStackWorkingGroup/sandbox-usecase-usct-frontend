import {
  Box,
  BoxProps,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { colors } from '../../chakra-overrides/colors';
import { ContextualHelpContext } from '../../routes/usct/ContextualHelpContext';

const letterPositionProps = {
  top: {
    top: '-45px',
    right: '-8px',
  },
  'right-corner': {
    top: '-8px',
    right: '-45px',
  },
  'right-center': {
    right: '-45px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
};

function Tooltip({
  children,
  letter,
  letterPosition = 'right-corner',
  ...boxProps
}: {
  letter: string;
  letterPosition?: 'top' | 'right-corner' | 'right-center';
} & BoxProps) {
  const { activeLetter, setActiveLetter } = useContext(ContextualHelpContext);

  const positionProps = useBreakpointValue({
    base: letterPositionProps.top,
    md: letterPositionProps[letterPosition],
  });

  return (
    <Box
      position="relative"
      _after={{
        content: `""`,
        border: `5px dashed ${
          activeLetter === letter ? colors.green[400] : 'transparent'
        }`,
        position: 'absolute',
        inset: '-8px',
        borderRadius: '8px',
        pointerEvents: 'none',
        transition: 'border-color 0.3s ease-in-out',
      }}
      {...boxProps}
    >
      {children}
      <Flex
        position="absolute"
        opacity={!!activeLetter && activeLetter !== letter ? '0' : '1'}
        width="34px"
        height="34px"
        borderRadius="100%"
        backgroundColor={
          !!activeLetter && activeLetter === letter
            ? colors.green[400]
            : colors.green[200]
        }
        color={colors.secondary[1000]}
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        pointerEvents={
          !!activeLetter && activeLetter !== letter ? 'none' : 'auto'
        }
        zIndex="1"
        transition="opacity 0.3s ease-in-out, background-color 0.3s ease-in-out"
        onClick={() => {
          if (activeLetter === null) {
            setActiveLetter(letter);
          }
          if (activeLetter === letter) {
            setActiveLetter(null);
          }
        }}
        _hover={{
          backgroundColor: colors.green[400],
        }}
        {...positionProps}
      >
        <Text>{letter}</Text>
      </Flex>
    </Box>
  );
}

export default Tooltip;
