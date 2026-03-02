// Container styling utilities
export const getContainerBgClass = (isDarkMode) =>
  isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-300";

export const getPageBgClass = (isDarkMode) =>
  isDarkMode ? "bg-slate-900" : "bg-white";

export const getTimerSectionClass = (isDarkMode) =>
  `rounded-3xl shadow-2xl p-6 border flex flex-col gap-4 landscape:justify-between landscape:min-h-0 w-full transition-colors duration-300 ${getContainerBgClass(isDarkMode)}`;

export const getLayoutGridClass = () =>
  "w-full h-[90vh] grid grid-cols-1 grid-rows-2 gap-4 landscape:max-w-full landscape:h-[95vh] landscape:grid-cols-2 landscape:grid-rows-1";
