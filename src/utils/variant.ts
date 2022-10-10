interface InputData {
  type: string;
  values: string[];
}

interface VariantObj {
  [key: string]: string[];
}

const formatData = (data: InputData[]) => {
  const obj: VariantObj = {};
  data.forEach((item) => {
    obj[`${item.type}`] = item.values;
  });
  return obj;
};

const cartesianProduct = (data: [string, string[]], currentVariant: any) => {
  const requiredFields = {
    inventory: "",
    price: "",
    visible: true,
  };

  const aKey = data[0];
  const aValue = data[1];
  const tempCurrentVariant = currentVariant || ([] as any[]);

  if (Object.keys(tempCurrentVariant).length <= 0) {
    return aValue.map((v: string) => ({
      [aKey]: v,
      ...requiredFields,
    }));
  }

  const products = [] as any[];

  aValue.forEach((_, key: number) => {
    tempCurrentVariant.forEach((variant: any) => {
      products.push({
        ...variant,
        [aKey]: aValue[key],
        ...requiredFields,
      });
    });
  });

  return products;
};

/**
 * Cartesian product computes a combination of variants.
 *
 * @param data variants data.
 * @returns {*[]} Combined data
 */
export const cartesian = (data: InputData[]) => {
  const inputData = formatData(data);
  const entries = Object.entries(inputData || {});

  let products = [] as any[];
  entries.forEach((entry) => {
    products = cartesianProduct(entry, products);
  });
  return products;
};
