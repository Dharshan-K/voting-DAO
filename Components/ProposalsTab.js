/** @format */

import { ethers, Contract } from "ethers";
import Link from "next/link";
import { useState, useEffect } from "react";
import { contractAddress, abi } from "../constants";
import ProposalView from "./ProposalView";

// import CreateProposalTab from "./CreateProposal";

export default function ProposalTitle() {
  const [proposals, setProposals] = useState([]);
  let proposalArray = [];
  const proposalTitle = async () => {
    const { ethereum } = window;
    let chainId = parseInt(await ethereum.request({ method: "eth_chainId" }));
    const votingAddress =
      chainId in contractAddress ? contractAddress[chainId][0] : null;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const votingContract = new Contract(votingAddress, abi, signer);
      const count1 = await votingContract.getProposalCount();
      for (let i = 1; i <= count1; i++) {
        const proposalData = await votingContract.proposalData(i);
        proposalArray.push(proposalData);
        console.log(proposalData.proposalId.toString());
      }
      setProposals(proposalArray);

      console.log(parseInt(proposalArray[0].deadline));
    }
  };
  const excecute = async (index) => {
    console.log("excecution started");
    const { ethereum } = window;
    let chainId = parseInt(await ethereum.request({ method: "eth_chainId" }));
    const votingAddress =
      chainId in contractAddress ? contractAddress[chainId][0] : null;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const votingContract = new Contract(votingAddress, abi, signer);

      const exceutePoll = await votingContract.excecution(index + 1);
    }
    console.log("excecution ended");
  };

  return (
    <div>
      <button onClick={proposalTitle}>Get Proposals</button>
      <button>
        <Link href="/proposalForm">Create Proposal</Link>
      </button>
      {proposals.map((p, index) => (
        <div key={index}>
          <ul>
            {" "}
            <li>{p.proposalTitle}</li>
            <li>{p.yesVotes.toString()}</li>
            <li>{p.noVotes.toString()}</li>
            <li>{p.excecuted.toString()}</li>
            <li>
              {parseInt(p.yesVotes.toString()) >
              parseInt(p.noVotes.toString()) ? (
                <p>excecuted</p>
              ) : (
                <p>not excecuted</p>
              )}
            </li>
            <button>
              <a href={`/proposals/${encodeURIComponent(index + 1)}`}>Vote</a>
            </button>
            <button onClick={() => excecute(index + 1)}>
              excecute proposal
            </button>
          </ul>
          {/* <div>
            <ProposalView proposalIndex={index + 1} />
          </div> */}
        </div>
      ))}
      <div></div>
    </div>
  );
}
