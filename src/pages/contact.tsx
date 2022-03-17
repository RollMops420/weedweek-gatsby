import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import InnerContainer from 'components/InnerContainer';
import Box from 'components/Box';
import SEO from 'components/SEO';

const EmailInput = styled.input`
  border: none;
  width: 100%;
  padding: 10px 5px;
  font-family: 'Poppins';
  font-weight: bold;
  border-radius: 3px;
  margin: 5px 0;
  &:focus {
    outline: none;
    border-bottom: 3px solid ${({ theme }) => theme.secondary};
    padding: 10px 5px 7px 5px;
  }
`;

const TextInput = styled.textarea`
  border: none;
  width: 100%;
  padding: 10px 5px;
  font-family: 'Poppins';
  font-weight: bold;
  border-radius: 3px;
  min-height: 100px;
  margin: 5px 0;
  &:focus {
    outline: none;
    border-bottom: 3px solid ${({ theme }) => theme.secondary};
    padding: 10px 5px 7px 5px;
  }
`;

const Send = styled.button`
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 3px;
  padding: 10px 0;
  width: 100%;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.secondary};
    padding: 8px 0;
  }
`;

const Message = styled.div`
  background: lightgreen;
  color: ${({ theme }) => theme.black};
  text-align: center;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  font-family: 'Poppins';
  font-weight: bold;
`;

const ContactInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ theme }) => theme.mq.l} {
    padding-bottom: 30px;
  }
`;

const InfoText = styled.span`
  color: ${({ theme }) => theme.white};
  font-family: 'Poppins';
  font-weight: bold;
`;

const EmailText = styled.a`
  font-family: 'Poppins';
  font-weight: bold;
  color: #07a9b8;
  text-decoration: underline;
`;

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sended, setSended] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({
          email,
          message,
        }),
      });
      setEmail('');
      setMessage('');
      setSended(true);
      setTimeout(() => setSended(false), 7500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <SEO title="Kontakt - WeedWeek" />
      <Container top>
        <InnerContainer>
          <Box title="Wyślij wiadomość">
            <form onSubmit={sendMessage}>
              <EmailInput
                type="email"
                placeholder="Twój email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextInput
                placeholder="W czym mogę Ci pomóc?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Send>Wyślij wiadomość</Send>
            </form>
            {sended && <Message>Twoja wiadomość została wysłana</Message>}
          </Box>
          <Box title="Dane kontaktowe">
            <ContactInfo>
              <InnerContainer>
                <InfoText>Masz Newsa?</InfoText>
                <EmailText href="mailto:donos@weedweek.pl">
                  donos@weedweek.pl
                </EmailText>
                <InfoText>Współpraca?</InfoText>
                <EmailText href="mailto:mops@weedweek.pl">
                  mops@weedweek.pl
                </EmailText>
                <InfoText>Kontakt?</InfoText>
                <EmailText href="mailto:kontakt@weedweek.pl">
                  kontakt@weedweek.pl
                </EmailText>
              </InnerContainer>
              {/* <EmailText>Grupa na Facebooku</EmailText> */}
            </ContactInfo>
          </Box>
        </InnerContainer>
      </Container>
    </>
  );
};

export default Contact;
