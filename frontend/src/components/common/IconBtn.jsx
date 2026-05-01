const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`
        flex w-full items-center justify-center gap-2
        rounded-md
        px-4 py-2
        text-sm font-semibold
        sm:w-auto
        sm:px-5
        sm:text-base
        transition-all duration-200
        disabled:cursor-not-allowed disabled:opacity-50
        ${
          outline
            ? "border border-yellow-50 bg-transparent text-yellow-50"
            : "bg-yellow-50 text-richBlack-900"
        }
        ${customClasses}
      `}
    >
      <span className="whitespace-nowrap">{text}</span>

      {children && (
        <span className="flex items-center justify-center">
          {children}
        </span>
      )}
    </button>
  );
};

export default IconBtn;