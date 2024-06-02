import getCategories from "@/actions/get-categories";
import { useUser } from "@clerk/nextjs";
import { ClientNavbar } from "./client-navbar";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();
  return <ClientNavbar data={categories} />;
};

export default Navbar;
