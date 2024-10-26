"use client";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    tags: ["Remote", "Full-Time", "React"],
    description:
      "Join our team to build and optimize high-quality web applications.",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Innovative Labs",
    tags: ["On-Site", "Full-Time", "Node.js"],
    description:
      "Work on cutting-edge server-side applications with a talented team.",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Studio",
    tags: ["Hybrid", "Contract", "Figma"],
    description:
      "Design beautiful, user-centered interfaces for our web and mobile platforms.",
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    tags: ["Remote", "Full-Time", "React"],
    description:
      "Join our team to build and optimize high-quality web applications.",
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "Innovative Labs",
    tags: ["On-Site", "Full-Time", "Node.js"],
    description:
      "Work on cutting-edge server-side applications with a talented team.",
  },
  {
    id: 6,
    title: "UX/UI Designer",
    company: "Creative Studio",
    tags: ["Hybrid", "Contract", "Figma"],
    description:
      "Design beautiful, user-centered interfaces for our web and mobile platforms.",
  },
];

const Feed = () => {
  const [likedJobs, setLikedJobs] = useState(new Set());
  const [dislikedJobs, setDislikedJobs] = useState(new Set());

  const handleLike = (id: number) => {
    if (dislikedJobs.has(id)) {
      dislikedJobs.delete(id);
      setDislikedJobs(new Set(dislikedJobs));
    }
    const updatedLikes = new Set(likedJobs);
    if (updatedLikes.has(id)) {
      updatedLikes.delete(id);
    } else {
      updatedLikes.add(id);
    }
    setLikedJobs(updatedLikes);
  };

  const handleDislike = (id: number) => {
    if (likedJobs.has(id)) {
      likedJobs.delete(id);
      setLikedJobs(new Set(likedJobs));
    }
    const updatedDislikes = new Set(dislikedJobs);
    if (updatedDislikes.has(id)) {
      updatedDislikes.delete(id);
    } else {
      updatedDislikes.add(id);
    }
    setDislikedJobs(updatedDislikes);
  };

  return (
    <div className="w-full p-5 pt-10 h-full flex flex-col gap-3">
      <div className="w-full h-full p-4 space-y-6 overflow-auto hide-scrollbar">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 border-t-2 hover:shadow-lg hover:bg-[#f1f1f1] transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <div className="flex space-x-3 ">
                <span onClick={() => handleDislike(job.id)}>
                  {dislikedJobs.has(job.id) ? (
                    <BiDislike className="w-6 h-6 text-red-500 cursor-pointer" />
                  ) : (
                    <BiDislike className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500" />
                  )}
                </span>
                <span onClick={() => handleLike(job.id)}>
                  {likedJobs.has(job.id) ? (
                    <AiFillHeart className="w-6 h-6 text-red-500 cursor-pointer" />
                  ) : (
                    <AiOutlineHeart className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500" />
                  )}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500">{job.company}</p>
            <div className="flex space-x-2 mt-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-medium bg-gray-200 text-gray-700 rounded-full px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-600 mt-4 text-sm">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
