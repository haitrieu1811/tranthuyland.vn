"use client";

import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City } from "@/types/cities.types";

export default function Search({ cities }: { cities: City[] }) {
  const [filters, setFilters] = React.useState<{
    name: string;
    cityId: string | null;
  }>({
    name: "",
    cityId: null,
  });

  let queryString = "";
  Object.keys(filters).forEach((key) => {
    const value = filters[key as keyof typeof filters];
    if (value) queryString += `&${key}=${value}`;
  });
  queryString = queryString.replace("&", "?");

  const redirectRef = React.useRef<HTMLAnchorElement>(null);
  const handleRedirect = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirectRef.current?.click();
  };

  return (
    <form onSubmit={handleRedirect}>
      <div className="max-w-screen lg:max-w-[800px] mx-auto bg-secondary shadow-lg p-6 rounded-lg space-y-8">
        <div className="flex flex-wrap lg:space-x-2 space-y-2 lg:space-y-0">
          <div className="flex-1">
            <Input
              value={filters.name}
              onChange={(e) =>
                setFilters((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              placeholder="Nhập từ khóa tìm kiếm..."
              className="bg-background"
            />
          </div>
          <Select
            onValueChange={(value) =>
              setFilters((prevState) => ({
                ...prevState,
                cityId: value,
              }))
            }
          >
            <SelectTrigger className="w-full lg:w-[180px] h-full bg-background">
              <SelectValue placeholder="Chọn thành phố" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.documentId} value={city.documentId}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            variant="destructive"
            className="w-full lg:w-auto"
          >
            Tìm kiếm
          </Button>
          <Link ref={redirectRef} hidden href={`/san-pham${queryString}`} />
        </div>
      </div>
    </form>
  );
}
