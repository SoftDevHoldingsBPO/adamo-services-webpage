"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckIcon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface PlanComparisonDialogProps {
  translations: {
    buttonText: string;
    dialogTitle: string;
    dialogDescription: string;
    table: {
      feature: string;
      features: {
        pricing: string;
        initialCredit: string;
        adamoSign: string;
        adamoId: string;
        adamoPay: string;
        biometricVerification: string;
        documentValidation: string;
        electronicSignature: string;
        paymentProcessing: string;
        currencyExchange: string;
        api: string;
        subaccounts: string;
        userManagement: string;
        customPermissions: string;
        support: string;
        sla: string;
        analytics: string;
        customIntegrations: string;
        compliance: string;
        onboarding: string;
      };
      values: {
        basic: string;
        advanced: string;
        full: string;
        limited: string;
        email: string;
        priority: string;
        dedicated: string;
        yes: string;
        no: string;
        upTo3: string;
        included: string;
        notIncluded: string;
      };
    };
    plans: {
      free: { name: string; price: string };
      pro: { name: string; price: string };
      enterprise: { name: string; price: string };
    };
  };
}

interface ComparisonRow {
  feature: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

export function PlanComparisonDialog({
  translations,
}: PlanComparisonDialogProps) {
  const { table, plans } = translations;

  const comparisonData: ComparisonRow[] = [
    {
      feature: table.features.pricing,
      free: plans.free.price,
      pro: plans.pro.price,
      enterprise: plans.enterprise.price,
    },
    {
      feature: table.features.initialCredit,
      free: "$3 USD",
      pro: table.values.no,
      enterprise: table.values.no,
    },
    {
      feature: table.features.adamoSign,
      free: table.values.basic,
      pro: table.values.full,
      enterprise: table.values.full,
    },
    {
      feature: table.features.adamoId,
      free: table.values.basic,
      pro: table.values.full,
      enterprise: table.values.full,
    },
    {
      feature: table.features.adamoPay,
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      feature: table.features.biometricVerification,
      free: table.values.basic,
      pro: table.values.advanced,
      enterprise: table.values.advanced,
    },
    {
      feature: table.features.documentValidation,
      free: true,
      pro: true,
      enterprise: true,
    },
    {
      feature: table.features.electronicSignature,
      free: table.values.basic,
      pro: table.values.full,
      enterprise: table.values.full,
    },
    {
      feature: table.features.paymentProcessing,
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      feature: table.features.currencyExchange,
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      feature: table.features.api,
      free: table.values.limited,
      pro: table.values.full,
      enterprise: table.values.full,
    },
    {
      feature: table.features.subaccounts,
      free: table.values.no,
      pro: table.values.no,
      enterprise: table.values.upTo3,
    },
    {
      feature: table.features.userManagement,
      free: false,
      pro: false,
      enterprise: true,
    },
    {
      feature: table.features.customPermissions,
      free: false,
      pro: false,
      enterprise: true,
    },
    {
      feature: table.features.support,
      free: table.values.email,
      pro: table.values.priority,
      enterprise: table.values.dedicated,
    },
    {
      feature: table.features.sla,
      free: false,
      pro: false,
      enterprise: true,
    },
    {
      feature: table.features.analytics,
      free: table.values.basic,
      pro: table.values.full,
      enterprise: table.values.full,
    },
    {
      feature: table.features.customIntegrations,
      free: false,
      pro: false,
      enterprise: true,
    },
    {
      feature: table.features.compliance,
      free: table.values.basic,
      pro: table.values.advanced,
      enterprise: table.values.advanced,
    },
    {
      feature: table.features.onboarding,
      free: false,
      pro: false,
      enterprise: true,
    },
  ];

  const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckIcon className="mx-auto size-5 text-success-600" />
      ) : (
        <X className="mx-auto size-5 text-neutral-400" />
      );
    }
    return <span className="text-sm text-neutral-700">{value}</span>;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="mx-auto">
          {translations.buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{translations.dialogTitle}</DialogTitle>
          <DialogDescription>{translations.dialogDescription}</DialogDescription>
        </DialogHeader>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-neutral-200">
                <th className="p-4 text-left font-semibold text-neutral-900">
                  {table.feature}
                </th>
                <th className="p-4 text-center font-semibold text-neutral-900">
                  {plans.free.name}
                </th>
                <th className="bg-adamo-pay-50/30 p-4 text-center font-semibold text-neutral-900">
                  {plans.pro.name}
                </th>
                <th className="p-4 text-center font-semibold text-neutral-900">
                  {plans.enterprise.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={index}
                  className={cn(
                    "border-b border-neutral-100",
                    index % 2 === 0 && "bg-neutral-50/50",
                  )}
                >
                  <td className="p-4 text-sm font-medium text-neutral-700">
                    {row.feature}
                  </td>
                  <td className="p-4 text-center">{renderCell(row.free)}</td>
                  <td className="bg-adamo-pay-50/20 p-4 text-center">
                    {renderCell(row.pro)}
                  </td>
                  <td className="p-4 text-center">
                    {renderCell(row.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="space-y-6 md:hidden">
          {comparisonData.map((row, index) => (
            <div key={index} className="rounded-lg border border-neutral-200 p-4">
              <h4 className="mb-3 font-semibold text-neutral-900">
                {row.feature}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">
                    {plans.free.name}
                  </span>
                  <div>{renderCell(row.free)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">
                    {plans.pro.name}
                  </span>
                  <div>{renderCell(row.pro)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">
                    {plans.enterprise.name}
                  </span>
                  <div>{renderCell(row.enterprise)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
