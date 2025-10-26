// import HomePage from "./pages";

import { HomeLayout } from "@/components/provider/home-layout";
import BestSellers from "../../components/components/BestSellers";

export default function ShopPage() {
  return (
    <HomeLayout>
      <BestSellers title="Ready to ship gift boxes" />
    </HomeLayout>
  );
}
