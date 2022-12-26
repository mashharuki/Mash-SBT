import { React } from 'react';
import { Box, Button, Flex, Image, Link } from '@chakra-ui/react';
import Discord from './assets/social-media-icons/discordLogo.png';
import Twitter from './assets/social-media-icons/twitterLogo.png';
import { ethers } from 'ethers';
import cooperatorNFT from './CooperatorNFT.json';

const cooperatorNFTAddress = '0x2E5598854Ed502B67480895E5e43b4E359926a65';
const KEY_User1 = process.env.REACT_APP_KEY_USER1;
const KEY_User2 = process.env.REACT_APP_KEY_USER2;
const KEY_User3 = process.env.REACT_APP_KEY_USER3;
const KEY_User4 = process.env.REACT_APP_KEY_USER4;
const KEY_User5 = process.env.REACT_APP_KEY_USER5;
const KEY_User6 = process.env.REACT_APP_KEY_USER6;
const KEY_User7 = process.env.REACT_APP_KEY_USER7;
const KEY_User8 = process.env.REACT_APP_KEY_USER8;

const NavBar = ({ accounts, setAccounts, isMinted, setIsMinted }) => {
  const isConnected = Boolean(accounts[0]);
  const walletsOfCooperator = [
    KEY_User1,
    KEY_User2,
    KEY_User3,
    KEY_User4,
    KEY_User5,
    KEY_User6,
    KEY_User7,
    KEY_User8,
  ];

  async function connectAccount() {
    // console.log(walletsOfCooperator);
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      // 登録されたアドレス以外ウォレット接続できない
      walletsOfCooperator.forEach((wallet) => {
        if (accounts[0].toUpperCase() === wallet.toUpperCase()) {
          setAccounts(accounts);
        }
      });

      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          cooperatorNFTAddress,
          cooperatorNFT.abi,
          signer
        );
        try {
          console.log('login address : ' + accounts[0]);

          // ユーザーがnftを所有しているか確認
          const balance = await contract.balanceOf(accounts[0]);
          console.log('response: ', balance);
          console.log(balance.toString());
          // blance === 1 でnft所有
          // 所有している場合はmintボタンを押せないようにする
          if (balance.toString() !== '0') {
            console.log('already minted!');
            setIsMinted(true);
          }
        } catch (err) {
          console.log('error: ', err);
        }
      }
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      <Flex justify="space-around" width="40%" padding="0 75px"></Flex>
      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Link href="https://twitter.com/Shape_ProjectJa">
          <Image src={Twitter} boxSize="42px" margin="0 10px" />
        </Link>
        <Link href="https://discord.gg/AYPU9Wwh">
          <Image src={Discord} boxSize="42px" margin="0 10px" />
        </Link>
        {isConnected ? (
          <Box margin="0 1px" color="white" fontWeight="bold">
            Connected
          </Box>
        ) : (
          <Button
            className="cta-button connect-wallet-button"
            onClick={connectAccount}
          >
            Connect
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
