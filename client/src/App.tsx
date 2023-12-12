import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { UrlDemo } from "./components/UrlDemo";
import axios from 'axios'
import { ActionType, ReContext } from "./utils/Context";
function App() {
  // const urlPattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

  const {dispatch} = useContext(ReContext)
  const [isCalled, setIsCalled] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [URL,setURL] = useState('')
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (showAnimation) {
      
  //     // setTimeout(() => {
  //     //   setIsCalled(true);
  //     //   //Fired Rocket
  //     // }, 1000);
  //     //this will fe Fetch
  //   }
  // }, [showAnimation]);

  useEffect(() => {
    if (isCalled) {
      setTimeout(() => {
        navigate("/viewer");
      }, 700);
    }
  }, [isCalled]);
  return (
    <>
      {showAnimation && (
        <div className="RiveContainer z-10">
          <UrlDemo isActive={isCalled} />
        </div>
      )}
      <main className=" md:mx-auto min-h-screen flex flex-col ">
        <Header />
        <section className="max-w-5xl mx-auto flex-grow">
          <div className="text-6xl font-sans font-bold select-none   mt-24 md:mt-32 px-3 md:px-0">
            <span className="text-[#1e293b]  ">Freeing the Web</span>.
            <br />{" "}
            <span className="bg-clip-text text-transparent bg-[linear-gradient(-60deg,_rgb(96,_165,_250),_rgb(244,_114,_182))]">
              Say Goodbye to Paywalls with Our Open Access Platform
            </span>
          </div>
          <div className="flex items-center mt-6 gap-3">
            <div className="w-fit relative z-20">
              <input
              value={URL}
              onChange={(e)=>{
                const Value = e.currentTarget.value
                setURL(()=>Value)
              }}
                type="text"
                placeholder="Enter URL Here"
                className="min-w-[700px] peer shadow-md focus:shadow-none py-1 text-[#1e293b] focus:border-transparent before:content-['hello'] border  text-xl px-2 rounded-sm outline-none "
              />
              <div className="w-0 h-1 peer-focus:peer-invalid:bg-red-600 bg-[#1e293b] peer-focus:w-full transition-all"></div>
            </div>
            <button
            
              onClick={async() => {
                setShowAnimation(true);
               const Data = await axios.get("http://localhost:3000/api?url="+URL)
              //  Save Congtent
              dispatch({
                type:ActionType.ADD,
                payload:Data.data
              })

               setIsCalled(true);
               setTimeout(()=>{
                navigate("/viewer")
               },700)
              }}
              className="bg-[#1e293b] hover:scale-105 active:scale-95 hover:bg-[#1e293b]/40 hover:text-[#1e293b]  transition-all  h-full text-white font-mono font-medium  px-2 py-1"
            >
              Let's Start
            </button>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default App;
