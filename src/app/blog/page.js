import { Suspense } from "react";
import Blog from "../../components/components/Blog";
import DeliveryAndReturns from "../../components/components/DeliveryAndReturns";
import { HomeLayout } from "@/components/provider/home-layout";

export default function BlogPage() {
  return (
    <HomeLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Blog />
      </Suspense>
    </HomeLayout>
  );
}
