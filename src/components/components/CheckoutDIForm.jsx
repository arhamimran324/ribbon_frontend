// components/CheckoutDIForm.jsx
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setDeliveryInfo } from "@/redux/slices/checkout-slice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/components/ui/form";
import { Input } from "@/components/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

// Define schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required!"),
  lastName: z.string().min(1, "Last name is required!"),
  city: z.string().min(1, "City is required!"),
  address: z.string().min(1, "Address is required!"),
  zipCode: z.string().min(1, "Zip Code is required!"),
  mobileNumber: z.string().min(1, "Mobile Number is required!"),
  emailAddress: z.string().email("Please enter a valid email address!"),
});

const CheckoutDIForm = ({ onAddressSubmit }) => {
  const dispatch = useAppDispatch();
  const { deliveryInfo } = useAppSelector((state) => state.checkout);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: deliveryInfo.firstName || "",
      lastName: deliveryInfo.lastName || "",
      city: deliveryInfo.city || "",
      address: deliveryInfo.address || "",
      zipCode: deliveryInfo.zipCode || "",
      mobileNumber: deliveryInfo.phone || "",
      emailAddress: deliveryInfo.email || "",
    },
  });

  // Watch all form fields
  const watchedValues = form.watch();

  // Save to Redux whenever any field changes
  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values && Object.keys(values).length > 0) {
        const deliveryData = {
          firstName: values.firstName || "",
          lastName: values.lastName || "",
          email: values.emailAddress || "",
          phone: values.mobileNumber || "",
          address: values.address || "",
          city: values.city || "",
          zipCode: values.zipCode || "",
          country: deliveryInfo.country || "United States",
        };

        dispatch(setDeliveryInfo(deliveryData));

        if (onAddressSubmit) {
          onAddressSubmit(deliveryData);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, dispatch, deliveryInfo.country, onAddressSubmit]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* First Name & Last Name */}
        <div className="flex max-md:flex-col justify-between">
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
                    className="w-[24.5vw] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3]"
                    placeholder="First Name"
                    {...field}
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
                    className="w-[24.5vw] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3]"
                    placeholder="Last Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[14px] text-[#344054] font-semibold">
                Address
              </FormLabel>
              <FormControl>
                <Input
                  className="w-[51vw] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3]"
                  placeholder="123 Street Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City & Zip Code */}
        <div className="flex max-md:flex-col justify-between">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] text-[#344054] font-semibold">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[24.5vw] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3]"
                    placeholder="Lahore"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] max-md:mt-6 text-[#344054] font-semibold">
                  Zip Code
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[24.5vw] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3]"
                    placeholder="Zip Code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Mobile Number & Email Address */}
        <div className="flex max-md:flex-col justify-between">
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] text-[#344054] font-semibold">
                  Mobile Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[24.5vw] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3]"
                    placeholder="Mobile Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[14px] max-md:mt-6 text-[#344054] font-semibold">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-[24.5vw] max-md:w-[82vw] h-[50px] border-[1px] border-[#D0D5DD] placeholder:text-[#98A2B3]"
                    placeholder="Email Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CheckoutDIForm;
