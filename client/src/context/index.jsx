import React,{useContext,createContext, useEffect,useState} from 'react'
import {useAddress,useContract,useMetamask,useContractWrite,useContractRead} from "@thirdweb-dev/react";
import {ethers} from "ethers"
import { useNavigate } from 'react-router-dom';

const StateContext = createContext();
export const StateContextProvider = ({children}) => {
    const navigate=useNavigate();
    const [user, setUser] = useState(
        {email: "",name: "",
        pic:"",
        token: ""
        ,_id: ""}
        );
    const {contract}=useContract('0x65c49e9ac80dcC0cf934487db71d0EDbef2014fD');
    const {mutateAsync:createCampaign}=useContractWrite(contract,'createCampaign');
    // const {mutateAsync:donateToCampaign}=useContractWrite(contract,'donateToCampaign');
    // const {mutateAsync:withdrawFromCampaign}=useContractWrite(contract,'withdrawFromCampaign');
    const {data:campaignsData}=useContractRead(contract,"getCampaigns");
    
    
    const address=useAddress()
    const connect=useMetamask();

    const ENDPOINT="http://127.0.0.1:5000";
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
          setUser(userInfo);
        } 
        // else {
        //   navigate("/login");
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[navigate]);

    const publishCampaign=async(form)=>{
        try{
        const data=await createCampaign({args:[
            address,
            form.title,
            form.description,
            form.target,
            new Date(form.deadline).getTime(),
            form.image
        ]})
        console.log(data)
    }
    catch(error){
        console.log("Call Fail",error);
    }
    }

    const getCampaigns=async()=>{
        const campaigns=await contract.call("getCampaigns")

        const parsedCampaigns=campaigns.map((campaign,i)=>({
            owner:campaign.owner,
            title:campaign.title,
            description:campaign.description,
            target:ethers.utils.formatEther(campaign.target.toString()),
            deadline:campaign.deadline.toNumber(),
            amountCollected:ethers.utils.formatEther(campaign.amountCollected.toString()),
            image:campaign.image,
            pId:i
        }))
        
        const parsedCampaignsall = parsedCampaigns.filter(checkDeadline);
        function checkDeadline(campaign){
            const difference = new Date(campaign.deadline).getTime() - Date.now();
            const remainingDays = difference / (1000 * 3600 * 24);
  
            return remainingDays.toFixed(0)>0;
        }
        return parsedCampaignsall
    }

    const getUserCampaigns=async()=>{
        const allCampaigns=await getCampaigns();
        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donateTOCampaign', [pId], { value: ethers.utils.parseEther(amount)});
    
        return data;
      }

    const getDonations=async(pId)=>{
        const donations=await contract.call('getDonators',[pId]);
        const numberOfDonations=donations[0].length;
        const parsedDonations=[]

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator:donations[0],
                donation:ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations
    }

    return(
        <StateContext.Provider value={{
            address,
            connect,
            contract,
            createCampaign:publishCampaign,
            getCampaigns,getUserCampaigns,
            donate,getDonations,ENDPOINT,user,setUser
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext=()=>{
    return useContext(StateContext);
}


