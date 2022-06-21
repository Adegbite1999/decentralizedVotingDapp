import React from "react";
import logo from "../../../public/images.svg";
import Image from "next/image";
function Details() {
  return (
    <section>
      <div className="flex justify-center">
        <div>
          <h4 className="text-center text-[#80AB9E]">Achievements</h4>
          <p className="text-center text-[#F5FBF2] font-bold text-2xl my-4">
            Full Decentralised Voting System
          </p>
          <div className="flex items-center space-x-12">
            <div>
              <span className="block text-[#00E3A5] font-bold text-center">
                1M+
              </span>
              <span className="block text-[#9E9E9E]">Happy users</span>
            </div>
            <div>
              <span className="block text-[#00E3A5] font-bold text-center">
                250k
              </span>
              <span className="block text-[#9E9E9E]">Community Assets</span>
            </div>
            <div>
              <span className="block text-[#00E3A5] font-bold text-center">
                20K
              </span>
              <span className="block text-[#9E9E9E]">Building community</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Image src={logo} alt="" />
      </div>
    </section>
  );
}

export default Details;
