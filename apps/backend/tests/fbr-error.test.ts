import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  getFbrErrorDefinition,
  normalizeFbrError,
  parseAndMapFBRError,
  salesErrorLookupTable,
  purchaseErrorLookupTable,
} from "../src/services/fbr-error.service.js";

describe("fbr-error: code normalization", () => {
  test("numeric string is zero-padded to 4 digits", () => {
    const result = normalizeFbrError({ scope: "header", errorCode: "52" });
    assert.equal(result.errorCode, "0052");
  });

  test("integer value is zero-padded", () => {
    const result = normalizeFbrError({ scope: "header", errorCode: 1 as unknown as string });
    assert.equal(result.errorCode, "0001");
  });

  test("already-padded code is unchanged", () => {
    const result = normalizeFbrError({ scope: "header", errorCode: "0015" });
    assert.equal(result.errorCode, "0015");
  });

  test("non-numeric code is kept as-is", () => {
    const result = normalizeFbrError({ scope: "header", errorCode: "HTTP" });
    assert.equal(result.errorCode, "HTTP");
  });

  test("empty code becomes UNKNOWN", () => {
    const result = normalizeFbrError({ scope: "header", errorCode: "" });
    assert.equal(result.errorCode, "UNKNOWN");
  });

  test("missing code becomes UNKNOWN", () => {
    const result = normalizeFbrError({ scope: "header" });
    assert.equal(result.errorCode, "UNKNOWN");
  });
});

describe("fbr-error: sales error code → field mapping", () => {
  const cases: Array<[string, string]> = [
    ["0001", "invoiceType"],
    ["0002", "invoiceDate"],
    ["0003", "sellerNTNCNIC"],
    ["0004", "sellerBusinessName"],
    ["0005", "sellerProvince"],
    ["0006", "sellerAddress"],
    ["0007", "buyerNTNCNIC"],
    ["0008", "buyerBusinessName"],
    ["0009", "buyerProvince"],
    ["0010", "buyerAddress"],
    ["0011", "buyerRegistrationType"],
    ["0012", "invoiceRefNo"],
    ["0013", "scenarioId"],
    ["0014", "items"],
    ["0015", "hsCode"],
    ["0016", "productDescription"],
    ["0017", "rate"],
    ["0018", "uoM"],
    ["0019", "quantity"],
    ["0020", "totalValues"],
    ["0021", "valueSalesExcludingST"],
    ["0022", "fixedNotifiedValueOrRetailPrice"],
    ["0023", "salesTaxApplicable"],
    ["0024", "salesTaxWithheldAtSource"],
    ["0025", "extraTax"],
    ["0026", "furtherTax"],
    ["0027", "sroScheduleNo"],
    ["0028", "fedPayable"],
    ["0029", "discount"],
    ["0030", "saleType"],
    ["0031", "sroItemSerialNo"],
    ["0049", "saleType"],
    ["0050", "rate"],
    ["0051", "uoM"],
    ["0052", "hsCode"],
    ["0053", "sroScheduleNo"],
    ["0054", "sroItemSerialNo"],
    ["0055", "fixedNotifiedValueOrRetailPrice"],
    ["0056", "fedPayable"],
    ["0057", "extraTax"],
    ["0058", "furtherTax"],
    ["0059", "discount"],
    ["0060", "totalValues"],
    ["0061", "salesTaxApplicable"],
    ["0062", "valueSalesExcludingST"],
    ["0063", "quantity"],
    ["0064", "items"],
  ];

  for (const [code, expectedField] of cases) {
    test(`${code} → field "${expectedField}"`, () => {
      const def = getFbrErrorDefinition(code, "sales");
      assert.equal(def.field, expectedField, `code ${code}: expected field "${expectedField}", got "${def.field}"`);
      assert.equal(def.category, "sales");
      assert.ok(def.message.length > 0, "message should not be empty");
    });
  }
});

