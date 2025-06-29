import ContainerWrapper from "../../components/ContainerWrapper";
import { generations } from "../../constants/generations";

export default function MovePage() {
  return (
    <ContainerWrapper>
      <section className="flex items-center justify-center w-[75%] rounded-[14px]">
        <section className="w-full bg-white p-8 mt-4 font-semibold cursor-pointer">
          <ul>
            {generations.map((generation, index: number) => {
              return (
                <li key={index} className="text-link-blue hover:underline">
                  <a href={`/move/generation/${generation.id}`}>
                    {generation.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </ContainerWrapper>
  );
}
