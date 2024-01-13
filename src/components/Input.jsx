import React ,{useState}from 'react'
import { IoMdAttach } from "react-icons/io";
import { BiSolidImageAdd } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { Timestamp, arrayUnion, serverTimestamp, updateDoc } from 'firebase/firestore';
 import {v4 as uuid} from 'uuid'
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc } from 'firebase/firestore';
import { db } from '../firebase';


import { clearChat } from '../store/chatSlice';
function Input() {
  const [text,setText] = useState("")
  const [img,setImg] = useState(null)
  const selector = useSelector((state)=>state.auth.currentUser)
  const chatselector = useSelector((state)=>state.chat)

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed',
        (snapshot) => { },
        (error) => { },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", chatselector.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: selector.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      if (text) {
        await updateDoc(doc(db, "chats", chatselector.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: selector.uid,
            date: Timestamp.now(),
          }),
        });
      }
    }

    await updateDoc(doc(db, "userChats", selector.uid), {
      [chatselector.chatId + ".lastMessage"]: {
        text,
      },
      [chatselector.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", chatselector.user.uid), {
      [chatselector.chatId + ".lastMessage"]: {
        text,
      },
      [chatselector.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }

  return (
    <div className='h-[50px] bg-white flex justify-between p-[10px]'>
        <input onChange={e=>setText(e.target.value)} value={text} type="text" placeholder='Enter your message....' className='w-full outline-none border-none text-[#2f2d52] text-[18px] placeholder:text-gray-400' />
        <div className='flex items-center gap-[10px]'>
            <IoMdAttach className='h-[30px] w-[30px] cursor-pointer text-gray-500'/>
            <input type="file" onChange={e=>setImg(e.target.files[0])} className='hidden w-full outline-none border-none text-[#2f2d52] text-[18px]' id='file'/>
            <label htmlFor="file">
               < BiSolidImageAdd className='h-[30px] w-[30px] cursor-pointer text-gray-500' /> 
            </label>
            <button onClick={handleSend} className='border-none py-[10px] px-[15px] text-white bg-[#8da4f1]'>Send</button>
        </div>
    </div>
  )
  }

export default Input