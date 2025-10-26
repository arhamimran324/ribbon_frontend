import { Suspense } from "react";
import ByBasket from "../../components/components/ByBasket";
import Checkout from "../../components/components/Checkout";
import Contact from "../../components/components/Contact";
import DeliveryInformation from "../../components/components/DeliveryInformation";
import ProductDetails from "../../components/components/ProductDetails";
import { HomeLayout } from "@/components/provider/home-layout";

export default function ProductDetailsPage() {
  return (
    <HomeLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetails />
      </Suspense>
    </HomeLayout>
  );
}
