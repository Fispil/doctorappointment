"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getCategory } from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

const CategorySearch = () => {
  const [search, setSearch] = useState("");
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [categoryListToShow, setCategoryListToShow] = useState<any[]>([]);

  const getCategoryList = async () => {
    const category = await getCategory();
    
    setCategoryList(category.data);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    const filteredCategory = categoryList.filter((category) =>
      category.attributes.Name.toLowerCase().includes(search.toLowerCase())
    );

    setCategoryListToShow(filteredCategory);
  }, [categoryList, search]);

  return (
    <div className="mb-20 items-center flex flex-col gap-6 px-4">
      <h2 className="font-bold text-4xl tracking-wide">
        Search yours <span className="text-primary">doctor</span>
      </h2>
      <h2 className="text-gray-400 text-xl">
        Search for<span className="text-primary"> appointment</span> with your
        favorites <span className="text-primary"> Doctors</span>
      </h2>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-6 gap-2">
        {categoryList.length > 0
          ? categoryListToShow.map(
              (category, index) =>
                index <= 6 && (
                  <Link
                    href={`/search/${category.attributes.Name}`}
                    key={category.id}
                    className="flex flex-col text-center gap-4 items-center p-4 bg-blue-100 m-2 rounded-lg hover:scale-110 transition-all ease-in-out cursor-pointer"
                  >
                    <Image
                      src={category.attributes?.Icon?.data?.attributes?.url}
                      alt="category icon"
                      width={40}
                      height={40}
                    />
                    <label className="text-blue-600 text-sm">
                      {category.attributes?.Name}
                    </label>
                  </Link>
                )
            )
          : [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-[100px] bg-slate-200 w-[100px] rounded-lg animate-pulse"
              />
            ))}
      </div>
    </div>
  );
};

export default CategorySearch;
