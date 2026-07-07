import { cn } from "@/shared/lib/utils";

type LSToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};

export default function LSToggle({
  value,
  onChange,
  disabled = false,
}: LSToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      disabled={disabled}
      onClick={() => onChange(!value)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        value ? "bg-primary" : "bg-muted",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          value ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}