"use client";
import { useForm, Controller } from "react-hook-form";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/components/ui/form";
import { Input } from "@/components/components/ui/input";
// import { Button } from "@/components/components/ui/button";
import { Select } from "@/components/components/ui/select";
import SelectBox from "./ui/SelectBox";
import { Textarea } from "@/components/components/ui/textarea";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/components/components/shared/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/components/ui/popover";
import { Calendar } from "@/components/components/ui/calendar";
import { Label } from "@/components/components/ui/label";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// ✅ 1. FORM SCHEMA
const formSchema = z.object({
  name: z.string().min(1, "Full Name is required!"),
  emailAddress: z.string().min(1, "Email Address is required!"),
  phoneNumber: z.string().min(1, "Phone Number is required!"),
  workshop: z.string().min(1, "Workshop is required!"),
  occasion: z.string().min(1, "Occasion is required!"),
  noOfAttendees: z.string().min(1, "No. of Attendees is required!"),
  budget: z.string().min(1, "Budget is required!"),
  preferLocation: z.string().min(1, "Prefer Location is required!"),
  message: z.string().min(1, "Message is required!"),
});

// ✅ 2. FORM COMPONENT
const CustomForm = ({ title }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emailAddress: "",
      phoneNumber: "",
      occasion: "",
      noOfAttendees: "",
      budget: "",
      preferLocation: "",
      message: "",
    },
  });

  // ✅ 3. HANDLE SUBMIT FUNCTION (was missing)
  const onSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  const getMessage = () => {
    switch (pathname) {
      case "/candlemaking":
        return (
          <>
            Interested in a Private or <br /> Custom Workshop?
          </>
        );
      case "/fragrancebar":
        return (
          <>
            Interested in having <br /> The Fragrance bar at your event?
          </>
        );
      case "/corporategift":
        return (
          <>
            Get Exclusive Gifting Solutions for <br /> Your Team, Clients, and
            Events
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1
        style={{ fontFamily: "Jedira-Regular, sans-serif" }}
        className="text-[56px] leading-16 max-md:leading-12 text-center text-black font-normal max-md:text-[28px]"
      >
        {getMessage()}
      </h1>
      <div className="w-[60%] max-md:w-[100%] mx-auto max-md:mx-0 mt-10 bg-[#F5F3EB] p-8 rounded-3xl ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name & Last Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-[#344054] font-semibold">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-[100%] bg-[#F9FAFB] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Address */}
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-[#344054] font-semibold">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-[100%] bg-[#F9FAFB] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-[#344054] font-semibold">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      country={"us"}
                      value={field.value}
                      onChange={field.onChange}
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                      inputClass="!w-[100%] !bg-[#F9FAFB] !h-[50px] !border-[#D0D5DD] !placeholder:text-[#98A2B3]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="flex justify-between max-md:flex-col">
              <FormField>
                <Label className="mt-4 mb-2 text-[14px] font-medium text-[#344054]">
                  Preffered Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="h-[50px] w-full border border-[#D0D5DD] rounded-md text-left px-3 flex items-center justify-between text-sm placeholder:text-[#98A2B3]">
                      {date &&
                      date instanceof Date &&
                      !isNaN(date.getTime()) ? (
                        format(date, "MM/yy")
                      ) : (
                        <span className="text-[#98A2B3]">Select date</span>
                      )}

                      <CalendarIcon className="ml-2 h-4 w-4 text-gray-500" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormField>
              <FormField>
                <Label className="mt-4 mb-2 text-[14px] font-medium text-[#344054]">
                  Preferred Time
                </Label>
                <Input
                  type="time"
                  className="h-[50px] w-full border border-[#D0D5DD] rounded-md text-[#101828] px-3 text-sm placeholder:text-[#98A2B3]"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </FormField>
            </div> */}

            {/* Tyoe of workshop */}
            <FormField
              control={form.control}
              name="workshop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-[#344054] font-semibold">
                    Type of workshop
                  </FormLabel>
                  <FormControl>
                    <SelectBox
                      placeholder="Type of workshop"
                      firstValue="Candle Making"
                      secondValue="Perfume Making"
                      width="100%"
                      mobWid="100%"
                      className="!bg-[#F9FAFB] "
                      // NOTE: SelectBox must call `field.onChange` inside it
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Regarding */}
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-[#344054] font-semibold">
                    Occasion
                  </FormLabel>
                  <FormControl>
                    <SelectBox
                      placeholder="Occasion"
                      firstValue="Birthday"
                      secondValue="Bridal shower"
                      thirdValue="Baby shower"
                      fourthValue="Launch"
                      fifthValue="Corporate event"
                      sixthValue="Other"
                      width="100%"
                      mobWid="100%"
                      className="!bg-[#F9FAFB] "
                      // NOTE: SelectBox must call `field.onChange` inside it
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gifting Reason */}
            {pathname === "/corporategift" && (
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-[#344054] font-semibold">
                      Gifting Reason
                    </FormLabel>
                    <FormControl>
                      <SelectBox
                        placeholder="Gifting Reason"
                        firstValue="Onboarding"
                        secondValue="Well-Being"
                        thirdValue="Event"
                        fourthValue="Milestone"
                        fifthValue="Sympathy"
                        sixthValue="New Home"
                        width="100%"
                        mobWid="100%"
                        className="!bg-[#F9FAFB]"
                        // NOTE: SelectBox must call `field.onChange` inside it
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* No of Attendees */}
            <FormField
              control={form.control}
              name="noOfAttendees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-[#344054] font-semibold">
                    No of Attendees
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-[100%] bg-[#F9FAFB] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                      placeholder="No of attendees"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget  */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-[#344054] font-semibold">
                    Budget
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-[100%] bg-[#F9FAFB] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                      placeholder="E.g. £150"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location  */}
            {pathname === "/corporategift" ? (
              <FormField
                control={form.control}
                name="delivery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-[#344054] font-semibold">
                      Delivery Requirement
                    </FormLabel>
                    <FormControl>
                      <SelectBox
                        placeholder="Select"
                        firstValue="Onboarding"
                        secondValue="Well-Being"
                        thirdValue="Event"
                        width="100%"
                        mobWid="100%"
                        // className="!bg-[#F9FAFB]"
                        styles={{
                          control: (base) => ({
                            ...base,
                            backgroundColor: "#F9FAFB",
                          }),
                        }}
                        // NOTE: SelectBox must call `field.onChange` inside it
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="preferLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-[#344054] font-semibold">
                      Preferred Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[100%] bg-[#F9FAFB] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                        placeholder="prefer Location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] mt-[-4px] text-[#344054] font-semibold">
                    Anything else you want us to know
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-[100%] bg-[#F9FAFB] h-[147px] resize-none border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                      placeholder="Type here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              variant="primary"
              className="w-[100%] p-4 rounded-[16px]"
              type="submit"
            >
              Send Enquiry
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CustomForm;
