export function parseRangeMax(range: string): number {
  if (range.includes("+")) {
    return parseInt(range.replace("+", ""), 10);
  }
  const parts = range.split("-");
  return parseInt(parts[parts.length - 1], 10);
}

export function buildProductInterests(
  selectedProducts: Set<string>,
  fieldValues: Record<string, string>,
  operatingCountry: string,
): Record<string, object> {
  const productInterests: Record<string, object> = {};

  for (const id of selectedProducts) {
    switch (id) {
      case "adamo-id":
        productInterests.adamoId = {
          validationsPerMonth: parseRangeMax(fieldValues["adamo-id"]),
        };
        break;
      case "adamo-sign":
        productInterests.adamoSign = {
          signaturesPerMonth: parseRangeMax(fieldValues["adamo-sign"]),
        };
        break;
      case "adamo-pay": {
        const volumeValue = parseRangeMax(fieldValues["adamo-pay-volume"]);
        const currency = fieldValues["adamo-pay-currency"];
        productInterests.adamoPay = {
          ...(currency === "dollars"
            ? { estimatedVolumeUSD: volumeValue, estimatedVolumeEUR: 0 }
            : { estimatedVolumeEUR: volumeValue, estimatedVolumeUSD: 0 }),
          paymentsPerMonth: parseRangeMax(fieldValues["adamo-pay-count"]),
          operatingRegion: fieldValues["adamo-pay-countries"],
          operatingCountry,
        };
        break;
      }
      case "adamo-risk":
        productInterests.adamoRisk = {
          amlQueriesPerMonth: parseRangeMax(fieldValues["adamo-risk"]),
        };
        break;
      case "adamo-check":
        productInterests.adamoCheck = {
          employeesToVerifyPerMonth: parseRangeMax(fieldValues["adamo-check"]),
        };
        break;
    }
  }

  return productInterests;
}
