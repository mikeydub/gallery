import styled from 'styled-components';
import { Link as RouterLink } from '@reach/router';
import { Title, Text } from 'components/core/Text/Text';
import Link from 'components/core/Link/Link';
import Spacer from 'components/core/Spacer/Spacer';

// TODO: delete this once we hav a working backend
const ADDRESSES = {
  mikey: '0xBb3F043290841B97b9C92F6Bc001a020D4B33255',
  robin: '0x70d04384b5c3a466ec4d8cfb8213efc31c6a9d15',
};

type Props = {
  usernameOrWalletAddress: string;
};

function Header({ usernameOrWalletAddress }: Props) {
  return (
    <StyledHeader>
      <StyledLeftContainer>
        <Title>{usernameOrWalletAddress}</Title>
        <Spacer height={20} />
        <StyledUserDetails>
          <Text light>Collector Since Mar 2021</Text>
          <Text light>I make cool 3d loops Black small square</Text>
          <Text light>
            http://superrare.co/rogerkilimanjaro... Black small square
          </Text>
        </StyledUserDetails>
      </StyledLeftContainer>
      <StyledRightContainer>
        <RouterLink to={`/${ADDRESSES.robin}`}>
          <StyledLink>Follow</StyledLink>
        </RouterLink>
        <RouterLink to={`/${ADDRESSES.mikey}`}>
          <StyledLink>Share</StyledLink>
        </RouterLink>
      </StyledRightContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
  max-width: 900px;
`;

const StyledLeftContainer = styled.div``;

const StyledUserDetails = styled.div``;

const StyledRightContainer = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  margin-right: 10px;
`;

export default Header;