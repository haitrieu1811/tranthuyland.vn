import PageTitle from "@/components/page-title";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Giới thiệu | Trần Thủy Land",
  description: "Giới thiệu | Trần Thủy Land",
};

const testimonials = [
  {
    quote: `"Kiến tạo tổ ấm, hiện thực giấc mơ. Đồng hành cùng bạn trên mọi chặng đường bất động sản."`,
    name: "Trần Thủy Land - Đối Tác Tin Cậy Cho Mọi Giao Dịch Bất Động Sản",
    designation: "",
    src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1296&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: `"Chính Trực - Chuyên Nghiệp - Bền Vững. Cam kết mang đến giá trị đích thực cho mọi khách hàng."`,
    name: "Giá Trị Khác Biệt",
    designation: "",
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "Mua bán & Cho thuê. Đầu tư sinh lời. Định giá & Pháp lý",
    name: "Dịch Vụ Chính",
    designation: "",
    src: "https://images.unsplash.com/photo-1634344656611-0773d8dbbe2c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function IntroducePage() {
  return (
    <div>
      <PageTitle title="Giới thiệu" />
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
