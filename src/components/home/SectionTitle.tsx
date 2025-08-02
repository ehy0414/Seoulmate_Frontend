interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="self-stretch text-2xl font-bold text-zinc-900 max-sm:text-xl">
      {title}
    </h2>
  );
}
