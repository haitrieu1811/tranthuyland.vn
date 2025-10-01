import PageTitle from "@/components/page-title";
import apiRequests from "@/lib/apiRequests";
import Image from "next/image";
import React from "react";

export default async function ContactPage() {
  const info = await apiRequests.info();
  return (
    <div>
      <PageTitle title="Liên hệ" />
      {/* Contact */}
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-24 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-6 md:gap-8 lg:gap-12">
          <div className="aspect-w-16 aspect-h-6 lg:aspect-h-14 overflow-hidden bg-gray-100 rounded-2xl">
            <Image
              width={500}
              height={500}
              className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Contacts Image"
            />
          </div>
          {/* End Col */}

          <div className="space-y-8 lg:space-y-16">
            <div>
              <h3 className="mb-5 font-semibold text-black">
                Địa chỉ của chúng tôi
              </h3>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                <div className="flex gap-4">
                  <svg
                    className="shrink-0 size-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>

                  <div className="grow">
                    <p className="text-sm text-gray-600">Việt Nam</p>
                    <address className="mt-1 text-black not-italic">
                      Thành phố Hồ Chí Minh
                    </address>
                  </div>
                </div>
              </div>
              {/* End Grid */}
            </div>

            <div>
              <h3 className="mb-5 font-semibold text-black">
                Liên hệ với chúng tôi
              </h3>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                <div className="flex gap-4">
                  <svg
                    className="shrink-0 size-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>

                  <div className="grow">
                    <p className="text-sm text-gray-600">Hotline</p>
                    <p>
                      <a
                        className="relative inline-block font-medium text-black before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-yellow-400 hover:before:bg-black focus:outline-hidden focus:before:bg-black"
                        href={`tel:${info?.hotline}`}
                      >
                        {info?.hotline}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/* End Grid */}
            </div>
          </div>
          {/* End Col */}
        </div>
      </div>
      {/* End Contact */}
    </div>
  );
}
