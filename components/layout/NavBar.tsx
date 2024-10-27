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
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { fetchJobs } from "@/lib/features/jobSlice";

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
  const dispatch = useDispatch<AppDispatch>();

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
          <h1 className="hidden sm:block font-bold text-[2rem]">AddisCareer</h1>
        </NavbarBrand>

        <div className="flex items-center gap-4 mr-4">
          <Input
            value={searchTerm} // Controlled input
            onChange={handleChange} // Handle input change
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
                name="Jason Hughes"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
