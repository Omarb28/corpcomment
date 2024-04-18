type HashtagItemProps = {
  company: string;
  onSelectCompany: React.Dispatch<React.SetStateAction<string>>;
};

export default function HashtagItem({
  company,
  onSelectCompany,
}: HashtagItemProps) {
  return (
    <li key={company}>
      <button
        onClick={() => {
          onSelectCompany((prev: string) => {
            if (prev === company) {
              return "";
            }
            return company;
          });
        }}
      >
        #{company}
      </button>
    </li>
  );
}
