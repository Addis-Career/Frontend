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
  NavbarMenuItem,
  NavbarMenu,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const menuItems = ["Home", "Jobs", "About", "Contact"];
  const [filterVisible, setFilterVisible] = useState(false); // State to toggle filter visibility

  const toggleFilter = () => {
    setFilterVisible(!filterVisible); // Toggle filter visibility
  };

  return (
    <Navbar
      maxWidth={"full"}
      className="fixed bg-white p-[0.4rem] md:pl-[5rem] md:pr-[5rem] z-[9999] shadow-md"
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

          {/* Filter Button */}
          <Button onClick={toggleFilter} className="text-sm">
            Filter Jobs
          </Button>
        </div>
      </NavbarContent>

      {/* Filter Menu */}
      {filterVisible && (
        <div className="absolute z-50 bg-white shadow-md p-4 w-1/4 rounded-lg">
          <h4 className="font-bold text-lg">Filter Job Posts</h4>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Job Title</label>
            <Input placeholder="Enter job title" />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Location</label>
            <Input placeholder="Enter location" />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Experience Level</label>
            <div>
              <Checkbox defaultValue={["Any"]}>
                <Checkbox value="Any">Any</Checkbox>
                <Checkbox value="Junior">Junior</Checkbox>
                <Checkbox value="Mid">Mid</Checkbox>
                <Checkbox value="Senior">Senior</Checkbox>
              </Checkbox>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Employment Type</label>
            <div>
              <Checkbox defaultValue={["Full-Time"]}>
                <Checkbox value="Full-Time">Full-Time</Checkbox>
                <Checkbox value="Part-Time">Part-Time</Checkbox>
                <Checkbox value="Contract">Contract</Checkbox>
              </Checkbox>
            </div>
          </div>

          <Button className="mt-4" color="primary">
            Apply Filters
          </Button>
        </div>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