describe("fbr-error: purchase error code → field mapping", () => {
  const cases: Array<[string, string]> = [
    ["0156", "invoiceType"],
    ["0157", "invoiceDate"],
    ["0158", "sellerNTNCNIC"],
    ["0159", "buyerNTNCNIC"],
    ["0160", "hsCode"],
    ["0161", "rate"],
    ["0162", "uoM"],
    ["0163", "quantity"],
    ["0164", "valueSalesExcludingST"],
    ["0165", "salesTaxApplicable"],
    ["0166", "salesTaxWithheldAtSource"],
    ["0167", "extraTax"],
    ["0168", "furtherTax"],
    ["0169", "sroScheduleNo"],
    ["0170", "fedPayable"],
    ["0171", "discount"],
    ["0172", "saleType"],
    ["0173", "sroItemSerialNo"],
    ["0174", "buyerRegistrationType"],
    ["0175", "totalValues"],
    ["0176", "invoiceRefNo"],
    ["0177", "items"],
  ];

  for (const [code, expectedField] of cases) {
    test(`${code} → field "${expectedField}"`, () => {
      const def = getFbrErrorDefinition(code, "purchase");
      assert.equal(def.field, expectedField, `code ${code}: expected field "${expectedField}", got "${def.field}"`);
      assert.equal(def.category, "purchase");
    });
  }
});

describe("fbr-error: unknown codes", () => {
  test("completely unknown code gets a generic message containing the code", () => {
    const def = getFbrErrorDefinition("9999", "sales");
    assert.ok(def.message.includes("9999"), `message should include "9999", got: "${def.message}"`);
    assert.equal(def.category, "general");
  });

  test("unknown code falls back to sales table if purchase lookup also misses", () => {
    const def = getFbrErrorDefinition("8888", "purchase");
    assert.ok(def.message.length > 0);
  });

  test("UNKNOWN code produces a user-friendly general message", () => {
    const result = normalizeFbrError({ scope: "header", errorCode: "" });
    assert.equal(result.errorCode, "UNKNOWN");
    assert.ok(result.message.length > 0);
  });
});

describe("fbr-error: field inference from FBR message text", () => {
  const cases: Array<[string, string]> = [
    ["Invalid HS Code provided", "hsCode"],
    ["Invalid hscode value", "hsCode"],
    ["Invoice Type is incorrect", "invoiceType"],
    ["Document Type mismatch", "invoiceType"],
    ["Sale Type is not valid", "saleType"],
    ["Invalid rate for this item", "rate"],
    ["UOM is not recognized", "uoM"],
    ["Unit of measurement missing", "uoM"],
    ["Quantity must be positive", "quantity"],
    ["Total value mismatch", "totalValues"],
    ["Value excluding sales tax is wrong", "valueSalesExcludingST"],
    ["Fixed Notified value required", "fixedNotifiedValueOrRetailPrice"],
    ["Retail price not provided", "fixedNotifiedValueOrRetailPrice"],
    ["Sales tax withheld amount incorrect", "salesTaxWithheldAtSource"],
    ["Sales tax amount mismatch", "salesTaxApplicable"],
    ["Further tax required", "furtherTax"],
    ["Extra tax not applicable", "extraTax"],
    ["FED amount is wrong", "fedPayable"],
    ["Discount cannot exceed value", "discount"],
    ["Seller NTN not found", "sellerNTNCNIC"],
    ["Buyer CNIC is invalid", "buyerNTNCNIC"],
    ["Province mismatch", "province"],
    ["SRO Item serial is required", "sroItemSerialNo"],
    ["SRO schedule number missing", "sroScheduleNo"],
    ["Invoice Reference not found", "invoiceRefNo"],
    ["Scenario ID invalid", "scenarioId"],
    ["Invoice date is out of range", "invoiceDate"],
  ];

  for (const [fbrMessage, expectedField] of cases) {
    test(`"${fbrMessage}" → field "${expectedField}"`, () => {
      // Use an unknown code so inference kicks in from the FBR message
      const result = normalizeFbrError({ scope: "item", errorCode: "9999", fbrMessage });
      assert.equal(
        result.field,
        expectedField,
        `message "${fbrMessage}": expected field "${expectedField}", got "${result.field}"`,
      );
    });
  }
});

