"use client";
import { getCategory } from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState<any[]>([]);

  const selectedCategory = usePathname().split("/")[2];

  const getCategoryList = async () => {
    const category = await getCategory();

    setCategoryList(category.data);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="h-screen flex flex-col sticky mt-5">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions" >
            {categoryList.length > 0 &&
              categoryList.map((category, index) => (
                <CommandItem key={category?.id}>
                  <Link href={`/search/${category.attributes.Name}`} className={`p-2 flex items-center gap-2 text-[12px] text-blue-600 rounded-md cursor-pointer w-full ${selectedCategory == category.attributes.Name && 'bg-blue-100'}`}>
                    <Image src={category.attributes?.Icon?.data?.attributes?.url} alt="category icon" width={25} height={25} />
                    <label>{category.attributes.Name}</label>
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
