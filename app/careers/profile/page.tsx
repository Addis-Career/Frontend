"use client";
import { MultiValue } from "react-select";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import {
  NextUIProvider,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Radio,
  RadioGroup,
  Button,
  Progress,
  Card,
  Textarea,
} from "@nextui-org/react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  FaGlobe,
  FaPhone,
  FaCity,
  FaImage,
  FaBriefcase,
  FaFileAlt,
} from "react-icons/fa";
import { AppDispatch, RootState } from "@/lib/store";
import {
  createProfileAsync,
  getProfileAsync,
} from "@/lib/features/createProfile";
import { useSession } from "next-auth/react";

interface TechOption {
  value: string;
  label: string;
}

export default function ProfileForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.profile
  );

  const [formData, setFormData] = useState<FormData>(new FormData());
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile
  );

  useEffect(() => {}, []);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    const updatedFormData = new FormData();
    formData.forEach((value, key) => {
      updatedFormData.append(key, value);
    });

    if (files?.length) {
      updatedFormData.set(name, files[0]);
    } else {
      updatedFormData.set(name, value);
    }

    setFormData(updatedFormData);
  };
  useEffect(() => {
    if (
      !userProfile.profile_does_not_exist &&
      userProfile.prefered_tech_stacks &&
      userProfile.prefered_tech_stacks.length > 0
    ) {
      const payload = [...userProfile.prefered_tech_stacks];
      handleSelectChange(payload.map((tech) => ({ value: tech, label: tech })));
    }
  }, [userProfile]);
  const handleSelectChange = (selectedOptions: MultiValue<TechOption>) => {
    const updatedFormData = new FormData();
    formData.forEach((value, key) => {
      updatedFormData.append(key, value);
    });
    if (selectedOptions) {
      updatedFormData.set(
        "prefered_tech_stacks",
        JSON.stringify(selectedOptions.map((option) => option.value))
      );
    } else {
      updatedFormData.delete("prefered_tech_stacks");
    }
    setFormData(updatedFormData);
  };

  const handleDropdownChange = (key: string) => {
    const updatedFormData = new FormData();
    formData.forEach((value, key) => {
      updatedFormData.append(key, value);
    });
    updatedFormData.set("country", key);
    setSelectedCountry(key);
    setFormData(updatedFormData);
  };

  const handleRadioChange = (name: string, value: string) => {
    const updatedFormData = new FormData();
    formData.forEach((value, key) => {
      updatedFormData.append(key, value);
    });
    updatedFormData.set(name, value);
    setFormData(updatedFormData);
  };
  const { data: session } = useSession();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = session?.user?.accessToken || "";
    if (userProfile.profile_does_not_exist) {
      dispatch(createProfileAsync({ formData, token, isCreate: true }));
      if (success) {
        toast.success("Profile created successfully!");
      } else if (error) {
        toast.error("Failed to create profile. Please try again.");
      }
    } else {
      dispatch(createProfileAsync({ formData, token, isCreate: false }));
      if (success) {
        toast.success("Profile updated successfully!");
      } else if (error) {
        toast.error("Failed to update profile. Please try again.");
      }
    }
  };

  const techOptions: TechOption[] = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "golang", label: "Go" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "sass", label: "SASS" },
    { value: "less", label: "LESS" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "spring", label: "Spring" },
    { value: "express", label: "Express.js" },
    { value: "mongodb", label: "MongoDB" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "sqlite", label: "SQLite" },
    { value: "graphql", label: "GraphQL" },
    { value: "rest", label: "REST API" },
    { value: "redux", label: "Redux" },
    { value: "mobx", label: "MobX" },
    { value: "webpack", label: "Webpack" },
    { value: "babel", label: "Babel" },
    { value: "docker", label: "Docker" },
    { value: "kubernetes", label: "Kubernetes" },
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure" },
    { value: "gcp", label: "Google Cloud Platform" },
    { value: "firebase", label: "Firebase" },
    { value: "tensorflow", label: "TensorFlow" },
    { value: "pytorch", label: "PyTorch" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "jest", label: "Jest" },
    { value: "mocha", label: "Mocha" },
    { value: "cypress", label: "Cypress" },
    { value: "puppeteer", label: "Puppeteer" },
    { value: "electron", label: "Electron" },
    { value: "unity", label: "Unity" },
    { value: "unreal", label: "Unreal Engine" },
    { value: "rust", label: "Rust" },
    { value: "solidity", label: "Solidity" },
    { value: "haskell", label: "Haskell" },
    { value: "elixir", label: "Elixir" },
    { value: "scala", label: "Scala" },
    { value: "perl", label: "Perl" },
    { value: "lua", label: "Lua" },
  ];
  return (
    <NextUIProvider>
      <ToastContainer />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-6 mt-[5.5rem] bg-white shadow-xl">
          <h2 className="text-center text-gray-800 mb-6">Profile Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" style={{ width: "100%" }}>
                  <FaGlobe className="mr-2" />
                  {selectedCountry || "Select Country"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Country selection"
                onAction={(key) => handleDropdownChange(key as string)}
              >
                <DropdownItem key="Ethiopia">Ethiopia</DropdownItem>
                <DropdownItem key="Eritrea">Eritrea</DropdownItem>
                <DropdownItem key="Kenya">Kenya</DropdownItem>
                <DropdownItem key="Tanzania">Tanzania</DropdownItem>
                <DropdownItem key="Uganda">Uganda</DropdownItem>
                <DropdownItem key="Rwanda">Rwanda</DropdownItem>
                <DropdownItem key="Burundi">Burundi</DropdownItem>
                <DropdownItem key="South Sudan">South Sudan</DropdownItem>
                <DropdownItem key="Somalia">Somalia</DropdownItem>
                <DropdownItem key="Djibouti">Djibouti</DropdownItem>

                {/* Africa */}
                <DropdownItem key="Nigeria">Nigeria</DropdownItem>
                <DropdownItem key="South Africa">South Africa</DropdownItem>
                <DropdownItem key="Egypt">Egypt</DropdownItem>
                <DropdownItem key="Morocco">Morocco</DropdownItem>
                <DropdownItem key="Ghana">Ghana</DropdownItem>
                {/* Europe */}
                <DropdownItem key="United Kingdom">United Kingdom</DropdownItem>
                <DropdownItem key="Germany">Germany</DropdownItem>
                <DropdownItem key="France">France</DropdownItem>
                <DropdownItem key="Italy">Italy</DropdownItem>
                <DropdownItem key="Spain">Spain</DropdownItem>
                <DropdownItem key="Netherlands">Netherlands</DropdownItem>
                <DropdownItem key="Sweden">Sweden</DropdownItem>
                <DropdownItem key="Norway">Norway</DropdownItem>
                <DropdownItem key="Russia">Russia</DropdownItem>
                {/* Americas */}
                <DropdownItem key="United States">United States</DropdownItem>
                <DropdownItem key="Canada">Canada</DropdownItem>
                <DropdownItem key="Brazil">Brazil</DropdownItem>
                <DropdownItem key="Mexico">Mexico</DropdownItem>
                <DropdownItem key="Argentina">Argentina</DropdownItem>
                <DropdownItem key="Colombia">Colombia</DropdownItem>
                <DropdownItem key="Chile">Chile</DropdownItem>
                <DropdownItem key="Peru">Peru</DropdownItem>
                {/* East Asia */}
                <DropdownItem key="China">China</DropdownItem>
                <DropdownItem key="Japan">Japan</DropdownItem>
                <DropdownItem key="South Korea">South Korea</DropdownItem>
                <DropdownItem key="Taiwan">Taiwan</DropdownItem>
                <DropdownItem key="Hong Kong">Hong Kong</DropdownItem>
                <DropdownItem key="Singapore">Singapore</DropdownItem>
                {/* Middle East */}
                <DropdownItem key="Saudi Arabia">Saudi Arabia</DropdownItem>
                <DropdownItem key="United Arab Emirates">
                  United Arab Emirates
                </DropdownItem>
                <DropdownItem key="Israel">Israel</DropdownItem>
                <DropdownItem key="Turkey">Turkey</DropdownItem>
                <DropdownItem key="Qatar">Qatar</DropdownItem>
                <DropdownItem key="Kuwait">Kuwait</DropdownItem>
                <DropdownItem key="Jordan">Jordan</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Input
              fullWidth
              color="default"
              size="lg"
              placeholder="Phone Number"
              startContent={<FaPhone />}
              name="phone_number"
              value={
                !userProfile.profile_does_not_exist && userProfile.phone_number
                  ? userProfile.phone_number
                  : (formData.get("phone_number") as string) || ""
              }
              onChange={handleInputChange}
            />

            <Input
              fullWidth
              color="default"
              size="lg"
              placeholder="City"
              startContent={<FaCity />}
              name="city"
              value={
                !userProfile.profile_does_not_exist && userProfile.city
                  ? userProfile.city
                  : (formData.get("city") as string) || ""
              }
              onChange={handleInputChange}
            />

            <div className="flex space-x-4">
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <Input
                  type="file"
                  fullWidth
                  color="default"
                  size="lg"
                  name="profileImage"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Resume
                </label>
                <Input
                  type="file"
                  fullWidth
                  color="default"
                  size="lg"
                  name="resume"
                  accept=".pdf,.docx"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Textarea
              fullWidth
              color="default"
              size="lg"
              placeholder="Bio"
              rows={3}
              name="bio"
              value={
                !userProfile.profile_does_not_exist && userProfile.bio
                  ? userProfile.bio
                  : ""
              }
              onChange={handleInputChange}
            />

            <Select
              isMulti
              name="prefered_tech_stacks"
              options={techOptions}
              onChange={(newValue: MultiValue<TechOption>) =>
                handleSelectChange(newValue)
              }
              classNamePrefix="select"
            />

            <RadioGroup
              label="Preferred Job Types"
              orientation="horizontal"
              onChange={(e) =>
                handleRadioChange("preferred_job_types", e.target.value)
              }
            >
              <Radio value="job">Job</Radio>
              <Radio value="intern">Intern</Radio>
            </RadioGroup>

            <RadioGroup
              label="Preferred Work Arrangement"
              orientation="horizontal"
              onChange={(e) =>
                handleRadioChange("prefered_work_arrangement", e.target.value)
              }
            >
              <Radio value="fulltime">Full-time</Radio>
              <Radio value="remote">Remote</Radio>
              <Radio value="hybrid">Hybrid</Radio>
            </RadioGroup>

            <Button
              type="submit"
              color="primary"
              className="w-full"
              startContent={<FaBriefcase className="mr-2" />}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>

            {loading && <Progress isIndeterminate color="primary" />}
          </form>
        </Card>
      </div>
    </NextUIProvider>
  );
}
