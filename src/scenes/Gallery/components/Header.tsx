import styled from 'styled-components';
import { Link as RouterLink } from '@reach/router';
import { Title, Text } from 'components/core/Text/Text';
import Link from 'components/core/Link/Link';
import Spacer from 'components/core/Spacer/Spacer';
import Dropdown from 'components/core/Dropdown/Dropdown';

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
        <Dropdown
          mainText="Edit Profile"
          options={[
            { label: 'Edit name', value: '/edit/name' },
            { label: 'Edit bio', value: '/edit/bio' },
            { label: '+ New Collection', value: '/add/collection' },
          ]}
        ></Dropdown>
      </StyledRightContainer>
      {
        /* coming soon in v2 */
        // <StyledRightContainer>
        //   <StyledRouterLink to={`/${ADDRESSES.robin}`}>
        //     <StyledLink>Follow</StyledLink>
        //   </StyledRouterLink>
        //   <Spacer width={20} />
        //   <StyledRouterLink to={`/${ADDRESSES.mikey}`}>
        //     <StyledLink>Share</StyledLink>
        //   </StyledRouterLink>
        //   <Spacer width={20} />
        //   <Text light>Tip • $14,290.91</Text>
        // </StyledRightContainer>
      }
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;

  max-width: 1024px; // TODO: make this responsive - this is shared with body
`;

const StyledLeftContainer = styled.div``;

const StyledUserDetails = styled.div``;

const StyledRightContainer = styled.div`
  display: flex;
`;

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Header;
