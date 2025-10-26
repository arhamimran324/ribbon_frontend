"use client";

import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/components/ui/textarea";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/components/components/shared/button";
import { createContactUs } from "@/api/service/app";
import { toast } from "sonner";
import { useState } from "react";

// Valid subjects for the contact form
const VALID_SUBJECTS = [
  "General Inquiry",
  "Product Information",
  "Technical Support",
  "Partnership Opportunity",
  "Feedback/Suggestions",
  "Complaint",
  "Career Opportunities",
  "Media Inquiry",
  "Billing Question",
  "Other",
];

// 1. Define schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required!"),
  lastName: z.string().min(1, "Last name is required!"),
  emailAddress: z.string().email("Please enter a valid email address!"),
  phoneNumber: z.string().min(1, "Phone Number is required!"),
  regarding: z.string().min(1, "Please select a subject!"),
  message: z.string().min(10, "Message must be at least 10 characters!"),
});

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  // 2. Setup form hook
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      regarding: "",
      message: "",
    },
  });

  // 3. Submit handler
  const onSubmit = async (values) => {
    setIsLoading(true);

    const data = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.emailAddress,
      subject: values.regarding,
      phoneNumber: values.phoneNumber,
      description: values.message,
    };

    try {
      const res = await createContactUs(data);
      if (res.success) {
        toast.success("Inquiry Submitted Successfully!");
        form.reset(); // Reset form after successful submission
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* First Name & Last Name Row */}
        <div className="flex justify-between max-md:flex-col">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] text-[#344054] font-semibold">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[19vw] bg-[#F9FAFB] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                    placeholder="First Name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] max-md:mt-6 text-[#344054] font-semibold">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[19vw] bg-[#F9FAFB] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                    placeholder="Last Name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  className="w-[40vw] bg-[#F9FAFB] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                  placeholder="Email Address"
                  type="email"
                  {...field}
                  disabled={isLoading}
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
                    disabled: isLoading,
                  }}
                  inputClass="!w-[40vw] !bg-[#F9FAFB] max-md:!w-[82vw] !h-[50px] !border-[#D0D5DD] !placeholder:text-[#98A2B3]"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Regarding/Subject */}
        <FormField
          control={form.control}
          name="regarding"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] text-[#344054] font-semibold">
                Regarding
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-[40vw] bg-[#F9FAFB] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] rounded-md px-3 text-[#98A2B3]"
                  disabled={isLoading}
                >
                  <option value="">Select a subject</option>
                  {VALID_SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] mt-[-15px] text-[#344054] font-semibold">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  className="w-[40vw] bg-[#F9FAFB] max-md:w-[82vw] h-[147px] resize-none border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                  placeholder="Please provide details about your inquiry..."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button with Loader */}
        <Button
          variant="primary"
          type="submit"
          className="w-[40vw] max-md:w-[82vw] p-4 rounded-[16px] relative"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}
