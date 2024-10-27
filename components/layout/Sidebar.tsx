"use client";

import React, { useEffect, useRef } from "react";
import { Job } from "../../types/types";
import { Button, Chip, Divider, ScrollShadow } from "@nextui-org/react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaLink,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";

interface SidebarProps {
  isOpen: boolean;
  job: Job;
  onClose: () => void;
}

export default function Sidebar({ isOpen, job, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 z-50 w-full md:w-3/4 bg-background shadow-lg transition-transform duration-300 transform  ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ScrollShadow className="h-full">
        <div className="p-6">
          How to Apply
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{job?.job_title}</h2>
            <Button
              isIconOnly
              variant="light"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <FaTimes className="text-xl" />
            </Button>
          </div>
          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <BsBuilding className="mr-2 text-primary" />
              <span className="font-semibold">{job?.company_name}</span>
            </div>
            {job?.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-primary" />
                <span>{job?.location}</span>
              </div>
            )}
            <div className="flex items-center">
              <MdWork className="mr-2 text-primary" />
              <span>{job?.work_arrangement}</span>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="mr-2 text-primary" />
              <span>{job?.job_type}</span>
            </div>
            <div className="flex items-center">
              <FaMoneyBillWave className="mr-2 text-primary" />
              <span>{job?.salary_range}</span>
            </div>
          </div>
          <Divider className="my-4" />
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Company Description</h3>
            <p className="text-foreground-600">{job?.company_description}</p>
          </section>
          <Divider className="my-4" />
          {job?.responsibilities && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job?.responsibilities?.map((resp, index) => (
                  <li key={index} className="text-foreground-600">
                    {resp}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <Divider className="my-4" />
          {job?.requirements && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Requirements</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job?.requirements?.map((req, index) => (
                  <li key={index} className="text-foreground-600">
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <Divider className="my-4" />
          {job?.preferred_qualifications && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-3">
                Preferred Qualifications
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {job?.preferred_qualifications?.map((qual, index) => (
                  <li key={index} className="text-foreground-600">
                    {qual}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <Divider className="my-4" />
          {job?.benefits && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Benefits</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job?.benefits?.map((benefit, index) => (
                  <li key={index} className="text-foreground-600">
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <Divider className="my-4" />
          {job?.tech_stack && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {job?.tech_stack?.map((tech, index) => (
                  <Chip key={index} color="primary" variant="flat">
                    {tech}
                  </Chip>
                ))}
              </div>
            </section>
          )}
          <Divider className="my-4" />
          {job?.areas_of_focus && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Areas of Focus</h3>
              <div className="flex flex-wrap gap-2">
                {job?.areas_of_focus?.map((area, index) => (
                  <Chip key={index} color="secondary" variant="flat">
                    {area}
                  </Chip>
                ))}
              </div>
            </section>
          )}
          <Divider className="my-4" />
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Important Dates</h3>
            <div className="space-y-2">
              {job?.posted_date && (
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-primary" />
                  <span>Posted: {job?.posted_date}</span>
                </div>
              )}
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-primary" />
                <span>Closing: {job?.closing_date}</span>
              </div>
            </div>
          </section>
          <Divider className="my-4" />
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3">How to Apply</h3>
            <div className="flex items-center">
              <FaLink className="mr-2 text-primary" />
              <a
                target="_blank"
                href={`${job?.application_link}`}
                className="text-primary hover:underline"
              >
                {job?.application_link}
              </a>
            </div>
          </section>
          <Button
            color="primary"
            className="w-full mt-6"
            size="lg"
            href={`${job?.application_link}`}
          >
            Apply Now
          </Button>
        </div>
      </ScrollShadow>
    </div>
  );
}
