import HashtagItem from "./HashtagItem";

type HashtagListProps = {
  companyList: string[];
  setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
};

export default function HashtagList({
  companyList,
  setSelectedCompany,
}: HashtagListProps) {
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem company={company} onSelectCompany={setSelectedCompany} />
      ))}
    </ul>
  );
}
