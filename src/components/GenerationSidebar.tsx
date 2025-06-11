import { Generation, generations } from "../constants/generations";

type Props = {
  generationRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
};

export default function GenerationSidebar({ generationRefs }: Props) {
  const handleClick = (id: string) => {
    const target = generationRefs.current[id];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="flex rounded-[4px] fixed top-[10rem] left-10 z-50 shadow-[var(--drop-shadow-regular)] bg-gray-primary">
      <ul className="flex flex-col">
        {generations.map((generation: Generation) => (
          <li
            key={generation.id}
            className="user-select-none cursor-pointer rounded-t-[4px] p-2 h-12 text-white-primary flex items-center justify-center hover:bg-gray-dark font-semibold"
            onClick={() => handleClick(generation.id)}
          >
            {generation.title}
          </li>
        ))}
      </ul>
    </nav>
  );
}
