'use client'

import { useRouter } from "next/router"
import { useEffect } from "react"




import Link from "next/link"


export default function Registerpage(){

const {data:session }=useSession()
    const router=useRouter()


 useEffect(()=>{
    if(session){
        router.push('/home')
    }
 },[session,router])

 return (<div className="">
    <div className="">
        <h2>
            welcome to mindmentor
        </h2>
        <p classname>
            let s go and started witj our stuy journey
        </p>

    </div>
    <div>
        <div>
            <h1>
                <SignUpform/>
                <p className="">
                    already have an account?{''}
                    <link href="/signup" className="">
                    signin</link>
                </p>

            </h1>
        </div>
    </div>
 </div>
 )
}