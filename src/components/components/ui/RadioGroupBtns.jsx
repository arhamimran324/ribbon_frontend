"use client";
import { Label } from "@/components/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/components/ui/radio-group";
import { usePathname } from "next/navigation";

const RadioGroupBtns = ({ firstBtnText, secondBtnText }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <RadioGroup
      defaultValue="default"
      className={`flex ${
        pathname === "/productDetails" && "flex-col"
      } gap-6 mt-4 mb-3`}
    >
      <div className={`flex items-center space-x-2`}>
        <RadioGroupItem
          value="default"
          id="r1"
          className="h-5 w-5 rounded-full border-2 border-[#CBD5E1]
    data-[state=checked]:border-[#D5A581] relative cursor-pointer transition
    data-[state=checked]:bg-white"
        >
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className="h-2.5 w-2.5 rounded-full bg-[#D5A581] scale-0
        data-[state=checked]:scale-100 transition-transform"
            />
          </span>
        </RadioGroupItem>

        <Label htmlFor="r1" className="text-[#667185] font-medium">
          {firstBtnText}
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="comfortable"
          id="r2"
          className="h-5 w-5 rounded-full border-2 border-[#CBD5E1]
    data-[state=checked]:border-[#D5A581] relative cursor-pointer transition
    data-[state=checked]:bg-white"
        >
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className="h-2.5 w-2.5 rounded-full bg-[#D5A581] scale-0
        data-[state=checked]:scale-100 transition-transform"
            />
          </span>
        </RadioGroupItem>
        <Label htmlFor="r2" className="text-[#667185] font-medium">
          {secondBtnText}
        </Label>
      </div>
    </RadioGroup>
  );
};
export default RadioGroupBtns;
