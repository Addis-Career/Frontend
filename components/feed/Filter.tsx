"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { fetchJobs } from "../../lib/features/jobSlice"; // Adjust the import path as needed

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const [workArrangement, setWorkArrangement] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");

  const handleApplyFilters = () => {
    dispatch(
      fetchJobs({
        nextUrl: "",
        job_title: "",
        work_arrangement: workArrangement,
        job_type: jobType,
      }) as any
    );
  };

  const workArrangementOptions = ["--", "Remote", "Hybrid", "Onsite"];
  const jobTypeOptions = ["--", "Full-time", "Part-time", "Contract", "Intern"];

  return (
    <div className="w-full md:w-[30%] p-2 md:p-6 md:py-10 h-[100%]">
      <Card className="py-5 sticky top-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl h-[100%]">
        <CardHeader className="pb-0 pt-2 px-4">
          <h4 className="font-bold text-lg text-primary">Filter Jobs</h4>
        </CardHeader>
        <CardBody className="py-2 space-y-4 h-[100%]">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label
              htmlFor="work-arrangement"
              className="font-semibold text-sm block mb-1"
            >
              Work Arrangement
            </label>
            <Select
              id="work-arrangement"
              size="sm"
              value={workArrangement}
              onChange={(e) => setWorkArrangement(e.target.value)}
              className="max-w-full"
            >
              {workArrangementOptions.map((option) => (
                <SelectItem key={option} value={option === "--" ? "" : option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="job-type"
              className="font-semibold text-sm block mb-1"
            >
              Job Type
            </label>
            <Select
              id="job-type"
              size="sm"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="max-w-full"
            >
              {jobTypeOptions.map((option) => (
                <SelectItem key={option} value={option === "--" ? "" : option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              className="w-full mt-2"
              color="primary"
              size="sm"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </motion.div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Filter;
