import React from 'react';
import { useState,useEffect } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

const Profile = () => {
  const [isLoading,setIsLoading]=useState(false);
  const [campaigns,setCampaigns]=useState([]);
  const {address,contract,getUserCampaigns}=useStateContext();
  const fetchCampaign=async()=>{
    setIsLoading(true)
    const data= await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false)
  }
  useEffect(()=>{
    if(contract) fetchCampaign();
  },[address,contract])
  return (
    <DisplayCampaigns title="My Campaigns" isLoading={isLoading} campaigns={campaigns}/>
  )
}

export default Profile
