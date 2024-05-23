import React from "react";

const ListItem = (props) => {
  return (
    <>
      <div className="grid grid-cols-11 ">
        <div className=" py-4 px-4 border-b-[#8C7263] border-b-[1px] ">
          {props.sno}.
        </div>
        <div className=" py-4 px-4 border-b-[#8C7263] border-b-[1px] col-span-2">
          {props.title}
        </div>
        <div className=" py-4 px-4 border-b-[#8C7263] border-b-[1px] ">
          {props.author}
        </div>
        <div className=" py-4 px-4 border-b-[#8C7263] border-b-[1px] col-span-2">
          {props.subject}
        </div>
        <div className=" py-4 px-4 border-b-[#8C7263] border-b-[1px] ">
          {props.published}
        </div>
        <div className=" py-4 px-4 border-b-[#8C7263] border-b-[1px] ">
          {props.birth?props.birth:"Nil"}
        </div>
        <div className=" py-4 px-4 border-b-[#8C7263] border-b-[1px] ">
          {props.rating?props.rating:"Nil"}
        </div>
        <div className=" py-4 px-4 border-b-[#8C7263] border-b-[1px] col-span-2">
          {props.topwork}
        </div>
      </div>
    </>
  );
};

export default ListItem;
