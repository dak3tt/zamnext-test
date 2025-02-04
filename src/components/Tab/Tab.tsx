import "./Tab.scss";

interface Props {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function Tab({ label, isActive, onClick }: Props) {
  return (
    <div>
      <div className="tab--container">
        <button
          className={`tab--default ${
            isActive ? `tab--active` : `tab--default`
          }`}
          onClick={onClick}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
