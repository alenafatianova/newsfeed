import React, { useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { EmailModal } from '@components/EmailModal/EmailModal';

export const Page: React.FC = ({ children }) => {
  const [emailModalShow, setEmailModalShow] = useState(true)
  return (
    <>
      {emailModalShow && <EmailModal onModalClose={() => setEmailModalShow(false)}></EmailModal>}
      <Header />
      {children}
      <Footer />
    </>
  );
};
