"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Size, Color } from "@/types";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: "size_id" | "color_id";
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter[valueKey as keyof typeof filter]} className="flex items-center">
            <Button
              key={filter[valueKey as keyof typeof filter]}
              className={cn(
                "rounded-md text-sm dark:text-gray-400 text-[#0D1A26] bg-white dark:bg-[#0D1A26] border border-gray-300 ",
                selectedValue === filter[valueKey as keyof typeof filter] &&
                  "bg-[#0D1A26] text-white dark:text-white"
              )}
              onClick={() => onClick(filter[valueKey as keyof typeof filter])}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
