"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import http from "@/lib/http";

export const contactSchema = z.object({
  fullName: z.string().min(1, "Vui lòng điền họ và tên."),
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-6]|9[0-9])[0-9]{7}$/,
      "Số điện thoại không hợp lệ."
    ),
  note: z.string().optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      note: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsPending(true);
    const res = await http.post("/contacts", { data });
    if (res.ok) {
      form.reset();
      toast.success("Gửi thông tin thành công.");
    } else {
      toast.error(res.statusText);
    }
    setIsPending(false);
  });

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Họ tên */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ tên</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Số điện thoại */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Ghi chú */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú</FormLabel>
              <FormControl>
                <Textarea className="resize-none h-30" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="destructive"
          size="lg"
          disabled={isPending}
          className="w-full rounded-full uppercase"
        >
          {isPending && <Loader2 className="animate-spin" />}
          Gửi yêu cầu
        </Button>
      </form>
    </Form>
  );
}
