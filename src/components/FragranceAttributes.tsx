import { Content } from "@prismicio/client";
import { IconType } from "react-icons";
import {
  LuCrown,
  LuDroplet,
  LuFlame,
  LuGem,
  LuTreePine,
  LuZap,
} from "react-icons/lu";

type AttributeData = {
  label: string;
  Icon: IconType;
};

const SCENT_PROFILES: Record<
  Content.FragranceDocumentData["scent_profile"],
  AttributeData
> = {
  especiado: { label: "Especiado & Humeante", Icon: LuFlame },
  boscoso: { label: "Boscoso & Herbal", Icon: LuTreePine },
  fresco: { label: "Fresco & Acuático", Icon: LuDroplet },
};

const MOODS: Record<Content.FragranceDocumentData["mood"], AttributeData> = {
  atrevido: { label: "Atrevido & Seductor", Icon: LuCrown },
  aterrizado: { label: "Maduro & Sofisticado", Icon: LuGem },
  refrescante: { label: "Refrescante & Envigorante", Icon: LuZap },
};

type FragranceAttributesProps = {
  scentProfile: Content.FragranceDocumentData["scent_profile"];
  mood: Content.FragranceDocumentData["mood"];
  className?: string;
};

export const FragranceAttributes = ({
  mood: providedMood,
  scentProfile: providedScentProfile,
  className = "",
}: FragranceAttributesProps) => {
  const scentProfile = SCENT_PROFILES[providedScentProfile];
  const mood = MOODS[providedMood];

  return (
    <div className={className}>
      <p className="mb-2 text-base font-semibold uppercase">Features</p>

      <div className="grid gap-2">
        <p className="flex items-center gap-2">
          <scentProfile.Icon className="size-6" />
          {scentProfile.label}
        </p>
        <p className="flex items-center gap-2">
          <mood.Icon className="size-6" />
          {mood.label}
        </p>
      </div>
    </div>
  );
};
