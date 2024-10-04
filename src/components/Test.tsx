interface TestProps {
  title: string;
}

export default function Test({ title }: TestProps) {
  return <div className="dark:text-white">{title}</div>;
}