describe("fbr-error: normalizeFbrError output shape", () => {
  test("returns all required fields for a known header error", () => {
    const result = normalizeFbrError({ scope: "header", errorCode: "0052", fbrMessage: "HS Code mismatch" });
    assert.equal(result.scope, "header");
    assert.equal(result.errorCode, "0052");
    assert.equal(result.field, "hsCode");
    assert.equal(result.category, "sales");
    assert.equal(result.fbrMessage, "HS Code mismatch");
    assert.ok(result.message.length > 0);
    assert.ok(result.userMessage.length > 0);
    assert.equal(result.itemIndex, undefined);
  });

  test("includes itemIndex for item-scoped errors", () => {
    const result = normalizeFbrError({ scope: "item", itemIndex: 2, errorCode: "0015" });
    assert.equal(result.scope, "item");
    assert.equal(result.itemIndex, 2);
    assert.equal(result.field, "hsCode");
  });

  test("message and userMessage are the same string", () => {
    const result = normalizeFbrError({ scope: "header", errorCode: "0001" });
    assert.equal(result.message, result.userMessage);
  });
});

describe("fbr-error: parseAndMapFBRError", () => {
  test("returns empty array for a clean success response", () => {
    const raw = { validationResponse: { statusCode: "00", status: "Valid" } };
    const errors = parseAndMapFBRError(raw);
    assert.equal(errors.length, 0);
  });

  test("extracts a header error from validationResponse", () => {
    const raw = {
      validationResponse: {
        statusCode: "01",
        errorCode: "0003",
        error: "Seller NTN not registered",
      },
    };
    const errors = parseAndMapFBRError(raw);
    assert.equal(errors.length, 1);
    assert.equal(errors[0].scope, "header");
    assert.equal(errors[0].errorCode, "0003");
    assert.equal(errors[0].field, "sellerNTNCNIC");
  });

  test("extracts item-level errors from invoiceStatuses array", () => {
    const raw = {
      validationResponse: {
        statusCode: "01",
        invoiceStatuses: [
          { statusCode: "00" },
          { statusCode: "01", errorCode: "0052", error: "HS Code mismatch" },
        ],
      },
    };
    const errors = parseAndMapFBRError(raw);
    assert.equal(errors.length, 1);
    assert.equal(errors[0].scope, "item");
    assert.equal(errors[0].itemIndex, 1);
    assert.equal(errors[0].errorCode, "0052");
    assert.equal(errors[0].field, "hsCode");
  });

  test("extracts both header and item errors in the same response", () => {
    const raw = {
      validationResponse: {
        statusCode: "01",
        errorCode: "0001",
        error: "Invalid invoice type",
        invoiceStatuses: [
          { statusCode: "01", errorCode: "0015", error: "HS Code invalid" },
        ],
      },
    };
    const errors = parseAndMapFBRError(raw);
    assert.equal(errors.length, 2);
    assert.equal(errors[0].scope, "header");
    assert.equal(errors[0].errorCode, "0001");
    assert.equal(errors[1].scope, "item");
    assert.equal(errors[1].errorCode, "0015");
  });

  test("handles null / non-object response gracefully", () => {
    assert.equal(parseAndMapFBRError(null).length, 0);
    assert.equal(parseAndMapFBRError(undefined).length, 0);
    assert.equal(parseAndMapFBRError("bad response").length, 0);
    assert.equal(parseAndMapFBRError(42).length, 0);
  });

  test("falls back to root-level errorCode when validationResponse has none", () => {
    const raw = {
      statusCode: "01",
      errorCode: "0007",
      error: "Buyer NTN invalid",
    };
    const errors = parseAndMapFBRError(raw);
    assert.equal(errors.length, 1);
    assert.equal(errors[0].errorCode, "0007");
    assert.equal(errors[0].field, "buyerNTNCNIC");
  });
});

describe("fbr-error: lookup tables are fully populated", () => {
  test("sales table contains all entries from 0001 to 0300", () => {
    for (let i = 1; i <= 300; i++) {
      const code = String(i).padStart(4, "0");
      assert.ok(salesErrorLookupTable[code], `sales table missing entry for ${code}`);
    }
  });

  test("purchase table contains all entries from 0156 to 0177", () => {
    for (let i = 156; i <= 177; i++) {
      const code = String(i).padStart(4, "0");
      assert.ok(purchaseErrorLookupTable[code], `purchase table missing entry for ${code}`);
    }
  });
});
