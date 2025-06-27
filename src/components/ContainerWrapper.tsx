import { ReactNode } from "react";
import Banner from "./Banner";

export default function ContainerWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className=" flex flex-col justify-center items-center bg-[url('/assets/images/bg-pattern.jpg')] bg-cover">
      <Banner />
      {children}
    </main>
  );
}
