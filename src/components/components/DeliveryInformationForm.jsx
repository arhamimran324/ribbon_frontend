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
import { Button } from "@/components/components/ui/button";

// 1. Define schema
const formSchema = z.object({
  orderNumber: z.string().min(1, "Order Number is required!"),
  transactionDate: z.string().min(1, "Transaction Date is required!"),
  contact: z.string().min(1, "Contact is required!"),
  deliveryAddress: z.string().min(1, "Delivery Address is required!"),
});

export default function DeliveryInformationForm() {
  // 2. Setup form hook
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: "",
      transactionDate: "",
      contact: "",
      deliveryAddress: "",
    },
  });

  // 3. Submit handler
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* First Name */}
        <div className="flex max-md:flex-col justify-between">
          <FormField
            control={form.control}
            name="orderNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] text-[#344054] font-semibold">
                  Order Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[24.5vw] bg-[#F9FAFB] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                    placeholder="Order Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="transactionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] max-md:mt-6 text-[#344054] font-semibold">
                  Transaction Date
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[24.5vw] bg-[#F9FAFB] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                    placeholder="Transaction Date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] text-[#344054] font-semibold">
                Contact
              </FormLabel>
              <FormControl>
                <Input
                  className="w-[51vw] bg-[#F9FAFB] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                  placeholder="Contact"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] text-[#344054] font-semibold">
                Delivery Address
              </FormLabel>
              <FormControl>
                <Input
                  className="w-[51vw] bg-[#F9FAFB] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3] "
                  placeholder="123 Street Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
