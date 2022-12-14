import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const contract_address = "0x5C54835417ad22018de4A73C13ac4470573C52f1";
  const { contract } = useContract(contract_address);

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );



  const connect = useMetamask();
  const address = useAddress();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.desc,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log("Contract call Success!");
    } catch (e) {
      console.log("Contract call error!");
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
