import { HomeLayout } from "@/components/provider/home-layout";
import ByBasket from "../../components/components/ByBasket";
import Checkout from "../../components/components/Checkout";
import ProductDetails from "../../components/components/ProductDetails";

export default function CheckoutPage() {
  return (
    <HomeLayout>
      <Checkout />
    </HomeLayout>
  );
}
