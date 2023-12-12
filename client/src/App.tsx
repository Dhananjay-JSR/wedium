import { useEffect, useState } from "react";
import Rive, { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import React from "react";
function Header() {
  return (
    <nav className=" py-2  border-b px-3 md:px-0 ">
      <div className="max-w-5xl flex justify-between mx-auto">
        <div className="font-Silkscreen select-none text-2xl">WEDIUM</div>
        <a
          href="https://www.buymeacoffee.com/dhananjayjsr"
          target="_blank"
          className="flex items-center gap-2 select-none rounded-md border-2 font-medium border-transparent hover:border-[#1e293b] px-2 bg-[#1e293b] text-white hover:bg-white hover:text-[#1e293b] transition-all hover:cursor-pointer"
        >
          Buy me Coffee
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cup-hot"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2.01 2.01 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5M2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175Z"
            />
            <path d="m4.4.8-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 3.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 6.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4.077 4.077 0 0 0-.204.31 2.337 2.337 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.198 3.198 0 0 1-.202.388 5.385 5.385 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 9.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8" />
          </svg>
        </a>
      </div>
    </nav>
  );
}

export const UrlDemo = ({ isActive }: { isActive: boolean }) => {
  const STATE_MACHINE = "State Machine ";
  const SWITCh = "Trigger 1";
  const { rive, RiveComponent } = useRive({
    src: "rocket_launch_refresh.riv",
    autoplay: true,
    animations: "All",
    stateMachines: STATE_MACHINE,
  });

  const STATE = useStateMachineInput(rive, STATE_MACHINE, SWITCh);
  React.useEffect(() => {
    if (isActive == true) {
      if (rive && STATE) {
        STATE?.fire();
      }
    }
  }, [isActive]);

  return (
    <>
      <RiveComponent />
    </>
  );
};

function App() {
  const [isCalled, setIsCalled] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    if (showAnimation) {
      setTimeout(() => {
        setIsCalled(true);
      }, 1000);
      //this will fe Fetch
    }
  }, [showAnimation]);
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
                type="text"
                placeholder="Enter URL Here"
                className=" min-w-[700px] peer shadow-md focus:shadow-none py-1 text-[#1e293b] focus:border-transparent before:content-['hello'] border  text-xl px-2 rounded-sm outline-none "
              />
              <div className="w-0 h-1 bg-[#1e293b] peer-focus:w-full transition-all"></div>
            </div>
            <button
              onClick={() => {
                setShowAnimation(true);
              }}
              className="bg-[#1e293b] hover:scale-105 active:scale-95 hover:bg-[#1e293b]/40 hover:text-[#1e293b]  transition-all  h-full text-white font-mono font-medium  px-2 py-1"
            >
              Let's Start
            </button>
          </div>
        </section>

        <footer className="text-center py-2 border-t font-serif font-semibold text-[#1e293b]">
          Crafted By Dhananjay Senday
        </footer>
      </main>
    </>
  );
}

export default App;
