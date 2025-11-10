export default function NeonButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={
        "relative overflow-hidden px-6 py-3 font-semibold rounded-xl bg-white/5 text-white " +
        "hover:text-neon-cyan transition-colors neon-border " +
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-neon-purple/30 before:to-neon-cyan/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity " +
        className
      }
    >
      {children}
    </button>
  );
}