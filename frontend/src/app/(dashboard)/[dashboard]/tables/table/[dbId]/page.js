"use client";

import "@/app/dashboard.min.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import Loading from "@/components/dashboard/Loading";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import getData from "@/app/api/table/tableData/[id]/route";
import Link from "next/link";
import Cookies from "js-cookie";
import { revalidateDataTag } from "@/app/actions";

const INITIAL_NEW_USER = {
  email: "",
  userId: "",
  dbId: "",
  role: "viewOnly",
};

export default function Table() {
  const router = useRouter();

  // getting and setting the databases
  const [posts, setPosts] = useState();
  const [db, setDb] = useState();
  const path = usePathname();
  const dbId = path.split("/")[4];
  INITIAL_NEW_USER.dbId = dbId;

  const getDb = async () => {
    try {
      const response = await getData(dbId);
      if (response) {
        const posts = response.db.posts;
        if (posts) {
          setDb(response.db);
          setPosts(posts);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // // setting and getting the user
  const [user, setUser] = useState();
  const getUser = async () => {
    try {
      const response = await fetch("/api/users/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const userData = await response.json();
        const { user } = userData;
        if (user) {
          setUser(user);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    getDb();
    // eslint-disable-next-line
  }, []);
  INITIAL_NEW_USER.userId = user?._id;

  const [newUser, setNewUser] = useState(INITIAL_NEW_USER);
  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const url = `http://localhost:8080/api/db/addNewMember`;
      const payload = { ...newUser };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("New User Added Successfully!!!");
      revalidateDataTag(db);
    } catch (err) {
      console.log(err);
    }
  }

  const redirect = () => {
    router.push(`/dashboard/tables`);
  };

  return (
    <>
      {(user && posts && (
        <div className="container-fluid">
          <h3 className="text-dark display-3 mb-4">{db?.name || "Database"}</h3>
          <Link
            href={`/dashboard/tables/table/${dbId}/users`}
            className="btn btn-primary"
          >
            <h3 className="display-6">Users</h3>
          </Link>
          <Link
            href={`/dashboard/tables/table/${dbId}/posts`}
            className="btn btn-primary mx-3"
          >
            <h3 className="display-6">Posts</h3>
          </Link>
        </div>
      )) || <Loading />}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
      {/* <Script src="/dashboard/assets/js/bs-init.js"></Script>
      <Script src="/dashboard/assets/js/theme.js"></Script> */}
    </>
  );
}
