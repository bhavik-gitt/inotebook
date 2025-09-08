import React,{useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

export default function About() {
  const a = useContext(noteContext); // Using useContext hook to access the context values
  useEffect(()=>{
    a.update();
    // esLint-disable-next-Line
  })
  return (
    <>
    This is About page {a.state.name}
    </>
  )
}
