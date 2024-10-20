"use client"

import {db, } from "@/firebase/firebasefirestore";
import { CardData } from "@/types/types";
import { getDocs, collection } from "firebase/firestore";
import { useEffect,useState } from "react";

import {deleteBlog} from "@/firebase/firebasefirestore"
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

function Dashboard(){
    const [cards, setCard] = useState<CardData[]>([]);
    const route = useRouter();

    useEffect(() => {
        async function getData(){
            const querySnapshot = await getDocs(collection(db, "blogs"));
            const dataArray: CardData[] = [];
            querySnapshot.forEach((doc) => {
                dataArray.push(doc.data() as CardData);
        });
        setCard(dataArray);
    }
    getData();
},[route]);
return (
    <>

      <div className="overflow-x-auto">
        <Link href={"/dashboard/add"}>
          <button className="btn btn-sm m-5 btn-outline hover:btn-secondary ">
            <IoMdAdd />
            Add Blog
          </button>
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Tag</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {!cards ? (
              <Loading />
            ) : (
              cards.map(({ imageURL, title, tag, slug, firebaseID }) => (
                <tr key={title}>
                  <th>
                    <div className="flex items-center gap-3 hover:cursor-pointer"
                     onClick={() => route.push(`/blog/${slug}`)}>
                      <div
                        className="avatar "
                        onClick={() => route.push(`/blog/${slug}`)}
                      >
                        <div className="mask mask-squircle h-12 w-12">
                          {imageURL ? (
                            <Image
                              src={imageURL}
                              alt="image"
                              width={50}
                              height={50}
                            />
                          ) : null}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{title}</div>
                      </div>
                    </div>
                  </th>
                  <td>
                    <span className="badge badge-ghost badge-sm">{tag}</span>
                  </td>
                  <th>
                    <button
                      className="btn btn-error sm:btn-xs lg:btn-sm"
                      onClick={() => {
                        deleteBlog(firebaseID as string);
                        toast.success("Deleted !")
                      }}
                    >
                      Delete
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn btn-warning  sm:btn-xs lg:btn-sm"
                      onClick={() => {
                        route.push(`/dashboard/edit/${slug}`);
                      }}
                    >
                      Edit
                    </button>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;