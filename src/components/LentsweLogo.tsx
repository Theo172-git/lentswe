const LentsweLogo = ({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) => {
  const sizes = {
    small: "w-10 h-10",
    default: "w-16 h-16",
    large: "w-24 h-24",
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        viewBox="0 0 100 80"
        className={sizes[size]}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer diamond */}
        <path
          d="M50 5 L90 40 L50 75 L10 40 Z"
          className="stroke-primary"
          strokeWidth="4"
          fill="none"
        />
        {/* Inner diamond */}
        <path
          d="M50 20 L70 40 L50 60 L30 40 Z"
          className="fill-secondary"
        />
      </svg>
      <div className="mt-2 text-center">
        <span className="block text-lg font-bold text-primary tracking-wide">LENTSWE</span>
        <span className="block text-sm font-semibold text-secondary tracking-widest">HOLDING</span>
      </div>
    </div>
  );
};

export default LentsweLogo;
