/** @format */

import { ConnectButton } from "@web3uikit/web3";
import Head from "next/head";
import Image from "next/image";
import ConnectWallet from "../Components/ConnectWallet";
import ProposalTitle from "../Components/ProposalsTab";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <ConnectWallet />
      <ProposalTitle />
    </div>
  );
}
