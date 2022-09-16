/** @format */

import { useEffect, useState } from "react";
import { contractAddress, abi } from "../constants";
import { ethers, Contract } from "ethers";

export default function ProposalView({ proposalIndex }) {
  const [proposals, setProposals] = useState([]);
  const index1 = async () => {
    const { ethereum } = window;
    console.log("started----");
    let chainId = parseInt(await ethereum.request({ method: "eth_chainId" }));
    const votingAddress =
      chainId in contractAddress ? contractAddress[chainId][0] : null;
    console.log(votingAddress);
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const votingContract = new Contract(votingAddress, abi, signer);
      const proposalDetail = await votingContract.getproposal(proposalIndex);

     
      setProposals(proposalDetail);
    }
    // console.log(proposals.yesVotes.toString());
    console.log(proposalIndex + "=====");
    // console.log(proposals.yesVotes.toString());
  };

  // useEffect(index1(), []);
  return (
    <div>
      <button onClick={index1}>click</button>
      <div>
        <p>Title :{proposals.proposalTitle}</p>
        <p>Description :{proposals.proposalDescription}</p>
        {/* <p>{proposals.yesVotes.toString()}</p>
        <p>{proposals.noVotes.toString()}</p> */}
      </div>
    </div>
  );
}
