/** @format */

import { useEffect } from "react";
import { abi, contractAddress } from "../constants";
import { ethers } from "ethers";
import ProposalView from "../Components/ProposalView";
export default function proposalForm() {
  const createProposals = async (event) => {
    try {
      event.preventDefault();
      const title = event.target.title.value;
      const description = event.target.description.value;

      const { ethereum } = window;
      let chainId = parseInt(await ethereum.request({ method: "eth_chainId" }));
      const votingAddress =
        chainId in contractAddress ? contractAddress[chainId][0] : null;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const votingContract = new ethers.Contract(votingAddress, abi, signer);
        const proposalForm = await votingContract.createProposal(
          title,
          description
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const createProposal = async () => {
  //   const detail = await proposalDetail();
  //   console.log(detail + "-----------");
  // };

  //   useEffect(() => {
  //     createProposal();
  //   }, []);
  return (
    <div>
      <div>
        <form method="post" onSubmit={createProposals}>
          <label>Proposal Title: </label>
          <input type="text" id="title"></input>
          <br></br>
          <label>Proposal Description: </label>
          <input type="text" id="description"></input>
          <br></br>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  );
}
