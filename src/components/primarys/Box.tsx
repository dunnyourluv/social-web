function Box({
  children,
  active,
  className
}: {
  children?: JSX.Element;
  active?: boolean;
  className?: string
}) {
  if (active === true) {
    return (
      <div className="relative z-30">
        <div
          className={`mb-3 bg-white dark:bg-dark-bold rounded-lg shadow-md dark:shadow-dark-light dark:border-0 shadow-gray-light overflow-hidden border border-gray-bold/40 ${className && className || ''}`}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={` bg-white dark:bg-dark-bold dark:shadow-dark-light rounded-lg shadow-md shadow-gray-light overflow-hidden border border-gray-bold/40 mb-3 dark:border-0  ${className && className || ''}`}
    >
      {children}
    </div>
  );
}

export default Box;
