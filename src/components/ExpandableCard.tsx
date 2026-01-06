import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  image?: string;
  icon?: React.ReactNode;
  gradient: string;
  defaultOpen?: boolean;
  className?: string;
}

const ExpandableCard = ({
  title,
  subtitle,
  description,
  children,
  image,
  icon,
  gradient,
  defaultOpen = false,
  className,
}: ExpandableCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "group relative rounded-[2rem] overflow-hidden transition-all duration-500",
        isOpen ? "shadow-glow" : "shadow-card hover:shadow-glow",
        className
      )}
    >
      {/* Background with gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />
      
      {/* Image overlay if provided */}
      {image && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6 md:p-10 min-h-[240px] md:min-h-[280px] flex flex-col overflow-hidden">
        {/* Expand button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 group/btn"
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          {isOpen ? (
            <Minus className="w-6 h-6 text-foreground" />
          ) : (
            <Plus className="w-6 h-6 text-foreground group-hover/btn:rotate-90 transition-transform duration-300" />
          )}
        </button>

        {/* Icon */}
        {icon && (
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-lg">
            {icon}
          </div>
        )}
        
        {/* Title area */}
        <div className="mt-auto">
          {subtitle && (
            <span className="text-white/80 text-sm md:text-lg font-semibold uppercase tracking-wider mb-1 md:mb-2 block">
              {subtitle}
            </span>
          )}
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-1 md:mb-2">
            {title}
          </h3>
          {description && !isOpen && (
            <p className="text-white/70 text-sm md:text-lg font-medium mt-2 md:mt-4 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Expandable content */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out",
            isOpen ? "max-h-[800px] opacity-100 mt-4 md:mt-6" : "max-h-0 opacity-0"
          )}
        >
          {description && (
            <p className="text-white/90 text-base md:text-xl font-medium leading-relaxed mb-4 md:mb-6">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExpandableCard;
