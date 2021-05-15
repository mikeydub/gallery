import { useCallback, useMemo } from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { useAuthActions } from 'contexts/auth/AuthContext';
import TextButton from 'components/core/Button/TextButton';
import Dropdown from 'components/core/Dropdown/Dropdown';
import Spacer from 'components/core/Spacer/Spacer';

function truncate(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function LoggedInNav() {
  const { logOut } = useAuthActions();

  // TODO__v1: when backend/usercontext is ready, get address from useUser
  const walletAddress = '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7';
  const displayedAddress = useMemo(() => {
    return truncate(walletAddress);
  }, [walletAddress]);

  const handleGalleryRedirect = useCallback(() => {
    // TODO__v1: when backend/usercontext is ready, get username from useUser
    navigate('/link-to-my-gallery');
  }, []);

  return (
    <Container>
      <TextButton onClick={handleGalleryRedirect} text="My Gallery" />
      <Spacer width={24} />
      <Dropdown mainText="Account">
        {/* TODO: create generic link component */}
        <a
          href={`https://etherscan.io/address/${walletAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledTextButton text={displayedAddress} disableTextTransform />
        </a>
        <Spacer height={12} />
        <TextButton text="Sign Out" onClick={logOut} underlineOnHover />
      </Dropdown>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const StyledTextButton = styled(TextButton)`
  text-decoration: underline;
`;

export default LoggedInNav;