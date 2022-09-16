/** @format */

import { useRouter } from "next/router";
import ProposalView from "../../Components/ProposalView";
import { contractAddress, abi } from "../../constants";
import { ethers, Contract } from "ethers";
import { useState } from "react";

export default function ProposalDisplay() {
  const router = useRouter();
  const queryId = parseInt(router.query.id);
  // console.log(queryId);
  let voteChoice;
  const eventHandler = async (event) => {
    event.preventDefault();
    // const vote = event.target.id;
    // const vote1 = event.target.id;
    // console.log(vote, vote1);
    const { name, value } = event.target;
    console.log("voting started");
    // console.log(name, value);
    // console.log("Initial" + " " + voteChoice);
    if (value == "yes") {
      console.log("it is yes");
      voteChoice = 0;
    } else if (value == "no") {
      console.log("it is no");
      voteChoice = 1;
    }

    console.log("final" + " " + voteChoice);
    await voteProcess();
    console.log("polling completed");
  };

  const voteProcess = async () => {
    const { ethereum } = window;
    console.log("excecution started");
    let chainId = parseInt(await ethereum.request({ method: "eth_chainId" }));
    const votingAddress =
      chainId in contractAddress ? contractAddress[chainId][0] : null;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const votingContract = new Contract(votingAddress, abi, signer);
      console.log("Inside vote process" + " " + voteChoice);
      const pollVote = await votingContract.voteProposal(queryId, voteChoice);
    }
    console.log("excecution finished");
  };
  return (
    <div>
      <div>
        <ProposalView proposalIndex={queryId} />
      </div>
      <div>
        <form method="post" onChange={eventHandler}>
          <label>yes</label>
          <input type="radio" id="yes" name="vote" value="yes"></input>
          <br></br>
          <label>no</label>
          <input type="radio" id="no" name="vote" value="no"></input>
          <br></br>
        </form>
        <submit type="submit" value="submit"></submit>
      </div>
    </div>
  );
}
