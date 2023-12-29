import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {ethers} from 'ethers'
import { money } from '../assets'
import { CustomButton,FormField, Loader } from '../components'
import {checkIfImage} from "../utils";
import {useStateContext} from "../context"
const CreateCampaign = () => {
  const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState( false);
  const {createCampaign,user,address}=useStateContext()
  const [form,setForm]=useState({
    name:'',
    title:'',
    description:'',
    target:'',
    deadline:'',
    image:'',
  })

  const handleFormFieldChange=(fieldName,e)=>{
    setForm({...form,[fieldName]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(ethers.utils.parseUnits(form.target,18))
    console.log(form);
    checkIfImage(form.image,async(exists)=>{
      if(exists){
        setIsLoading(true)
        await createCampaign({...form,target: ethers.utils.parseUnits(form.target,18)})
        setIsLoading(false)
      }
      else{
        alert('Provide a valid image URL ')
        setForm({...form,image:''})
      }
    })
  }
  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader/>}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white '>
          Start a Campaign
        </h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField labelName="Your Name"
            inputType="text"
            value={form.name}
            placeholder="GIRISH KUMAR"
            handleChange={(e)=>handleFormFieldChange('name',e)} />
          <FormField labelName="Title of the campaign"
            inputType="text"
            value={form.title}
            placeholder="For Devoloping Project"
            handleChange={(e)=>handleFormFieldChange('title',e)} />
          </div>
          <FormField labelName="Description"
            isTextArea
            value={form.description}
            placeholder="Write Your Story"
            handleChange={(e)=>handleFormFieldChange('description',e)} />
          <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
            <img src={money} alt="MOney" className='w-[40px] object-conatin h-[40px]' />
            <h4 className='font-Epilogue font-bold text-white text-[25px] ml-[20px]'>You will get 100% of the raised amount </h4>
          </div>
          <div className='flex flex-wrap gap-[40px]'>
          <FormField labelName="Goal *"
            inputType="number"
            value={form.target}
            placeholder="ETH 0.50"
            handleChange={(e)=>handleFormFieldChange('target',e)} />

          <FormField labelName="End Date"
            inputType="date"
            value={form.deadline}
            placeholder="For Devoloping Project"
            handleChange={(e)=>handleFormFieldChange('deadline',e)} />
            </div>

            <FormField labelName="Campaign Image"
            inputType="url"
            value={form.image}
            placeholder="Place image url"
            handleChange={(e)=>handleFormFieldChange('image',e)} />

            
            
            <div className='flex justify-center items-center mt-[48px]'>
              {user.token?
              <CustomButton btnType="submit"
              title="Create a new Campaign"
              styles="bg-[#1dc071]"/>:
              <CustomButton 
          btnType="button"
          title={user.token ?(address ? 'Create a campaign' : 'Connect'):('Login/Signup')}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(user.token){
              if(address) navigate('create-campaign')
              else connect()
            }
            else{
              navigate('/login')
            }
          }}
        />}
            
            </div>
          
          
      </form>
    </div>
  )
}

export default CreateCampaign
