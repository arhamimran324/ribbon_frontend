"use client";
import * as React from "react";
import { usePathname } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select";

const SelectBox = ({
  width,
  mobWid,
  placeholder,
  firstValue,
  secondValue,
  thirdValue,
  fourthValue,
  fifthValue,
  sixthValue,
  bgColor = "#F9FAFB",
}) => {
  const pathname = usePathname();

  // Add paths where mb-4 should NOT apply
  const noMarginPaths = ["/corporategift", "/fragrancebar", "/candlemaking"];
  const showMargin = !noMarginPaths.includes(pathname);

  return (
    <Select>
      <SelectTrigger
        style={{ width: width, maxWidth: mobWid, backgroundColor: bgColor }}
        className={`border border-[#D0D5DD] py-6 mt-1 ${
          showMargin ? "mb-4" : ""
        }`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Note</SelectLabel>
          <SelectItem value="apple">{firstValue}</SelectItem>
          <SelectItem value="banana">{secondValue}</SelectItem>
          <SelectItem value="blueberry">{thirdValue}</SelectItem>
          {fourthValue && <SelectItem value="hell">{fourthValue}</SelectItem>}
          {fifthValue && <SelectItem value="fift">{fifthValue}</SelectItem>}
          {sixthValue && (
            <SelectItem value="sixt">{sixthValue}</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
