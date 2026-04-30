// import React from "react";
// import { OnboardingFormData } from "@/features/onboarding/model/types";
// import { useTranslations } from "next-intl";
// import {
//   ArrowLeft,
//   Check,
//   LoaderCircle,
//   Plus,
//   Sparkle,
//   Trash2,
// } from "lucide-react";
// import {
//   Control,
//   FieldErrors,
//   UseFormRegister,
//   useFieldArray,
// } from "react-hook-form";

// interface Step5Props {
//   control: Control<OnboardingFormData>;
//   register: UseFormRegister<OnboardingFormData>;
//   errors: FieldErrors<OnboardingFormData>;
//   prevStep: () => void;
//   isLoading?: boolean;
// }

// export const Step5_Limitations = ({
//   control,
//   register,
//   errors,
//   prevStep,
//   isLoading,
// }: Step5Props) => {
//   const t = useTranslations("OnBoardingPage");

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "limitations",
//   });

//   return (
//     <div className="w-full bg-(--color-bg) border border-(--color-border) rounded-2xl p-6 flex flex-col gap-6 shadow-lg shadow-black/5 overflow-hidden relative">
//       <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

//       <div className="text-center pb-1">
//         <div className="inline-flex items-center justify-center w-14 h-14 bg-(--color-bg-secondary) border border-(--color-border) rounded-2xl text-3xl mb-4 shadow-sm">
//           ⚠️
//         </div>
//         <h2 className="text-xl font-bold text-(--color-text-primary) tracking-tight">
//           {t("step5.title")}
//         </h2>
//         <p className="text-sm text-(--description-text-color) mt-1.5 leading-relaxed">
//           {t("step5.subtitle")}
//         </p>
//       </div>

//       <div className="flex flex-col gap-3">
//         {fields.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-(--color-border) rounded-xl bg-(--color-bg-secondary)/50">
//             <span className="text-3xl mb-2">🙌</span>
//             <p className="text-sm text-(--description-text-color) text-center">
//               {t("step5.noTextSection")}
//             </p>
//           </div>
//         ) : (
//           fields.map((field, index) => (
//             <div
//               key={field.id}
//               className="relative flex flex-col gap-3 p-4 bg-(--color-bg-secondary) border border-(--color-border) rounded-xl transition-all duration-200"
//             >
//               <div className="flex items-center justify-between mb-0.5">
//                 <span className="text-xs font-semibold text-(--description-text-color) uppercase tracking-wider">
//                   #{index + 1}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => remove(index)}
//                   className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-all duration-200 cursor-pointer border border-red-500/20 hover:border-red-500/40"
//                 >
//                   <Trash2 size={13} />
//                   {t("step5.removeLimitationButton")}
//                 </button>
//               </div>

//               <label className="flex flex-col gap-1.5">
//                 <span className="text-xs font-semibold text-(--color-text-primary) uppercase tracking-wider">
//                   {t("step5.labelType")}
//                 </span>
//                 <select
//                   {...register(`limitations.${index}.type`)}
//                   className="w-full px-3 py-2.5 bg-(--color-bg) border border-(--color-border) rounded-xl text-sm text-(--color-text-primary) font-medium transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer"
//                 >
//                   <option value="INJURY">
//                     {t("step5.optionsLimitations.injury")}
//                   </option>
//                   <option value="MEDICAL_CONDITION">
//                     {t("step5.optionsLimitations.healthCondition")}
//                   </option>
//                   <option value="OTHER">
//                     {t("step5.optionsLimitations.other")}
//                   </option>
//                 </select>
//               </label>

//               <label className="flex flex-col gap-1.5">
//                 <span className="text-xs font-semibold text-(--color-text-primary) uppercase tracking-wider">
//                   {t("step5.labelDescription")}
//                 </span>
//                 <input
//                   type="text"
//                   {...register(`limitations.${index}.description`)}
//                   placeholder={t("step5.labelDescription")}
//                   className="w-full px-3 py-2.5 bg-(--color-bg) border border-(--color-border) rounded-xl text-sm text-(--color-text-primary) placeholder:text-(--description-text-color) transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
//                 />
//                 {errors.limitations?.[index]?.description?.message && (
//                   <p className="text-xs text-red-500 mt-0.5">
//                     {errors.limitations[index]?.description?.message}
//                   </p>
//                 )}
//               </label>
//             </div>
//           ))
//         )}

//         <button
//           type="button"
//           onClick={() => append({ type: "INJURY", description: "" })}
//           className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-dashed border-(--color-border) hover:border-primary/60 bg-transparent hover:bg-primary/5 text-(--description-text-color) hover:text-primary rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer group"
//         >
//           <Plus
//             size={16}
//             className="transition-transform duration-200 group-hover:rotate-90"
//           />
//           {t("step5.addLimitationButton")}
//         </button>
//       </div>

//       <div className="flex gap-3 pt-1">
//         <button
//           type="button"
//           onClick={prevStep}
//           disabled={isLoading}
//           className="flex items-center gap-2 px-5 py-3.5 bg-(--color-bg-secondary) hover:bg-(--color-bg) text-(--color-text-primary) border border-(--color-border) hover:border-primary/50 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <ArrowLeft size={18} />
//           {t("backButton")}
//         </button>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-3.5 px-6 bg-(--color-primary) hover:bg-(--color-primary-hover) disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm"
//         >
//           {isLoading ? (
//             <LoaderCircle size={18} className="animate-spin" />
//           ) : (
//             <>
//               <span>{t("finishButton")}</span>
//               <Sparkle size={18} />
//             </>
//           )}
//         </button>
//       </div>

//       <button
//         type="submit"
//         className="w-full text-center text-sm text-[var(--description-text-color)] hover:text-[var(--color-primary)] font-medium transition-colors duration-200 cursor-pointer py-1"
//       >
//         {t("skipButton")}
//       </button>
//     </div>
//   );
// };
