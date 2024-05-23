"use client";
import { useState, useEffect } from "react";
import ListItem from "./ListItem";

const MainContent = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(10);
  const [noPages, setNoPages] = useState(1);
  const [booksToShow, setBooksToShow] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staticData = await fetch(
          `https://openlibrary.org/people/mekBot/books/want-to-read.json`,
          { cache: "force-cache" }
        );
        const data = await staticData.json();
        const arr = data.reading_log_entries;
        const newData = arr.map((ele) => ({
          title: ele.work.title,
          author: ele.work.author_names[0],
          published: ele.work.first_publish_year,
          author_key: ele.work.author_keys[0],
          work_key: ele.work.key,
        }));

        const ratings = await Promise.all(
          newData.map(async (ele) => {
            const rating = await fetch(
              `https://openlibrary.org${ele.work_key}/ratings.json`,
              { cache: "force-cache" }
            );
            const convertrating = await rating.json();
            return convertrating.summary.average?.toFixed(2);
          })
        );

        const authorDetails = await Promise.all(
          newData.map(async (ele) => {
            const author = await fetch(
              `https://openlibrary.org/search/authors.json?q=${ele.author}`,
              { cache: "force-cache" }
            );
            const jsonAuthor = await author.json();
            return {
              birth: jsonAuthor.docs[0]?.birth_date,
              topwork: jsonAuthor.docs[0]?.top_work,
              subject: jsonAuthor.docs[0]?.top_subjects?.[0],
            };
          })
        );

        const combinedData = newData.map((book, index) => ({
          ...book,
          rating: ratings[index],
          birth: authorDetails[index]?.birth,
          topwork: authorDetails[index]?.topwork,
          subject: authorDetails[index]?.subject,
        }));

        setBookData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    calculateNoPages();
    insertBooksToShow();
  }, [pages, curPage, bookData, sortConfig]);

  const changePageNo = (num) => {
    setCurPage((prev) => {
      const newPage = prev + num;
      if (newPage >= 0 && newPage < noPages) {
        return newPage;
      }
      return prev;
    });
  };

  const insertBooksToShow = () => {
    let sortedBooks = [...bookData];
    if (sortConfig.key !== null) {
      sortedBooks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    const start = curPage * pages;
    const end = Math.min(start + pages, sortedBooks.length);
    setBooksToShow(sortedBooks.slice(start, end));
  };

  const calculateNoPages = () => {
    setNoPages(Math.ceil(bookData.length / pages));
  };

  const selectCount = (count) => {
    setPages(count);
    setCurPage(0); 
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#F6F2F0] w-full h-[90%]">
      <div className="flex flex-col rounded-tl-xl h-full w-full bg-white border-l border-l-[#8C7263] border-t border-t-[#8C7263] px-8">
        <div className="flex justify-between w-full pt-8">
          <p className="text-2xl font-semibold">Home</p>
          <div className="bg-green-800 text-white px-2 py-2 rounded-md">
            Download
          </div>
        </div>
        <div className="w-full mt-8 flex justify-between ">
          <div className="flex gap-10">
            <div className="py-1 border-b-orange-400 border-b-4">All Books</div>
            <div className="py-1">Popular</div>
            <div className="py-1">Latest</div>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <div
              onClick={() => {
                selectCount(10);
              }}
              className={
                pages === 10
                  ? "bg-[#8C7263] rounded-md px-4 py-1 text-white cursor-pointer"
                  : "bg-[#F6F2F0] rounded-md px-4 py-1 cursor-pointer"
              }
            >
              10
            </div>
            <div
              onClick={() => {
                selectCount(20);
              }}
              className={
                pages === 20
                  ? "bg-[#8C7263] rounded-md px-4 py-1 text-white cursor-pointer"
                  : "bg-[#F6F2F0] rounded-md px-4 py-1 cursor-pointer"
              }
            >
              20
            </div>
            <div
              onClick={() => {
                selectCount(50);
              }}
              className={
                pages === 50
                  ? "bg-[#8C7263] rounded-md px-4 py-1 text-white cursor-pointer"
                  : "bg-[#F6F2F0] rounded-md px-4 py-1 cursor-pointer"
              }
            >
              50
            </div>
            <div
              onClick={() => {
                selectCount(100);
              }}
              className={
                pages === 100
                  ? "bg-[#8C7263] rounded-md px-4 py-1 text-white cursor-pointer"
                  : "bg-[#F6F2F0] rounded-md px-4 py-1 cursor-pointer"
              }
            >
              100
            </div>
          </div>
          <div className="w-fit">
            <input
              className="w-[250px] outline-none"
              placeholder="type what you are looking for.."
              type="text"
            />
          </div>
        </div>
        <div className="">
          <hr />
        </div>
        <div className="w-full h-full border rounded-lg my-2 border-[rgb(140,114,99)] relative overflow-x-hidden">
          <div className="grid grid-cols-11 border-b border-b-[#8C7263] absolute w-full">
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 cursor-pointer" onClick={() => requestSort("sno")}>S.No.</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 col-span-2 cursor-pointer" onClick={() => requestSort("title")}>Title</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 cursor-pointer" onClick={() => requestSort("author")}>Author</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 col-span-2 cursor-pointer" onClick={() => requestSort("subject")}>Subject</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 cursor-pointer" onClick={() => requestSort("published")}>Published</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 cursor-pointer" onClick={() => requestSort("birth")}>Birth</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 cursor-pointer" onClick={() => requestSort("rating")}>Ratings</div>
            <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 col-span-2 cursor-pointer" onClick={() => requestSort("topwork")}>Topwork</div>
          </div>
          <div className="w-full">
          <div className="bg-[#F6F2F0] py-2 text-[#8C7263] px-4 cursor-pointer ">S.No.</div>
          </div>
          <div className="w-full h-full overflow-y-scroll scrollbar-hide">
            {booksToShow?.map((ele, index) => (
              <ListItem
                key={index}
                sno={curPage * pages + index + 1}
                title={ele.title}
                author={ele.author}
                published={ele.published}
                rating={ele.rating}
                birth={ele.birth}
                topwork={ele.topwork}
                subject={ele.subject}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between w-1/6 m-auto mb-2">
          <div
            onClick={() => {
              changePageNo(-1);
            }}
            className="text-[#8C7263] px-4 py-1 rounded-md bg-[#F6F2F0] cursor-pointer"
          >
            Prev
          </div>
          <div className="bg-[#8C7263] px-4 py-1 rounded-md text-white">{curPage + 1}</div>
          <div
            onClick={() => {
              changePageNo(1);
            }}
            className="text-[#8C7263] px-4 py-1 rounded-md bg-[#F6F2F0] cursor-pointer"
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
