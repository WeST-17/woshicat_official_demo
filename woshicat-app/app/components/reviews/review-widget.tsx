'use client';
import { getImagesCloudinary } from "../cloudinaryImages/cloudinary";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Import photos from cloudinary (?)
// Utilize carousel to autodisplay reviews from database (look into next.js databases)
// dynamically display reviews (first two or three on main page), load more reviews in a popup or side window
// reviews section on each product page? 