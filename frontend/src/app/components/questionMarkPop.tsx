import QuestionMarkSVG from "./svg/questionMarkSVG";

interface Props {
  title: string;
  infoText: string;
}

export default function QuestionMarkPopUp({ title, infoText }: Props) {
  return (
    <div className="group relative">
      <div className="cursor-pointer">
        <QuestionMarkSVG />
      </div>
      <div className="absolute -top-2 right-5 z-10 hidden w-[250px] items-start text-wrap group-hover:flex">
        <div className="rounded-lg bg-[#2f2f2f] p-4 shadow-lg shadow-[#00000042]">
          <p className="mb-2 font-semibold underline">{title}:</p>
          <p className="text-pretty text-xs">{infoText}</p>
        </div>
        <div className="mt-2 h-0 w-0 border-b-[7.5px] border-l-[10px] border-t-[7.5px] border-b-transparent border-l-[#2f2f2f] border-t-transparent"></div>
      </div>
    </div>
  );
}
