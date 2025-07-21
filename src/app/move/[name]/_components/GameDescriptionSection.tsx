import { MoveData } from "@/services/api/server/moveService";

export default function GameEntryWrapper({
  gameDescription,
}: {
  gameDescription: MoveData["flavor_text_entries"];
}) {
  if (gameDescription)
    return (
      <section>
        <h2 className="text-3xl text-gray-primary font-bold">
          Game Descriptions
        </h2>
        {gameDescription
          .filter((moveDescription) => moveDescription.language.name === "en")
          .map((moveDescription, index: number) => {
            return (
              <div key={index} className="flex gap-4">
                <div>{moveDescription.version_group.name}</div>
                <div>{moveDescription.flavor_text}</div>
              </div>
            );
          })}
      </section>
    );
}
