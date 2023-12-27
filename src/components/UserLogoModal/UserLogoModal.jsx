
import React, { useState, } from 'react';
import UserSettingsModal from '../SettingModal/SettingModal'; 
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal'; 
import { Wrapper,Button,Modal,Svg,Item} from './UserLogoModal.styled';
import sprite from "../../common/symbol-defs.svg";


const UserLogoModal = () => {
  const [isUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [isUserLogoutModalOpen, setUserLogoutModalOpen] = useState(false);

  const handleSettingClick = () => {
    setUserInfoModalOpen(true);
  };

  const handleLogoutClick = () => {
    setUserLogoutModalOpen(true);
  };

  return (
    <Modal className="user-logo-modal">
      <Wrapper>
        <Item>
        <Button onClick={handleSettingClick}>
          <Svg width={16} height={16}>
          <use href={`${sprite}#cog-tooth`} />
          </Svg>
            Setting</Button>
        </Item>
        <Item>
        <Button onClick={handleLogoutClick}>
           <Svg width={16} height={16}>
          <use href={`${sprite}#arrow`} />
          </Svg>
          Log out</Button>
        </Item>
      {isUserInfoModalOpen && (
        <UserSettingsModal onClose={() => setUserInfoModalOpen(false)} />
      )}
      {isUserLogoutModalOpen && (
        <UserLogoutModal onClose={() => setUserLogoutModalOpen(false)} />
          )}
        
      </Wrapper>
    
    </Modal>
  );
};

export default UserLogoModal;
