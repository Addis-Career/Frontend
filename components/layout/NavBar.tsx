"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { FaSearch, FaStackOverflow } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchJobs } from "@/lib/features/jobSlice";
import { signOut, useSession } from "next-auth/react";
import Filter from "../feed/Filter";
import { CiFilter } from "react-icons/ci";
import { getProfileAsync } from "@/lib/features/createProfile";
import { Root } from "postcss";

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile
  );
  useEffect(() => {
    dispatch(
      fetchJobs({
        nextUrl: "",
        job_title: "",
        work_arrangement: "",
        job_type: "",
      })
    );
  }, []);
  const handleSearch = (term: string) => {
    dispatch(
      fetchJobs({
        nextUrl: "",
        job_title: term,
        work_arrangement: "",
        job_type: "",
      })
    );
  };
  const { data: session } = useSession();

  const debouncedSearch = debounce(handleSearch, 1000); // Debounce with a 300ms delay

  useEffect(() => {
    // Initial job fetch
    dispatch(
      fetchJobs({
        nextUrl: "",
        job_title: "",
        work_arrangement: "",
        job_type: "",
      })
    );
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term); // Call the debounced search function
  };
  useEffect(() => {
    const token = session?.user?.accessToken || "";
    if (token) {
      dispatch(getProfileAsync(token));
    }
  }, [session]);

  return (
    <Navbar
      maxWidth={"full"}
      className="fixed bg-white p-[0.4rem] md:pl-[5rem] md:pr-[5rem] z-20 shadow-md"
    >
      <NavbarContent
        justify="start"
        className="p-0 w-full flex items-center justify-between"
      >
        <NavbarBrand className="p-0 m-0">
          <h1
            className="hidden sm:block font-bold text-[2rem] cursor-pointer"
            onClick={() => (window.location.href = "/careers")}
          >
            AddisCareer
          </h1>
          <div className="block sm:hidden">
            <Button
              startContent={<CiFilter size={24} />}
              onClick={() => setShowFilter(!showFilter)}
            />
          </div>
        </NavbarBrand>

        <div className="flex items-center gap-4 mr-4">
          <Input
            value={searchTerm} // Controlled input
            onChange={handleChange}
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<FaSearch size={18} />}
            type="search"
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={`${userProfile.user?.first_name} ${userProfile.user?.last_name}`}
                size="md"
                src={
                  session?.user?.profile &&
                  "profile_image_uri" in session.user.profile
                    ? session.user.profile.profile_image_uri
                    : ""
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem href="/careers/profile" key="configurations">
                Profile
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>
      {showFilter && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md z-10">
          <Filter />
        </div>
      )}
    </Navbar>
  );
};

export default NavBar;
