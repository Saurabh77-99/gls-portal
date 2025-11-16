import React, { useState } from 'react'
import logo from '../../assets/Logo.svg'
import TextField from '../ui/TextField'
import Toggle from '../ui/Toggle'
import Button from '../ui/Button'
import SearchModal from '../ui/SearchModal'
import { useRouter, usePathname } from 'next/navigation'
import { useStudentStore } from '@/store/store'

const toggleOptions = [
    { name: "Flipbook", value: "flipbook" },
    { name: "Grid View", value: "grid" },
  ];

const Header = () => {

    const [selectedvalue,setSelectedValue] = useState(toggleOptions[0]?.value)
    const [showSearchModal,setShowSearchModal] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const {students,isGridViewSelected,toggleGridView} = useStudentStore()

    const handleToggleChange = (value: string) =>{
        // setSelectedValue(value)
        if(value == 'grid'){
            toggleGridView(true)
            router.push(`/dashboard`)
        }else{
            toggleGridView(false)
            router.push(`/dashboard/student/${students[0]._id}`)
        }
    }

     
    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/';
    };

  return (
    <div className='fixed top-0 z-100 w-full h-[73px] px-8 py-3 flex justify-between bg-[#F7F2F2] border-b-[1px] border-primary-alpha-10'>
        <div className="flex justify-center items-center gap-8">
            <div className="">
                GLS BTECH
            </div>
            <div className="">
                <TextField placeholder='Search student' className='bg-neutral-100' onClick={()=> setShowSearchModal(true)}/>
            </div>
        </div>

        <div className="flex justify-center items-center gap-8">
            <div className="">
                { pathname !== "/dashboard/search" &&<Toggle
                options={toggleOptions}
                onToggle={(value)=>handleToggleChange(value)}
                />}
            </div>
            <div className="">
                <Button> 
                    Logout
                </Button>
            </div>
        </div>

        {
            showSearchModal && <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)}/>
        }
    </div>
  )
}

export default Header