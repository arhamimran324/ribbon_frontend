import { Suspense } from "react";
import CandleMakingDetails from "../../components/components/CandleMakingDetails";
import CandleWorkshopPage from "../../components/components/CandleWorkshopPage";
import { HomeLayout } from "@/components/provider/home-layout";

export default function CandleMakingDetailsPage() {
  return (
    <HomeLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <CandleMakingDetails />
      </Suspense>
    </HomeLayout>
  );
}
