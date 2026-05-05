"use client";

import {
  CHECK_EMPLOYEES_OPTIONS,
  ID_VOLUME_OPTIONS,
  PAY_COUNTRIES_OPTIONS,
  PAY_COUNT_OPTIONS,
  PAY_VOLUME_OPTIONS,
  PRODUCTS,
  ProductId,
  RISK_VOLUME_OPTIONS,
  SIGN_VOLUME_OPTIONS,
} from "@/features/register/constants/products.constants";
import { useProductsForm } from "@/features/register/hooks/use-products-form";

import {
  getPolicyByLocale,
  getTermsByLocale,
} from "@/lib/get-policy-by-locale";
import { cn } from "@/lib/utils";

import OptionsDropdown from "@/components/ui/options-dropdown";

export function ProductsStep() {
  const {
    t,
    locale,
    selectedProducts,
    termsAccepted,
    setTermsAccepted,
    fieldValues,
    fieldErrors,
    isLoading,
    isSubmitEnabled,
    isPayRestricted,
    setField,
    toggleProduct,
    handleSubmit,
    handleCancel,
  } = useProductsForm();

  function renderExpanded(id: ProductId) {
    switch (id) {
      case "adamo-id":
        return (
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[#6c737f] text-xs">
              {t("adamo-id.dropdownLabel")}
            </label>
            <OptionsDropdown
              options={ID_VOLUME_OPTIONS}
              value={fieldValues["adamo-id"] ?? ""}
              placeholder={t("selectPlaceholder")}
              isError={!!fieldErrors["adamo-id"]}
              onChange={(val: string) => setField("adamo-id", val)}
            />
            {fieldErrors["adamo-id"] && (
              <p className="text-red-500 text-xs">{t("errors.required")}</p>
            )}
          </div>
        );
      case "adamo-sign":
        return (
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[#6c737f] text-xs">
              {t("adamo-sign.dropdownLabel")}
            </label>
            <OptionsDropdown
              options={SIGN_VOLUME_OPTIONS}
              value={fieldValues["adamo-sign"] ?? ""}
              placeholder={t("selectPlaceholder")}
              isError={!!fieldErrors["adamo-sign"]}
              onChange={(val: string) => setField("adamo-sign", val)}
            />
            {fieldErrors["adamo-sign"] && (
              <p className="text-red-500 text-xs">{t("errors.required")}</p>
            )}
          </div>
        );
      case "adamo-pay":
        return (
          <div className="flex flex-col gap-6 w-full">
            {/* Row 1: Volume dropdown + currency radios */}
            <div className="flex gap-6 items-start w-full">
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <label className="text-[#6c737f] text-xs">
                  {t("adamo-pay.volumeLabel")}
                </label>
                <OptionsDropdown
                  options={PAY_VOLUME_OPTIONS}
                  value={fieldValues["adamo-pay-volume"] ?? ""}
                  placeholder={t("selectPlaceholder")}
                  isError={!!fieldErrors["adamo-pay-volume"]}
                  onChange={(val: string) => setField("adamo-pay-volume", val)}
                />
                {fieldErrors["adamo-pay-volume"] && (
                  <p className="text-red-500 text-xs">{t("errors.required")}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-6 items-center h-12">
                  <label className="flex gap-2 items-center cursor-pointer">
                    <input
                      type="radio"
                      name="adamo-pay-currency"
                      value="dollars"
                      checked={fieldValues["adamo-pay-currency"] === "dollars"}
                      onChange={() => setField("adamo-pay-currency", "dollars")}
                      className="size-5 cursor-pointer accent-[#0E9384]"
                    />
                    <span className="text-[#384250] text-sm">
                      {t("adamo-pay.dollars")}
                    </span>
                  </label>
                  <label className="flex gap-2 items-center cursor-pointer">
                    <input
                      type="radio"
                      name="adamo-pay-currency"
                      value="euros"
                      checked={fieldValues["adamo-pay-currency"] === "euros"}
                      onChange={() => setField("adamo-pay-currency", "euros")}
                      className="size-5 cursor-pointer accent-[#0E9384]"
                    />
                    <span className="text-[#384250] text-sm">
                      {t("adamo-pay.euros")}
                    </span>
                  </label>
                </div>
                {fieldErrors["adamo-pay-currency"] && (
                  <p className="text-red-500 text-xs">{t("errors.required")}</p>
                )}
              </div>
            </div>
            {/* Row 2: Payment count + countries side by side */}
            <div className="flex gap-6 items-start w-full">
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <label className="text-[#6c737f] text-xs">
                  {t("adamo-pay.payCountLabel")}
                </label>
                <OptionsDropdown
                  options={PAY_COUNT_OPTIONS}
                  value={fieldValues["adamo-pay-count"] ?? ""}
                  placeholder={t("selectPlaceholder")}
                  isError={!!fieldErrors["adamo-pay-count"]}
                  onChange={(val: string) => setField("adamo-pay-count", val)}
                />
                {fieldErrors["adamo-pay-count"] && (
                  <p className="text-red-500 text-xs">{t("errors.required")}</p>
                )}
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <label className="text-[#6c737f] text-xs">
                  {t("adamo-pay.countriesLabel")}
                </label>
                <OptionsDropdown
                  options={PAY_COUNTRIES_OPTIONS.map((opt) => ({
                    ...opt,
                    label: t(`adamo-pay.countries.${opt.value}`),
                  }))}
                  value={fieldValues["adamo-pay-countries"] ?? ""}
                  placeholder={t("selectPlaceholder")}
                  isError={!!fieldErrors["adamo-pay-countries"]}
                  onChange={(val: string) =>
                    setField("adamo-pay-countries", val)
                  }
                />
                {fieldErrors["adamo-pay-countries"] && (
                  <p className="text-red-500 text-xs">{t("errors.required")}</p>
                )}
              </div>
            </div>
          </div>
        );
      case "adamo-risk":
        return (
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[#6c737f] text-xs">
              {t("adamo-risk.dropdownLabel")}
            </label>
            <OptionsDropdown
              options={RISK_VOLUME_OPTIONS}
              value={fieldValues["adamo-risk"] ?? ""}
              placeholder={t("selectPlaceholder")}
              isError={!!fieldErrors["adamo-risk"]}
              onChange={(val: string) => setField("adamo-risk", val)}
            />
            {fieldErrors["adamo-risk"] && (
              <p className="text-red-500 text-xs">{t("errors.required")}</p>
            )}
          </div>
        );
      case "adamo-check":
        return (
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[#6c737f] text-xs">
              {t("adamo-check.dropdownLabel")}
            </label>
            <OptionsDropdown
              options={CHECK_EMPLOYEES_OPTIONS}
              value={fieldValues["adamo-check"] ?? ""}
              placeholder={t("selectPlaceholder")}
              isError={!!fieldErrors["adamo-check"]}
              onChange={(val: string) => setField("adamo-check", val)}
            />
            {fieldErrors["adamo-check"] && (
              <p className="text-red-500 text-xs">{t("errors.required")}</p>
            )}
          </div>
        );
    }
  }

  return (
    <div className="flex flex-col gap-10 items-start w-full">
      {/* Title + Description */}
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-[#384250] font-bold text-base">{t("title")}</h2>
        <p className="text-[#6c737f] text-base">{t("description")}</p>
      </div>

      {/* Product list */}
      <div className="flex flex-col gap-3 w-full">
        {PRODUCTS.map(({ id, color, Icon, hasBadge }) => {
          const selected = selectedProducts.has(id);
          const restricted = id === "adamo-pay" && isPayRestricted;

          if (restricted) {
            return (
              <div
                key={id}
                className="flex flex-col gap-6 items-start w-full pl-6 pr-8 py-4 rounded-3xl border border-transparent bg-neutral-50 opacity-60 cursor-not-allowed select-none"
              >
                <div className="flex gap-8 items-center w-full">
                  {/* Icon — greyscale */}
                  <div className="size-10 rounded-full flex items-center justify-center flex-shrink-0 bg-neutral-300">
                    <Icon className="size-6 text-neutral-500" />
                  </div>

                  {/* Title + not-available tag + description */}
                  <div className="flex flex-1 flex-col gap-2 items-start min-w-0">
                    <div className="flex gap-4 items-center flex-wrap">
                      <span className="text-neutral-400 font-bold text-base whitespace-nowrap">
                        {t(`${id}.name`)}
                      </span>
                      <span className="bg-neutral-200 text-neutral-500 text-xs font-medium px-2.5 h-7 flex items-center rounded-full whitespace-nowrap">
                        {t("adamo-pay.notAvailable")}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-base">
                      {t(`${id}.description`)}
                    </p>
                  </div>

                  {/* Disabled circle indicator */}
                  <div className="size-5 rounded-full border border-neutral-300 bg-neutral-100 flex-shrink-0" />
                </div>
              </div>
            );
          }

          return (
            <div
              key={id}
              className={cn(
                "flex flex-col gap-6 items-start w-full pl-6 pr-8 py-4 rounded-3xl cursor-pointer transition-colors",
                "bg-neutral-50 border",
                selected ? "border-[#d2d6db]" : "border-transparent",
              )}
              onClick={() => toggleProduct(id)}
            >
              {/* Product row */}
              <div className="flex gap-8 items-center w-full">
                {/* Icon */}
                <div
                  className="size-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="size-6" />
                </div>

                {/* Title + Badge + Description */}
                <div className="flex flex-1 flex-col gap-2 items-start min-w-0">
                  {/* Title + Badge */}
                  <div className="flex gap-4 items-center flex-wrap">
                    <span className="text-[#384250] font-bold text-base whitespace-nowrap">
                      {t(`${id}.name`)}
                    </span>
                    {hasBadge && (
                      <span className="bg-[#e5f3fa] px-2 h-8 flex items-center rounded-xl text-[#384250] text-sm whitespace-nowrap">
                        {t(`${id}.badge`)}
                      </span>
                    )}
                  </div>
                  {/* Description */}
                  <p className="text-[#6c737f] text-base">
                    {t(`${id}.description`)}
                  </p>
                </div>

                {/* Selection indicator */}
                <div
                  className={cn(
                    "size-5 rounded-full border flex-shrink-0 flex items-center justify-center",
                    selected
                      ? "bg-[#4d5761] border-[#4d5761]"
                      : "bg-white border-[#d2d6db]",
                  )}
                >
                  {selected && (
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Expanded fields (click inside stops propagation) */}
              {selected && (
                <div className="w-full" onClick={(e) => e.stopPropagation()}>
                  {renderExpanded(id)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Terms & Conditions */}
      <label
        htmlFor="terms"
        className="flex gap-4 items-start w-full cursor-pointer"
      >
        <input
          type="checkbox"
          id="terms"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "size-5 mt-0.5 flex-shrink-0 rounded-[4px] border flex items-center justify-center transition-colors",
            termsAccepted
              ? "bg-[#111927] border-[#111927]"
              : "bg-white border-[#d2d6db]",
          )}
        >
          {termsAccepted && (
            <svg
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 3.5L3.5 6L9 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="text-[#6c737f] text-base leading-6">
          {t("terms.accept")}
          <a
            href={getTermsByLocale(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1f2a37] underline"
            onClick={(e) => e.stopPropagation()}
          >
            {t("terms.termsOfService")}
          </a>
          {t("terms.and")}
          <a
            href={getPolicyByLocale(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1f2a37] underline"
            onClick={(e) => e.stopPropagation()}
          >
            {t("terms.privacyPolicy")}
          </a>
          {t("terms.company")}
        </span>
      </label>

      {/* Buttons */}
      <div className="flex gap-6 items-start">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
          className="bg-[#f3f4f6] px-5 py-3 h-12 rounded-xl text-[#384250] font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("cancel")}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isSubmitEnabled}
          className={cn(
            "px-5 py-3 h-12 rounded-xl font-semibold text-base transition-colors flex items-center gap-2",
            isSubmitEnabled
              ? "bg-[#111927] text-white cursor-pointer"
              : "bg-[#d2d6db] text-[#9da4ae] cursor-not-allowed",
          )}
        >
          {isLoading && (
            <svg
              className="animate-spin size-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {t("createAccount")}
        </button>
      </div>
    </div>
  );
}
