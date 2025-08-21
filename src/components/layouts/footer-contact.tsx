"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { contactSchema, ContactSchema } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import http from "@/lib/http";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

export default function FooterContact() {
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-xl tracking-tight">
              Liên hệ trực tiếp với chúng tôi
            </h3>
            <p className="w-full md:w-1/3 text-sm">
              Bạn đang có nhu cầu về bất động sản ? Đừng ngần ngại, hãy liên hệ
              trực tiếp với chúng tôi để được giúp đỡ
            </p>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Họ tên"
                        className="size-full bg-white h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Số điện thoại"
                        className="size-full bg-white h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Button
                type="submit"
                disabled={isPending}
                className="size-full h-12"
              >
                {isPending && <Loader2 className="animate-spin" />}
                Gửi yêu cầu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
