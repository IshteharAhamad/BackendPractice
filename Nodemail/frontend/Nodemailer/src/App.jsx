import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // const baseurl="http://localhost:8000/api/v1";
  const sendEmail = async () => {
    let senddata = {
      email: email||'',
      subject: subject||'',
      message: message||'',
    };
    
    console.log(senddata);
  
    try {
      const response = await axios.post("/api/v1/sendmail", senddata, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });  
      if (response.ok) {
        console.log(response);
        window.alert("Email sent successfully!");
      } 
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  

  return (
    <>
    <div class="w-full max-w-xs flex justify-center items-center">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3
       text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
       id="email" type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Subject
      </label>
      <input class="shadow appearance-none border  rounded w-full py-2
       px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
       id="sub" type="text" placeholder="subject..." onChange={(e)=>setSubject(e.target.value)}/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2">
      message
      </label>
      <input class="shadow appearance-none border rounded w-full py-2
       px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
       id="message" type="text" placeholder="message..." onChange={(e)=>setMessage(e.target.value)}/>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 
      rounded focus:outline-none focus:shadow-outline" type="button"
      onClick={()=>sendEmail()}>
        Sent mail
      </button>
    </div>
  </form>
</div>
    </>
  )
}

export default App
