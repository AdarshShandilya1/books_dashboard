"use client"
import { useState } from "react";
import ListItem from "./ListItem";

const MainContent = async() => {
  

  return (
    <div className="bg-[#F6F2F0] w-full h-[90%]">
      <div className="flex flex-col rounded-tl-xl h-full w-full bg-white border-l border-l-[#8C7263] border-t border-t-[#8C7263] px-8">
        <div className="flex justify-between w-full pt-8">
          <p className="text-2xl font-semibold">Home</p>
          <div className="bg-green-700 text-white px-2 py-2 rounded-md">
            Download
          </div>
        </div>
        <div className="w-full mt-8 flex justify-between ">
          <div className="flex gap-10">
            <div className=" py-1  border-b-orange-400  border-b-4">
              All Books
            </div>
            <div className=" py-1">Popular</div>
            <div className=" py-1">Latest</div>
          </div>
          <div className="w-fit">
            <input
              className="w-[250px] outline-none "
              placeholder="type what you are looking for.."
              type="text"
            />
          </div>
        </div>
        <div className="">
          <hr />
        </div>
        <div className="w-full h-full border rounded-lg my-8 border-[rgb(140,114,99)] relative overflow-x-hidden">
          <div className="grid grid-cols-8 border-b border-b-[#8C7263] absolute w-full">
          <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 ">S.No.</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 ">Title</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 ">Author</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4">Subject</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4">
              Published
            </div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4">
              Birth Date
            </div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4">Ratings</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4">Topwork</div>
          </div>
          <div className="w-full h-full overflow-y-scroll scrollbar-hide">
            <div className=" py-2 px-4 ">blank div</div>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
